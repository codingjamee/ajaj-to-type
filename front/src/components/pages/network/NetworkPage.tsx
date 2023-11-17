import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import UserCard from "../users/user/UserCard";
import api from "@utils/axiosConfig";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { userInfoType } from "@store/userLogin";

type NetworkPageProps = {
  users: userInfoType[];
  setUsers: React.Dispatch<React.SetStateAction<userInfoType[]>>;
};

const NetworkPage = ({ users, setUsers }: NetworkPageProps) => {
  const navigate = useNavigate();
  const userState = useSelector((state: RootState) => state.userLogin);
  const location = useLocation();

  useEffect(() => {
    if (!userState.userInfo._id) {
      navigate("/login");
      return;
    }

    api
      .get("/userlist" + location.search)
      .then((res) => setUsers(res.data.users));
  }, [userState.userInfo?._id, navigate, location.search]);

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
