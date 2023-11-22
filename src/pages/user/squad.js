import Loader from "@/components/common/Loader";
import NotFound from "@/components/common/NotFound";
import CommonLayout from "@/components/layouts/CommonLayout";
import NicknameSearchBox from "@/components/user/NicknameSearchBox";
import SquestField from "@/components/user/squad/SquadField";
import SquadPlayerList from "@/components/user/squad/SquadPlayerList";
import SquadPriceGraph from "@/components/user/squad/SquadPriceGraph";
import UserDetailInfo from "@/components/user/squad/UserDetailInfo";
import { fetchUserInfo, fetchUserSquad } from "@/services/userService";
import { Container, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useQueries } from "react-query";

const UserSquadPageNew = ({ query, seasons }) => {
  const nickname = query?.nickname;
  const enabled = useMemo(() => !!nickname, [nickname]);

  const [{ data: userInfo, ...infoProps }, { data: squad, ...squadProps }] = useQueries([
    {
      queryKey: ["info", nickname],
      queryFn: () => fetchUserInfo({ nickname }),
      enabled,
    },
    {
      queryKey: ["squad", nickname],
      queryFn: () => fetchUserSquad({ nickname }),
      enabled,
    },
  ]);

  const isLoading = useMemo(() => infoProps.isLoading || squadProps.isLoading, [infoProps, squadProps]);
  const isSuccess = useMemo(() => infoProps.isSuccess && squadProps.isSuccess, [infoProps, squadProps]);

  return (
    <CommonLayout>
      <Container maxWidth="lg">
        <NicknameSearchBox nickname={query.nickname} />
        <Typography sx={{ pl: 2, color: "#aaaaaa", fontSize: 15 }}>* 검색한 유저의 스쿼드정보를 가져옵니다.</Typography>
        {enabled &&
          (isLoading ? (
            <Loader />
          ) : isSuccess ? (
            <>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <UserDetailInfo squad={squad} userInfo={userInfo} />
                </Grid>
                <Grid item xs={6}>
                  <SquestField squad={squad} seasons={seasons} />
                </Grid>

                <Grid item xs={12}>
                  <SquadPriceGraph priceList={squad.totalPriceList} />
                  <SquadPlayerList players={squad.players} seasons={seasons} />
                </Grid>
              </Grid>
            </>
          ) : (
            <NotFound text={"존재하지 않는 유저입니다."} />
          ))}
      </Container>
    </CommonLayout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const response = await fetch(`${process.env.API_DOMAIN}/api/seasons`);
  const { data: seasons } = await response.json();
  return {
    props: {
      query,
      seasons,
    },
  };
};

export default UserSquadPageNew;
