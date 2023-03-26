import { Stack, Text, Center, Loader } from "@mantine/core";
import { useRouter } from "next/router";
import Candidates from "../../../components/Candidates";
import { api } from "../../../utils/api";

const CandidatePartylist = () => {
  const router = useRouter();

  const candidates = api.candidate.getAll.useQuery(
    router.query.electionSlug as string,
    {
      enabled: router.isReady,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  if (candidates.isLoading)
    return (
      <Center h="100%">
        <Loader size="lg" />
      </Center>
    );

  if (candidates.isError) return <Text>Error</Text>;

  if (!candidates.data) return <Text>No data</Text>;

  return (
    <Stack spacing="lg">
      {candidates.data.positions.length === 0 ? (
        <Text>No positions yet</Text>
      ) : (
        candidates.data.positions.map((position) => {
          return (
            <Candidates
              key={position.id}
              position={position}
              partylists={candidates.data.partylists}
              positions={candidates.data.positions}
              candidates={
                candidates.data.candidates.filter
                  ? candidates.data.candidates.filter(
                      (candidate) => candidate.positionId === position.id
                    )
                  : []
              }
            />
          );
        })
      )}
    </Stack>
  );
};

export default CandidatePartylist;
