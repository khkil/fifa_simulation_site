import CommonLayout from "@/components/layouts/CommonLayout";
import NicknameSearchBox from "@/components/user/NicknameSearchBox";
import TrabeTypeTabs from "@/components/user/trades/TrabeTypeTabs";
import { TRADE_TYPES } from "@/constants";
import { fetchUserTrades } from "@/services/userService";
import { Container } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";

const UserTradePage = () => {
  const [nickname, setNickname] = useState("");
  const [tradeType, setTradeType] = useState(TRADE_TYPES[0].type);

  const { data } = useQuery(
    ["userTrades"],
    () =>
      fetchUserTrades({
        nickname,
        tradeType,
        offset: 0,
        limit: 10,
      }),
    {
      enabled: !!nickname,
    }
  );

  return (
    <CommonLayout>
      <Container maxWidth="lg">
        <NicknameSearchBox nickname={nickname} setNickname={setNickname} />
        <TrabeTypeTabs tradeType={tradeType} setTradeType={setTradeType} />
      </Container>
    </CommonLayout>
  );
};

export default UserTradePage;
