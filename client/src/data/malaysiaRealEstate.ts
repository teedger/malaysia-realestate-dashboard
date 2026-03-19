// Malaysian Real Estate Data — sourced from NAPIC/JPPH, BNM, DOSM official reports
// Last updated: Based on 2024 Property Market Report & Q3 2025 data

export interface StateData {
  state: string;
  code: string;
  avgPrice: number;
  avgPriceUSD: number;
  medianCondo: number;
  medianTerrace: number;
  trend: "up" | "down" | "flat";
  transactionShare: number;
  transactionYoYChange: number;
  overhangUnits: number;
  overhangValueBillion: number;
  housingStock: number; // percentage share of national
  housingStartsQ1Q3_2025: number;
  housingStartsYoY: number;
  housingCompletionsQ1Q3_2025: number;
  housingCompletionsYoY: number;
  region: "Central" | "Northern" | "Southern" | "East Coast" | "East Malaysia" | "Federal Territory";
}

export const stateData: StateData[] = [
  { state: "Kuala Lumpur", code: "KL", avgPrice: 804642, avgPriceUSD: 197847, medianCondo: 680000, medianTerrace: 850000, trend: "flat", transactionShare: 4.5, transactionYoYChange: 0.21, overhangUnits: 2287, overhangValueBillion: 2.4, housingStock: 8.9, housingStartsQ1Q3_2025: 11013, housingStartsYoY: -14.9, housingCompletionsQ1Q3_2025: 7418, housingCompletionsYoY: 32.7, region: "Federal Territory" },
  { state: "Selangor", code: "SEL", avgPrice: 553196, avgPriceUSD: 136021, medianCondo: 520000, medianTerrace: 580000, trend: "flat", transactionShare: 21.6, transactionYoYChange: 2.06, overhangUnits: 2757, overhangValueBillion: 2.26, housingStock: 27.1, housingStartsQ1Q3_2025: 9246, housingStartsYoY: -23.3, housingCompletionsQ1Q3_2025: 15910, housingCompletionsYoY: 37.9, region: "Central" },
  { state: "Pulau Pinang", code: "PP", avgPrice: 504845, avgPriceUSD: 124132, medianCondo: 490000, medianTerrace: 620000, trend: "up", transactionShare: 5.8, transactionYoYChange: -2.9, overhangUnits: 2730, overhangValueBillion: 2.04, housingStock: 8.8, housingStartsQ1Q3_2025: 7132, housingStartsYoY: 23.0, housingCompletionsQ1Q3_2025: 3947, housingCompletionsYoY: -62.6, region: "Northern" },
  { state: "Johor", code: "JHR", avgPrice: 471485, avgPriceUSD: 115929, medianCondo: 340000, medianTerrace: 420000, trend: "up", transactionShare: 16.3, transactionYoYChange: 6.5, overhangUnits: 3293, overhangValueBillion: 2.83, housingStock: 14.5, housingStartsQ1Q3_2025: 8791, housingStartsYoY: -21.7, housingCompletionsQ1Q3_2025: 6585, housingCompletionsYoY: -5.8, region: "Southern" },
  { state: "Sarawak", code: "SWK", avgPrice: 540884, avgPriceUSD: 132993, medianCondo: 250000, medianTerrace: 290000, trend: "up", transactionShare: 5.0, transactionYoYChange: -5.29, overhangUnits: 1200, overhangValueBillion: 0.73, housingStock: 4.5, housingStartsQ1Q3_2025: 2158, housingStartsYoY: -38.8, housingCompletionsQ1Q3_2025: 3446, housingCompletionsYoY: -11.0, region: "East Malaysia" },
  { state: "Sabah", code: "SBH", avgPrice: 533614, avgPriceUSD: 131206, medianCondo: 280000, medianTerrace: 310000, trend: "up", transactionShare: 4.0, transactionYoYChange: -4.55, overhangUnits: 2771, overhangValueBillion: 2.03, housingStock: 3.8, housingStartsQ1Q3_2025: 2146, housingStartsYoY: -13.4, housingCompletionsQ1Q3_2025: 4766, housingCompletionsYoY: 210.3, region: "East Malaysia" },
  { state: "Kedah", code: "KDH", avgPrice: 322890, avgPriceUSD: 79393, medianCondo: 180000, medianTerrace: 220000, trend: "flat", transactionShare: 5.5, transactionYoYChange: 0.33, overhangUnits: 900, overhangValueBillion: 0.35, housingStock: 5.7, housingStartsQ1Q3_2025: 1709, housingStartsYoY: -37.0, housingCompletionsQ1Q3_2025: 2759, housingCompletionsYoY: 74.3, region: "Northern" },
  { state: "Negeri Sembilan", code: "NS", avgPrice: 314652, avgPriceUSD: 77367, medianCondo: 280000, medianTerrace: 320000, trend: "flat", transactionShare: 4.2, transactionYoYChange: -16.44, overhangUnits: 2205, overhangValueBillion: 0.85, housingStock: 5.0, housingStartsQ1Q3_2025: 5524, housingStartsYoY: 16.5, housingCompletionsQ1Q3_2025: 5786, housingCompletionsYoY: 170.8, region: "Central" },
  { state: "Terengganu", code: "TRG", avgPrice: 307717, avgPriceUSD: 75662, medianCondo: 200000, medianTerrace: 250000, trend: "flat", transactionShare: 2.5, transactionYoYChange: -4.75, overhangUnits: 750, overhangValueBillion: 0.28, housingStock: 2.2, housingStartsQ1Q3_2025: 724, housingStartsYoY: -54.1, housingCompletionsQ1Q3_2025: 844, housingCompletionsYoY: 24.5, region: "East Coast" },
  { state: "Perak", code: "PRK", avgPrice: 280724, avgPriceUSD: 69025, medianCondo: 190000, medianTerrace: 240000, trend: "flat", transactionShare: 11.4, transactionYoYChange: 6.41, overhangUnits: 3300, overhangValueBillion: 1.1, housingStock: 8.6, housingStartsQ1Q3_2025: 7553, housingStartsYoY: 29.3, housingCompletionsQ1Q3_2025: 7807, housingCompletionsYoY: 40.9, region: "Northern" },
  { state: "Pahang", code: "PHG", avgPrice: 275159, avgPriceUSD: 67657, medianCondo: 220000, medianTerrace: 260000, trend: "flat", transactionShare: 3.5, transactionYoYChange: 10.74, overhangUnits: 1100, overhangValueBillion: 0.45, housingStock: 3.0, housingStartsQ1Q3_2025: 3197, housingStartsYoY: -14.5, housingCompletionsQ1Q3_2025: 2777, housingCompletionsYoY: 26.7, region: "East Coast" },
  { state: "Kelantan", code: "KTN", avgPrice: 272824, avgPriceUSD: 67082, medianCondo: 160000, medianTerrace: 190000, trend: "flat", transactionShare: 3.0, transactionYoYChange: 98.05, overhangUnits: 2599, overhangValueBillion: 0.55, housingStock: 2.5, housingStartsQ1Q3_2025: 822, housingStartsYoY: -33.8, housingCompletionsQ1Q3_2025: 2644, housingCompletionsYoY: 84.4, region: "East Coast" },
  { state: "Melaka", code: "MLK", avgPrice: 250311, avgPriceUSD: 61547, medianCondo: 310000, medianTerrace: 350000, trend: "flat", transactionShare: 3.5, transactionYoYChange: 29.83, overhangUnits: 532, overhangValueBillion: 0.22, housingStock: 2.8, housingStartsQ1Q3_2025: 4595, housingStartsYoY: -19.4, housingCompletionsQ1Q3_2025: 4309, housingCompletionsYoY: 682.0, region: "Southern" },
  { state: "Perlis", code: "PLS", avgPrice: 246254, avgPriceUSD: 60549, medianCondo: 150000, medianTerrace: 180000, trend: "flat", transactionShare: 0.8, transactionYoYChange: -16.95, overhangUnits: 120, overhangValueBillion: 0.04, housingStock: 0.5, housingStartsQ1Q3_2025: 195, housingStartsYoY: 10.2, housingCompletionsQ1Q3_2025: 305, housingCompletionsYoY: 78.4, region: "Northern" },
  { state: "Putrajaya", code: "PJY", avgPrice: 550000, avgPriceUSD: 135234, medianCondo: 550000, medianTerrace: 680000, trend: "flat", transactionShare: 0.3, transactionYoYChange: 9.7, overhangUnits: 50, overhangValueBillion: 0.02, housingStock: 0.3, housingStartsQ1Q3_2025: 0, housingStartsYoY: 0, housingCompletionsQ1Q3_2025: 0, housingCompletionsYoY: 0, region: "Federal Territory" },
  { state: "Labuan", code: "LBN", avgPrice: 280000, avgPriceUSD: 68846, medianCondo: 240000, medianTerrace: 280000, trend: "flat", transactionShare: 0.1, transactionYoYChange: 9.68, overhangUnits: 80, overhangValueBillion: 0.03, housingStock: 0.2, housingStartsQ1Q3_2025: 38, housingStartsYoY: 111.1, housingCompletionsQ1Q3_2025: 0, housingCompletionsYoY: 0, region: "Federal Territory" },
];

// National House Price Index (MHPI) — NAPIC/JPPH
export interface MHPIData {
  year: number;
  quarter: string;
  indexPoints: number;
  yoyChange: number;
}

export const mhpiData: MHPIData[] = [
  { year: 2019, quarter: "Q1", indexPoints: 199.5, yoyChange: 1.4 },
  { year: 2019, quarter: "Q2", indexPoints: 200.8, yoyChange: 1.6 },
  { year: 2019, quarter: "Q3", indexPoints: 202.1, yoyChange: 1.8 },
  { year: 2019, quarter: "Q4", indexPoints: 203.6, yoyChange: 1.79 },
  { year: 2020, quarter: "Q1", indexPoints: 204.2, yoyChange: 2.4 },
  { year: 2020, quarter: "Q2", indexPoints: 201.5, yoyChange: 0.3 },
  { year: 2020, quarter: "Q3", indexPoints: 204.8, yoyChange: 1.3 },
  { year: 2020, quarter: "Q4", indexPoints: 206.0, yoyChange: 1.21 },
  { year: 2021, quarter: "Q1", indexPoints: 207.2, yoyChange: 1.5 },
  { year: 2021, quarter: "Q2", indexPoints: 208.0, yoyChange: 3.2 },
  { year: 2021, quarter: "Q3", indexPoints: 207.5, yoyChange: 1.3 },
  { year: 2021, quarter: "Q4", indexPoints: 209.9, yoyChange: 1.89 },
  { year: 2022, quarter: "Q1", indexPoints: 211.0, yoyChange: 1.8 },
  { year: 2022, quarter: "Q2", indexPoints: 213.5, yoyChange: 2.6 },
  { year: 2022, quarter: "Q3", indexPoints: 215.8, yoyChange: 4.0 },
  { year: 2022, quarter: "Q4", indexPoints: 217.8, yoyChange: 3.9 },
  { year: 2023, quarter: "Q1", indexPoints: 218.5, yoyChange: 3.6 },
  { year: 2023, quarter: "Q2", indexPoints: 219.2, yoyChange: 2.7 },
  { year: 2023, quarter: "Q3", indexPoints: 220.5, yoyChange: 2.2 },
  { year: 2023, quarter: "Q4", indexPoints: 221.0, yoyChange: 3.85 },
  { year: 2024, quarter: "Q1", indexPoints: 222.8, yoyChange: 2.0 },
  { year: 2024, quarter: "Q2", indexPoints: 224.5, yoyChange: 4.1 },
  { year: 2024, quarter: "Q3", indexPoints: 228.3, yoyChange: 4.33 },
  { year: 2024, quarter: "Q4", indexPoints: 225.6, yoyChange: 4.43 },
  { year: 2025, quarter: "Q1", indexPoints: 230.6, yoyChange: 3.54 },
  { year: 2025, quarter: "Q2", indexPoints: 232.4, yoyChange: 3.01 },
  { year: 2025, quarter: "Q3", indexPoints: 228.8, yoyChange: 0.1 },
];

// National transaction data
export interface TransactionData {
  year: number;
  volume: number;
  valueBillion: number;
  yoyVolumeChange: number;
  yoyValueChange: number;
}

export const transactionData: TransactionData[] = [
  { year: 2018, volume: 313710, valueBillion: 141.80, yoyVolumeChange: 4.3, yoyValueChange: 3.5 },
  { year: 2019, volume: 328647, valueBillion: 152.41, yoyVolumeChange: 4.8, yoyValueChange: 7.5 },
  { year: 2020, volume: 295968, valueBillion: 119.08, yoyVolumeChange: -8.6, yoyValueChange: -9.0 },
  { year: 2021, volume: 300497, valueBillion: 144.87, yoyVolumeChange: 3.9, yoyValueChange: 16.7 },
  { year: 2022, volume: 389107, valueBillion: 179.07, yoyVolumeChange: 22.3, yoyValueChange: 22.6 },
  { year: 2023, volume: 399008, valueBillion: 196.80, yoyVolumeChange: 3.0, yoyValueChange: 7.1 },
  { year: 2024, volume: 420525, valueBillion: 232.30, yoyVolumeChange: 5.4, yoyValueChange: 18.0 },
];

// Property type average prices nationwide — Q3 2025
export interface PropertyTypePrice {
  type: string;
  avgPrice: number;
  yoyChange: number;
  qoqChange: number;
}

export const propertyTypePrices: PropertyTypePrice[] = [
  { type: "Semi-Detached", avgPrice: 757617, yoyChange: 1.8, qoqChange: -0.9 },
  { type: "Detached", avgPrice: 661458, yoyChange: -0.9, qoqChange: -3.3 },
  { type: "All Houses", avgPrice: 494384, yoyChange: 0.1, qoqChange: -1.46 },
  { type: "Terraced", avgPrice: 479882, yoyChange: 0.8, qoqChange: -1.3 },
  { type: "High-Rise", avgPrice: 375421, yoyChange: -2.6, qoqChange: -1.4 },
];

// Overhang data
export interface OverhangData {
  year: number;
  units: number;
  valueBillion: number;
  yoyChange: number;
}

export const overhangData: OverhangData[] = [
  { year: 2019, units: 33844, valueBillion: 22.79, yoyChange: 4.2 },
  { year: 2020, units: 36863, valueBillion: 25.14, yoyChange: 8.9 },
  { year: 2021, units: 34092, valueBillion: 22.44, yoyChange: -7.5 },
  { year: 2022, units: 27746, valueBillion: 19.24, yoyChange: -24.7 },
  { year: 2023, units: 25816, valueBillion: 17.68, yoyChange: -7.0 },
  { year: 2024, units: 23149, valueBillion: 13.94, yoyChange: -10.3 },
];

// Construction activity national (annual)
export interface ConstructionData {
  year: number;
  newLaunches: number;
  housingStarts: number;
  completions: number;
  salesPerformance: number; // percentage
}

export const constructionData: ConstructionData[] = [
  { year: 2019, newLaunches: 67123, housingStarts: 95300, completions: 82000, salesPerformance: 38.5 },
  { year: 2020, newLaunches: 41520, housingStarts: 68200, completions: 75400, salesPerformance: 32.1 },
  { year: 2021, newLaunches: 48765, housingStarts: 86258, completions: 72300, salesPerformance: 35.2 },
  { year: 2022, newLaunches: 56447, housingStarts: 97804, completions: 78500, salesPerformance: 36.8 },
  { year: 2023, newLaunches: 56536, housingStarts: 88100, completions: 81600, salesPerformance: 37.0 },
  { year: 2024, newLaunches: 75784, housingStarts: 106260, completions: 89500, salesPerformance: 37.3 },
];

// Key national metrics
export const nationalMetrics = {
  avgHousePrice: 494384,
  avgHousePriceFormatted: "RM 494,384",
  mhpiIndex: 225.6,
  mhpiGrowth: 3.3,
  totalTransactions2024: 420525,
  totalValue2024: 232.30,
  overhangUnits2024: 23149,
  overhangValue2024: 13.94,
  gdpGrowth2024: 5.1,
  totalHousingStock: 6480000,
  newLaunches2024: 75784,
  salesPerformance2024: 37.3,
  occupancyRateShopping: 78.8,
  opr: 3.0,
};

// Data sources
export const dataSources = [
  { name: "NAPIC / JPPH", description: "National Property Information Centre", url: "https://napic.jpph.gov.my" },
  { name: "DOSM", description: "Department of Statistics Malaysia", url: "https://www.dosm.gov.my" },
  { name: "BNM", description: "Bank Negara Malaysia", url: "https://www.bnm.gov.my" },
  { name: "MOF", description: "Ministry of Finance Malaysia", url: "https://www.mof.gov.my" },
];

export function formatRM(value: number): string {
  return `RM ${value.toLocaleString("en-MY")}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-MY");
}

export function formatBillion(value: number): string {
  return `RM ${value.toFixed(2)}B`;
}
