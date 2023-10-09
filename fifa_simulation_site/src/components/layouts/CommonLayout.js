import Header from "@/components/common/Header";
import { Box } from "@mui/material";

const CommonLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ pt: 3 }}>
        <main>{children}</main>
      </Box>
    </>
  );
};

export default CommonLayout;
