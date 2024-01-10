import Loader from "@/components/common/Loader";
import CommonLayout from "@/components/layouts/CommonLayout";
import PlayerList from "@/components/players/PlayerList";
import PlayerSearchBoxes from "@/components/players/PlayerSearchBoxes";
import { fetchPlayers } from "@/services/playerSerivce";
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
    ({ pageParam = 1 }) => fetchPlayers({ page: pageParam, ...params }),
    {
      getNextPageParam: ({ last }, allPages) => (!last ? allPages.length + 1 : undefined),
    }
  );

  const pages = useMemo(() => data?.pages || [], [data]);

  return (
    <CommonLayout>
      <PlayerSearchBoxes params={params} setParams={setParams} clubs={clubs} skills={skills} seasons={seasons} nations={nations} />
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => !isFetchingNextPage && fetchNextPage()}>
        {isLoading ? <Loader /> : <PlayerList pages={pages} />}
        {isFetchingNextPage && <Loader height={200} />}
      </InfiniteScroll>
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
