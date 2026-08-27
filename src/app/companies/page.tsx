import { getServicedCompanies } from "@/lib/db";
import ServicedCompaniesClient from "./ServicedCompaniesClient";

export const revalidate = 0;

export default async function ServicedCompaniesPage() {
  const initialCompanies = await getServicedCompanies();
  return <ServicedCompaniesClient initialCompanies={initialCompanies} />;
}
