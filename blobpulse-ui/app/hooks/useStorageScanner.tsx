'use client';


import { useState } from 'react';
import { ScanReportResponse } from '../types/scanReportResponse';


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


    // 🔥 CRITICAL: prevent stale UI flash
    resetReport();


    try {
      const response = await fetch('https://localhost:44316/api/blob/Optimizer/scan', {
        method: 'POST',
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ connectionString, containerName }),
      });


      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      const data: ScanReportResponse = await response.json();
      console.log("HOOK: response called", {
        data
      });
      setTimeout(() => {
        setReport(data);
        setLoading(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'An unexpected network error occurred.');
      // Instantly kill loader on error so the UI doesn't hang forever
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