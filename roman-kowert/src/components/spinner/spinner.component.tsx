import { SquareLoader } from "react-spinners";
// import { useLoading } from "../contexts/LoadingContext";

const LoadingSpinner = () => {
  // const { isLoading } = useLoading();
  const isLoading = true;

  return (
    isLoading && (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <SquareLoader color="#4A90E2" loading={true} size={50} />
      </div>
    )
  );
};

export default LoadingSpinner;
