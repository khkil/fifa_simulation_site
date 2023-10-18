import ChargeCalutationGraph from "@/components/home/ChargeCalutationGraph";
import CommonLayout from "@/components/layouts/CommonLayout";
import { Container, Grid } from "@mui/material";

export default function Home() {
  return (
    <CommonLayout>
      <Container maxWidth="xl">
        <Grid container>
          <Grid xs={8}>메인</Grid>
          <Grid xs={4}>
            <ChargeCalutationGraph />
          </Grid>
        </Grid>
      </Container>
    </CommonLayout>
  );
}
