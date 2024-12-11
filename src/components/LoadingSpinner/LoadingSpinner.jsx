import { Oval } from "react-loader-spinner";
import "./LoadingSpinner.scss";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#17a8b5"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoadingSpinner;
