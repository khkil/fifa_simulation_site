import { useTheme } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ loading }) => {
  const theme = useTheme();
  const override = {
    color: theme.palette.primary.main,
    margin: "20% 50% 20% 50%",
  };
  return (
    <ClipLoader
      loading={loading}
      size={100}
      color={theme.palette.primary.main}
      cssOverride={override}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
