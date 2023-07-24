import DashboardLayout from "@/components/client/layouts/dashboard-layout";
import { siteConfig } from "@/config/site";
import { electionCaller } from "@/server/api/routers/election";
import { type Metadata, type ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(
  {
    params,
  }: {
    params: { electionDashboardSlug: string };
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const election = await electionCaller.getElectionBySlug({
    slug: params.electionDashboardSlug,
  });

  if (!election) notFound();

  return {
    title: {
      default:
        "Overview - " + election.name + " - Dashboard | " + siteConfig.name,
      template: "%s - " + election.name + " - Dashboard | " + siteConfig.name,
    },
  };
}

export default async function ElectionDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
