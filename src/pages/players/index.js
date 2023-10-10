import CommonLayout from "@/components/layouts/CommonLayout";
import PlayerList from "@/components/players/PlayerList";
import { fetchAllPlayers } from "@/services/playerSerivce";
import { Container } from "@mui/material";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

const playerListPage = () => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching, isLoading, isError } = useInfiniteQuery(
    ["players"],
    ({ pageParam = 1 }) => fetchAllPlayers({ page: pageParam }),
    {
      getNextPageParam: ({ last }, allPages) => !last && allPages.length + 1,
    }
  );

  const pages = useMemo(() => data?.pages || [], [data]);

  return (
    <CommonLayout>
      <Container maxWidth="md">
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => !isFetchingNextPage && fetchNextPage()}>
          <PlayerList pages={pages} />
        </InfiniteScroll>
      </Container>
    </CommonLayout>
  );
};

export default playerListPage;
