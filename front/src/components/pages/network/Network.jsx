import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import api from "@utils/axiosConfig";
import { useSelector } from "react-redux";
import NetworkPage from "./NetworkPage";
import PagiNation from "./PagiNation";

function Network() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userLogin);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.userInfo.id) {
      navigate("/login");
      return;
    }
    api.get("userlist").then((res) => {
      setPages(res.data.totalPage);
      return setUsers(res.data?.users);
    });
  }, [userState.userInfo?.id, navigate]);

  return (
    <Container
      fluid
      style={{
        textAlign: "center",
        margin: "50px 50px 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NetworkPage users={users} setUsers={setUsers} />
      <PagiNation pages={pages} />
    </Container>
  );
}

export default Network;
