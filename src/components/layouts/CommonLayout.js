import Header from "@/components/layouts/Header";
import { Box, Grid } from "@mui/material";
import KakaoBanner from "../banner/KakaoBanner";

const CommonLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ pt: 3 }}>
        <Grid container>
          <Grid item xs={2.5} sx={{ p: "5%" }}>
            {/* <KakaoBanner width={160} height={600} unit={"DAN-APGWQDUr1cnndHEc"} /> */}
          </Grid>
          <Grid item xs={7}>
            <Box sx={{ ml: 31, mb: 3, height: 90 }}>
              <KakaoBanner width={720} height={90} unit={"DAN-RDzqKJqyvW8vJI9e"} />
            </Box>
            <main>{children}</main>
            <Box sx={{ mt: 5, ml: 31 }}>
              <KakaoBanner width={720} height={90} unit={"DAN-EuSY9A38xFhSj6Dc"} />
            </Box>
          </Grid>
          <Grid item xs={2.5}>
            {/* <KakaoBanner width={160} height={600} unit={"DAN-SHatJZzwzc2b6NVW"} /> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CommonLayout;
