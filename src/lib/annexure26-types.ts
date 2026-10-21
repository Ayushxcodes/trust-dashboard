export interface ComplaintSourceData {
  sn: number;
  source: string;
  carriedForward: number;
  received: number;
  totalPending: number;
  resolved: number;
  pendingLessThan3Months: number;
  pendingMoreThan3Months: number;
  averageResolutionDays: number;
}

export interface MonthlyTrendData {
  sn: number;
  month: string;
  carriedForward: number;
  received: number;
  resolved: number;
  pending: number;
}

export interface AnnualTrendData {
  sn: number;
  year: string;
  carriedForward: number;
  received: number;
  resolved: number;
  pending: number;
}

export interface ArchivedMonthOption {
  id: string;
  monthYear: string;
  financialYear: string;
  carriedForward: number;
  received: number;
  totalPending: number;
  resolved: number;
  pending: number;
  pendingLess3M: number;
  pendingMore3M: number;
  avgResolutionDays: number;
  sourceWiseData: ComplaintSourceData[];
  isCurrent: boolean;
  archivedAt: string;
}

export interface Annexure26Report {
  annexureTitle: string;
  subTitle: string;
  monthEnding: string;
  financialYear: string;
  updatedAt: string;
  sourceWiseData: ComplaintSourceData[];
  monthlyTrend: MonthlyTrendData[];
  annualTrend: AnnualTrendData[];
  archivedMonths?: ArchivedMonthOption[];
}

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function parseMonthYear(monthStr: string): { year: number; month: number } | null {
  const months = MONTH_NAMES.map(m => m.toLowerCase());
  const lower = monthStr.toLowerCase();
  let foundMonth = -1;
  for (let i = 0; i < months.length; i++) {
    if (lower.includes(months[i].substring(0, 3))) {
      foundMonth = i;
      break;
    }
  }
  const yearMatch = monthStr.match(/\b(20\d{2})\b/);
  if (foundMonth !== -1 && yearMatch) {
    return { year: parseInt(yearMatch[1], 10), month: foundMonth };
  }
  return null;
}

export function calculateSourceWiseTotals(sources: ComplaintSourceData[]) {
  const carriedForward = sources.reduce((sum, s) => sum + (s.carriedForward || 0), 0);
  const received = sources.reduce((sum, s) => sum + (s.received || 0), 0);
  const totalPending = sources.reduce((sum, s) => sum + (s.totalPending || 0), 0);
  const resolved = sources.reduce((sum, s) => sum + (s.resolved || 0), 0);
  const pendingLessThan3Months = sources.reduce((sum, s) => sum + (s.pendingLessThan3Months || 0), 0);
  const pendingMoreThan3Months = sources.reduce((sum, s) => sum + (s.pendingMoreThan3Months || 0), 0);

  const totalResolutionTimeSum = sources.reduce(
    (sum, s) => sum + ((s.averageResolutionDays || 0) * (s.resolved || 0)),
    0
  );
  const averageResolutionDays =
    resolved > 0 ? parseFloat((totalResolutionTimeSum / resolved).toFixed(1)) : 0;

  return {
    carriedForward,
    received,
    totalPending,
    resolved,
    pendingLessThan3Months,
    pendingMoreThan3Months,
    averageResolutionDays,
  };
}

export function calculateMonthlyTrendTotals(trend: MonthlyTrendData[]) {
  return {
    carriedForward: trend.length > 0 ? trend[0].carriedForward : 0,
    received: trend.reduce((sum, t) => sum + (t.received || 0), 0),
    resolved: trend.reduce((sum, t) => sum + (t.resolved || 0), 0),
    pending: trend.length > 0 ? trend[trend.length - 1].pending : 0,
  };
}

export function calculateAnnualTrendTotals(trend: AnnualTrendData[]) {
  return {
    carriedForward: trend.length > 0 ? trend[0].carriedForward : 0,
    received: trend.reduce((sum, t) => sum + (t.received || 0), 0),
    resolved: trend.reduce((sum, t) => sum + (t.resolved || 0), 0),
    pending: trend.length > 0 ? trend[trend.length - 1].pending : 0,
  };
}
