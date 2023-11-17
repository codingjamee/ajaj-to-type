import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import defaultImg from "@assets/logo0.png";
import { userInfoType } from "../../../../../typings/types";

export interface UserCardPropsType {
  user: userInfoType;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditable?: boolean;
  isNetwork?: boolean;
  setUser?: React.Dispatch<React.SetStateAction<userInfoType[]>>;
}

function UserCard({
  user,
  setIsEditing,
  isEditable,
  isNetwork,
}: UserCardPropsType) {
  const navigate = useNavigate();
  return (
    <Card className="mb-2 ms-3 mr-5" border="warning">
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{
              width: "10rem",
              height: "8rem",
              margin: "auto",
              display: "block",
            }}
            className="mb-3"
            src={user?.userImgUrl || defaultImg}
            alt="프로필이미지"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user._id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
