import DashboardPageClient from "@/components/client/pages/dashboard";
import { authCaller } from "@/server/api/routers/auth";
import { db } from "@eboto-mo/db";
import {
  type Commissioner,
  type Election,
  type Vote,
  type Voter,
} from "@eboto-mo/db/schema";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "eBoto Mo | Dashboard",
};

export default async function Page() {
  const session = await authCaller.getSession();

  if (!session) notFound();

  const electionsAsCommissioner: (Commissioner & { election: Election })[] =
    await db.query.commissioners.findMany({
      where: (commissioners, { eq }) =>
        eq(commissioners.user_id, session.user.id),
      with: {
        election: true,
      },
    });

  const electionsAsVoter: (Voter & {
    election: Election & { votes: Vote[] };
  })[] = await db.query.voters.findMany({
    where: (voters, { eq }) => eq(voters.user_id, session.user.id),
    with: {
      election: {
        with: {
          votes: {
            where: (votes, { eq }) => eq(votes.voter_id, session.user.id),
          },
        },
      },
    },
  });

  return (
    <>
      <DashboardPageClient
        commissioners={electionsAsCommissioner}
        voters={electionsAsVoter}
      />
    </>
  );
}
