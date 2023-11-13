import React, { useContext, useState, useEffect, createContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import User from "./user/User";
import Educations from "./education/Educations";
import Certifications from "./certificate/Certificates";
import Awards from "./award/Awards";
import Projects from "./project/Projects";
import api from "@utils/axiosConfig";
import { useSelector } from "react-redux";

export const PortfolioOwnerDataContext = createContext({});

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  const [portfolioOwnerData, setPortfolioOwnerData] = useState({});
  const userState = useSelector((state) => state.userLogin);
  const isEditable = portfolioOwnerData?.id === userState?.userInfo?.id;

  const fetchPortfolioOwner = async (ownerId) => {
    try {
      const res = await api.get(`users/${ownerId}`);
      const ownerData = res.data;
      setPortfolioOwnerData(ownerData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    //userState가 없는 경우
    if (!userState?.userInfo?.id) {
      return navigate("/login", { replace: true });
    }

    // 현재 URL "/users/:userId"
    if (params.userId) {
      const ownerId = params.userId;
      fetchPortfolioOwner(ownerId);
    } else {
      // URL "/"
      const ownerId = userState?.userInfo?.id;
      fetchPortfolioOwner(ownerId);
    }
  }, [params]);

  return (
    <PortfolioOwnerDataContext.Provider value={portfolioOwnerData}>
      <Container fluid style={{ margin: "50px 20px 20px" }}>
        <Row>
          <Col
            md={4}
            lg={3}
            xl={2}
            xxl={2}
            style={{ textAlign: "center", overFlow: "hidden" }}
          >
            <User isEditable={isEditable} />
          </Col>
          <Col md={8} lg={9} xl={10} xxl={10}>
            <div
              style={{
                textAlign: "center",
                marginRight: "50px",
                marginLeft: "40px",
              }}
            >
              <Educations isEditable={isEditable} />
              <Certifications isEditable={isEditable} />
              <Awards isEditable={isEditable} />
              <Projects isEditable={isEditable} />
            </div>
          </Col>
        </Row>
      </Container>
    </PortfolioOwnerDataContext.Provider>
  );
}

export default Portfolio;
