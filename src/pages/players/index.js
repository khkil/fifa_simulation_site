import Loader from "@/components/common/Loader";
import CommonLayout from "@/components/layouts/CommonLayout";
import PlayerList from "@/components/players/PlayerList";
import PlayerSearchBoxes from "@/components/players/PlayerSearchBoxes";
import { fetchAllPlayers } from "@/services/playerSerivce";
import { Container } from "@mui/material";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

export const initialParams = {
  clubIds: [],
  skillIds: [],
  seasonIds: [],
  nations: [],
  name: "",
};

const playerListPage = ({ clubs, skills, seasons, nations }) => {
  const [params, setParams] = useState(initialParams);
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching, isLoading, isError } = useInfiniteQuery(
    ["players", params],
    ({ pageParam = 1 }) => fetchAllPlayers({ page: pageParam, ...params }),
    {
      getNextPageParam: ({ last }, allPages) => (!last ? allPages.length + 1 : undefined),
    }
  );

  const pages = useMemo(() => data?.pages || [], [data]);

  return (
    <CommonLayout>
      <Container maxWidth="lg">
        <PlayerSearchBoxes params={params} setParams={setParams} clubs={clubs} skills={skills} seasons={seasons} nations={nations} />
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => !isFetchingNextPage && fetchNextPage()}>
          {pages.length == 0 ? <Loader /> : <PlayerList pages={pages} />}
        </InfiniteScroll>
      </Container>
    </CommonLayout>
  );
};

export const getServerSideProps = async () => {
  const responses = await Promise.all([
    fetch(`${process.env.API_DOMAIN}/api/clubs`),
    fetch(`${process.env.API_DOMAIN}/api/skills`),
    fetch(`${process.env.API_DOMAIN}/api/seasons`),
    fetch(`${process.env.API_DOMAIN}/api/nations`),
  ]);

  const [{ data: clubs }, { data: skills }, { data: seasons }, { data: nations }] = await Promise.all(responses.map((response) => response.json()));
  return {
    props: {
      clubs,
      skills,
      seasons,
      nations,
    },
  };
};

export default playerListPage;
