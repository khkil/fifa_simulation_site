import ChargeCalutationGraph from "@/components/home/ChargeCalutationGraph";
import PlayerPriceRank from "@/components/home/PlayerPriceRank";
import CommonLayout from "@/components/layouts/CommonLayout";
import NicknameSearchBox from "@/components/user/NicknameSearchBox";
import { fetchPlayerPriceWave } from "@/services/playerSerivce";
import { Box, Container, Grid } from "@mui/material";
import { useQueries } from "react-query";

export default function Home() {
  const [{ data: plusPrice, ...plusProps }, { data: minusPrice, ...minusProps }] = useQueries([
    {
      queryKey: ["plusPrice"],
      queryFn: () => fetchPlayerPriceWave(),
    },
    {
      queryKey: ["minusPrice"],
      queryFn: () => fetchPlayerPriceWave({ sort: "wave,asc" }),
    },
  ]);

  return (
    <CommonLayout>
      <Container maxWidth="xl">
        <NicknameSearchBox pathname={"/user/squad"} />
        <Grid container spacing={10} mb={3}>
          <Grid item xs={6}>
            <PlayerPriceRank title={"시세 급 상승 순위"} priceRank={plusPrice} isLoading={plusProps.isLoading} />
          </Grid>
          <Grid item xs={6}>
            <PlayerPriceRank title={"시세 급 하락 순위"} priceRank={minusPrice} isLoading={minusProps.isLoading} />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Box>{/* to-do 시세 그래프?  */}</Box>
          <Box sx={{ width: "50%" }}>
            <ChargeCalutationGraph />
          </Box>
        </Box>
      </Container>
    </CommonLayout>
  );
}
