import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import UserCard from "../users/user/UserCard";
import api from "../../../utils/axiosConfig";
import { useSelector } from "react-redux";

const NetworkPage = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userLogin);
  const location = useLocation();

  useEffect(() => {
    if (!userState.userInfo.id) {
      navigate("/login");
      return;
    }

    api
      .get("/userlist" + location.search)
      .then((res) => setUsers(res.data.users));
  }, [userState.userInfo?.id, navigate, location.search]);

  return (
    <Container fluid style={{ textAlign: "center", marginTop: "50px" }}>
      <Row
        lg={4}
        className="jusify-content-center"
        style={{ justifyContent: "center" }}
      >
        {users?.map((user, index) => (
          <UserCard key={`userCard-${index}`} user={user} isNetwork />
        ))}
      </Row>
    </Container>
  );
};

export default NetworkPage;
