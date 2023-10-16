import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ loading }) => {
  const override = {
    color: "#00b495",
    margin: "20% 50% 20% 50%",
  };
  return <ClipLoader loading={loading} size={100} color="#00b495" cssOverride={override} aria-label="Loading Spinner" data-testid="loader" />;
};

export default Loader;
