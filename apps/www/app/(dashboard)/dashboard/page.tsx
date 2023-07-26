import DashboardCard from "@/components/client/components/dashboard-card";
import CreateElection from "@/components/client/modals/create-election";
import { auth } from "@clerk/nextjs";
import { db } from "@eboto-mo/db";
import type { Commissioner, Election, Vote, Voter } from "@eboto-mo/db/schema";
import {
  Box,
  Container,
  Group,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "eBoto Mo | Dashboard",
};

export default async function Page() {
  const { userId } = auth();

  if (!userId) notFound();

  const electionsAsCommissioner: (Commissioner & { election: Election })[] =
    await db.query.commissioners.findMany({
      where: (commissioners, { eq }) => eq(commissioners.user_id, userId),
      with: {
        election: true,
      },
    });

  const electionsAsVoter: (Voter & {
    election: Election & { votes: Vote[] };
  })[] = await db.query.voters.findMany({
    where: (voters, { eq }) => eq(voters.user_id, userId),
    with: {
      election: {
        with: {
          votes: {
            where: (votes, { eq }) => eq(votes.voter_id, userId),
          },
        },
      },
    },
  });

  return (
    <Container size="md" my="md">
      <Stack gap="lg">
        <Box>
          <Group align="center" justify="space-between">
            <Title
              order={2}
              // style={(theme) => ({
              //   [theme.fn.smallerThan("xs")]: {
              //     fontSize: theme.fontSizes.xl,
              //   },
              // })}
            >
              My elections
            </Title>

            <CreateElection />
          </Group>
          <Text
            size="xs"
            color="grayText"
            mb="md"
            //   style={(theme) => ({
            //     marginBottom: theme.spacing.xs,
            //   })}
          >
            You can manage the elections below.
          </Text>
          <Group>
            {!electionsAsCommissioner ? (
              Array(3).map((_, i) => (
                <Skeleton
                  key={i}
                  width={250}
                  height={332}
                  radius="md"
                  // style={(theme) => ({
                  //   [theme.fn.smallerThan("xs")]: { width: "100%" },
                  // })}
                />
              ))
            ) : electionsAsCommissioner.length === 0 ? (
              <Box h={72}>
                <Text>No elections found</Text>
              </Box>
            ) : (
              electionsAsCommissioner.map((commissioner) => (
                <DashboardCard
                  election={commissioner.election}
                  key={commissioner.id}
                  type="manage"
                />
              ))
            )}
          </Group>
        </Box>

        <Box>
          <Title
            order={2}
            // style={(theme) => ({
            //   [theme.fn.smallerThan("xs")]: {
            //     fontSize: theme.fontSizes.xl,
            //   },
            // })}
          >
            My elections I can vote in
          </Title>
          <Text size="xs" color="grayText" mb="sm">
            You can vote in the elections below. You can only vote once per
            election.
          </Text>

          <Group>
            {!electionsAsVoter ? (
              Array(3).map((_, i) => (
                <Skeleton
                  key={i}
                  width={250}
                  height={352}
                  radius="md"
                  // style={(theme) => ({
                  //   [theme.fn.smallerThan("xs")]: { width: "100%" },
                  // })}
                />
              ))
            ) : electionsAsVoter.length === 0 ? (
              <Box h={72}>
                <Text>No vote elections found</Text>
              </Box>
            ) : (
              electionsAsVoter.map((voter) => (
                <DashboardCard
                  election={voter.election}
                  key={voter.id}
                  type="vote"
                  // vote={election.vote}
                />
              ))
            )}
          </Group>
        </Box>
      </Stack>
    </Container>
  );
}
