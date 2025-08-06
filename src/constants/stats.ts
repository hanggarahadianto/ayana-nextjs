// src/constants/queryKeys.ts

export const DASHBOARD_QUERY_KEYS = [
  "getCashinDataStats",
  "getCashOutDataStats",
  "getCashInStat",
  "getEquityDataStats",
  "getExpenseOnlyDataStats",
  "getFixedAssetStats",
  "getOutstandingDebtOnlyStats",
  "getRevenueDataStats",
  "getJournalEntryData",
];

// Untuk title non-dashboard
export const TITLE_QUERY_KEY_MAP: Record<string, string | ((query: any) => boolean)> = {
  "asset tetap": "jamal",
  "aset tetaps": "getFixedAssetData",
  "uang masuk": "getCashinData",
  "barang dagangan": "getInventoryAssetData",
  "piutang konsumen": "getReceivableAssetData",
  "uang keluar": "getCashOutData",
  "Pengeluaran biaya": "getExpenseSummaryData",
  "hutang berjalan": "getOutstandingDebtByCompanyId",
  "hutang lunas": "getOutstandingDebtByCompanyId",
  "modal ditarik": "getOutstandingDebtByCompanyId",
  "modal disetor": "getEquitySummaryData",
  "pendapatan terealisasi": "getRevenueSummaryData",
};
