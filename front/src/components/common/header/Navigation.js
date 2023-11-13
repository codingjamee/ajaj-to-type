import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../UI/design.css";
import logo from "./logo0.png";
import api from "../../../utils/axiosConfig";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginActions } from "../../../store/userLogin";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const userState = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const navItems = useMemo(
    () => [
      { path: "/", label: "홈페이지" },
      { path: `/users/${userState?.userInfo?.id}`, label: "마이페이지" },
      { path: "/network", label: "네트워크" },
    ],
    [userState?.userInfo?.id]
  );

  const isLogin = !!userState?.userInfo?.id;

  const logout = async () => {
    await api.get("logout", "", "Navigation");
    dispatch(userLoginActions.clearUser());
    navigate("/");
  };

  const onClickmemberDelete = async () => {
    await api.delete(`/users/${userState?.userInfo?.id}`);
  };

  return (
    <Navbar variant="dark">
      <Nav.Link onClick={() => navigate("/")}>
        <img src={logo} alt="logo" width={"130px"} height={"100%"} />
        AJAJ : My first portfolio
      </Nav.Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" />
      <Nav className="mr-auto" activeKey={location.pathname}>
        {navItems.map(({ path, label }, index) => (
          <Nav.Link key={`navitem-${index}`} onClick={() => navigate(path)}>
            {label}
          </Nav.Link>
        ))}
        {isLogin && (
          <>
            <Nav.Link onClick={logout}>로그아웃</Nav.Link>
            <Nav.Link onClick={onClickmemberDelete}>회원탈퇴</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default Navigation;
