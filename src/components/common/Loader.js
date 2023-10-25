import { Box, useTheme } from "@mui/material";
import { BeatLoader } from "react-spinners";

const Loader = ({ height }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center", height: height || 600, alignItems: "center" }}>
      <BeatLoader size={15} color={theme.palette.primary.main} aria-label="Loading Spinner" data-testid="loader" />
    </Box>
  );
};

export default Loader;
