import { useContext } from "react";
import { SquareLoader } from "react-spinners";
import { TextContext } from "../../contexts/text.context";

const LoadingSpinner = () => {
  const { loading } = useContext(TextContext);

  return (
    loading && (
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <SquareLoader color="#3b4261" loading={true} size={150} />
      </div>
    )
  );
};

export default LoadingSpinner;
