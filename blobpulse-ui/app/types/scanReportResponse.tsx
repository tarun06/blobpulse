export interface BlobInstance {
  name: string;
  sizeBytes: number;
  accessTier: string;
  createdOn: string;
  contentType: string;
  blobUrl: string;
}


export interface DuplicateGroup {
  structuralId: string;
  primaryInstance: BlobInstance;
  redundantInstances: BlobInstance[];
  wastedBytes: number;
}


export interface ScanReportResponse {
  totalBlobsScanned: number;
  totalDuplicateGroups: number;
  totalRedundantFilesCount: number;
  totalWastedSpaceGb: number;
  estimatedMonthlyStorageWasteUsd: number;
  containerBloatIndexPercentage: number;
  estimatedMonthlyOperationCostUsd: number;
  potentialMonthlySavingsUsd: number;
  operationalImpactSummary: string;
  duplicateGroups: DuplicateGroup[];
}
