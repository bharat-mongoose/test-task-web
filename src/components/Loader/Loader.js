import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = ({ isLoading }) => (
  <Backdrop
    sx={{ color: "#fff", zIndex: 9999}}
    open={isLoading ? isLoading : false}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);
export default Loader;