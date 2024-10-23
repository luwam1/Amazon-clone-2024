import { FadeLoader } from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full viewport height for better centering
      }}
    >
      <FadeLoader />
    </div>
  );
}

export default Loader;
