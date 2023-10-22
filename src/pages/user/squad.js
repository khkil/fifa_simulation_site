import Loader from "@/components/common/Loader";
import NotFound from "@/components/common/NotFound";
import CommonLayout from "@/components/layouts/CommonLayout";
import NicknameSearchBox from "@/components/user/NicknameSearchBox";
import SquadPlayerList from "@/components/user/squad/SquadPlayerList";
import UserDetailInfo from "@/components/user/squad/UserDetailInfo";
import { fetchUserInfo, fetchUserSquad } from "@/services/userService";
import { Container, Typography } from "@mui/material";
import { useMemo } from "react";
import { useQueries } from "react-query";

const UserSquadPage = ({ query }) => {
  const nickname = query?.nickname;
  const enabled = useMemo(() => !!nickname, [nickname]);

  const [{ data: info, ...infoProps }, { data: squad, ...squadProps }] = useQueries([
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
        <Typography sx={{ pl: 2, color: "#aaaaaa", fontSize: 15 }}>* 최근 공식경기를 진행한 이력의 스쿼드를 가져옵니다.</Typography>
        {enabled &&
          (isLoading ? (
            <Loader />
          ) : isSuccess ? (
            <>
              <UserDetailInfo squad={squad} info={info} />
              <SquadPlayerList squad={squad} />
            </>
          ) : (
            <NotFound text={"최근 공식경기를 진행하지 않았거나 존재하지 않는 유저입니다."} />
          ))}
      </Container>
    </CommonLayout>
  );
};

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      query,
    },
  };
};

export default UserSquadPage;
