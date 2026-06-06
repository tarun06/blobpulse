'use client';


import { useState } from 'react';
import { ScanReportResponse } from '../types/scanReportResponse';
import API_URL from '@/lib/api';


const EMPTY_REPORT: ScanReportResponse = {
  totalBlobsScanned: 0,
  totalDuplicateGroups: 0,
  totalRedundantFilesCount: 0,
  totalWastedSpaceGb: 0,
  estimatedMonthlyStorageWasteUsd: 0,
  containerBloatIndexPercentage: 0,
  estimatedMonthlyOperationCostUsd: 0,
  potentialMonthlySavingsUsd: 0,
  operationalImpactSummary: '',
  duplicateGroups: [
    {
      structuralId: "no data",
      wastedBytes: 0,
      primaryInstance: {
        name: "no data",
        sizeBytes: 0,
        accessTier: "Hot",
        createdOn: "1999-01-01T10:00:00Z",
        contentType: "image/png",
        blobUrl: "",
      },
      redundantInstances: [
        {
          name: "no data",
          sizeBytes: 0,
          accessTier: "Cool",
          createdOn: "1999-01-01T10:00:00Z",
          contentType: "image/png",
          blobUrl: "",
        },
      ],
    },
  ],
};

export function useStorageScanner() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ScanReportResponse | null>(EMPTY_REPORT);
 
  const resetReport = () => {
    setReport(EMPTY_REPORT);
  };

  const executeScan = async (connectionString: string, containerName: string) => {
    setLoading(true);
    setError(null);
    resetReport();

    console.log("executeScan START", { connectionString, containerName });

    try {
      const response = await fetch(`${API_URL}/api/blob/Optimizer/scan`, {
        method: 'POST',
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ connectionString, containerName }),
      });

      console.log("STATUS:", response.status);
      const raw = await response.text();
      let data: any;

      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error("Invalid JSON response from server");
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
          data?.details ||
          `Server error ${response.status}`
        );
      }

      console.log("SCAN SUCCESS:", data);

      setReport(data as ScanReportResponse);
    } catch (err: any) {
      console.error("SCAN FAILED:", err);
      setError(err.message || "Unexpected network error");
    } finally {
      setLoading(false);
    }
  };

  return {
    executeScan,
    report,
    loading,
    error,
    resetReport,
  };
}