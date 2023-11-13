import { Link } from "react-router-dom";

const PagiNation = ({ pages }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "70px",
        }}
      >
        <Link to="/network?page=1">처음으로</Link>
        {Array.from({ length: pages }, (_, index) => (
          <Link
            key={`network-${index}`}
            to={`?page=${index + 1}`}
            // style={{ display: "flex", flexDirection: "row" }}
          >
            <p>{index + 1}</p>
          </Link>
        ))}
        <Link to={`/network?page=${pages}`}>마지막으로</Link>
      </div>
    </div>
  );
};

export default PagiNation;
