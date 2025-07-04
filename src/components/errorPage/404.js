import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <>
      <ErrorMessage />
      <p style={{ textAlign: "center", frontWeight: "bold", fontSize: "24px" }}>
        Page doesn't exist
      </p>
      <Link
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "30px",
        }}
        to="/"
      >
        Back to main page
      </Link>
    </>
  );
};

export default Page404;
