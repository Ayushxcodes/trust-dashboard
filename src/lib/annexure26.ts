import fs from "fs";
import path from "path";
import {
  ComplaintSourceData,
  MonthlyTrendData,
  AnnualTrendData,
  Annexure26Report,
  calculateSourceWiseTotals,
  calculateMonthlyTrendTotals,
  calculateAnnualTrendTotals,
} from "./annexure26-types";

export * from "./annexure26-types";

const DEFAULT_ANNEXURE_26_DATA: Annexure26Report = {
  annexureTitle: "Annexure-26",
  subTitle: "Data of complaints against Registrars to an Issue and Share Transfer Agents (RTAs) to be displayed on their websites",
  monthEnding: "October 2026",
  financialYear: "2026-27",
  updatedAt: new Date().toISOString(),
  sourceWiseData: [
    {
      sn: 1,
      source: "Directly from Investors",
      carriedForward: 0,
      received: 0,
      totalPending: 0,
      resolved: 0,
      pendingLessThan3Months: 0,
      pendingMoreThan3Months: 0,
      averageResolutionDays: 0,
    },
    {
      sn: 2,
      source: "SEBI (SCORES 2.0)",
      carriedForward: 0,
      received: 0,
      totalPending: 0,
      resolved: 0,
      pendingLessThan3Months: 0,
      pendingMoreThan3Months: 0,
      averageResolutionDays: 0,
    },
    {
      sn: 3,
      source: "Stock Exchanges (if relevant)",
      carriedForward: 0,
      received: 0,
      totalPending: 0,
      resolved: 0,
      pendingLessThan3Months: 0,
      pendingMoreThan3Months: 0,
      averageResolutionDays: 0,
    },
    {
      sn: 4,
      source: "Other Sources (if any)",
      carriedForward: 0,
      received: 0,
      totalPending: 0,
      resolved: 0,
      pendingLessThan3Months: 0,
      pendingMoreThan3Months: 0,
      averageResolutionDays: 0,
    },
  ],
  monthlyTrend: [],
  annualTrend: [],
};

const DATA_FILE_PATH = path.join(process.cwd(), "src", "lib", "annexure26-data.json");

let inMemoryData: Annexure26Report | null = null;

export function getAnnexure26Data(): Annexure26Report {
  if (inMemoryData) {
    return inMemoryData;
  }

  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      inMemoryData = JSON.parse(raw);
      if (inMemoryData) {
        return inMemoryData;
      }
    }
  } catch (err) {
    console.warn("Could not read annexure26-data.json, fallback to default:", err);
  }

  inMemoryData = { ...DEFAULT_ANNEXURE_26_DATA };
  return inMemoryData;
}

export function saveAnnexure26Data(data: Partial<Annexure26Report>): Annexure26Report {
  const current = getAnnexure26Data();
  const updated: Annexure26Report = {
    ...current,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  inMemoryData = updated;

  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not persist annexure26-data.json:", err);
  }

  return updated;
}
