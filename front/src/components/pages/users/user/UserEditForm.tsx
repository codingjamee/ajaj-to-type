import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import { PortfolioOwnerDataContext } from "../Portfolio";
import api from "@utils/axiosConfig";

import defaultImg from "@assets/logo0.png";
import { UserCardPropsType } from "./UserCard";
import { userInfoType } from "../../../../../typings/types";

interface UserEditForm extends UserCardPropsType {
  setUser: React.Dispatch<React.SetStateAction<userInfoType[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserEditForm({ user, setIsEditing, setUser }: UserEditForm) {
  const [image, setImage] = useState<File | null>(null);
  const [imageBase, setImageBase] = useState(defaultImg);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);

  const onAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0] || null;
    setImage(selectedFile);

    // setImageBase([]);
    let reader = new FileReader();
    if (selectedFile) reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        const base64Str = base64.toString();
        setImageBase([base64Str]);
        setImage(selectedFile);
      }
    };
  };

  //제출버튼 클릭시 patch메서드 실행
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      alert("이미지를 등록해주세요");
      return;
    }

    const userProfileData = new FormData();
    userProfileData.append("image", image);
    userProfileData.append("name", name);
    userProfileData.append("email", email);
    userProfileData.append("description", description);

    try {
      const res = await api.patch(
        `users/${portfolioOwnerData?._id}`,
        userProfileData
      );

      const updatedUserImgUrl = res.data.userImgUrl;

      if (res.status === 200) {
        setUser((prev) => {
          return {
            ...prev,
            name,
            email,
            description,
            userImgUrl: updatedUserImgUrl,
          };
        });
        setName("");
        setEmail("");
        setDescription("");
        setIsEditing(false);
      } else if (res.status !== 200) {
        // throw new Error("PATCH 요청이 실패하였습니다.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card border="warning" className="mb-2">
      <Card.Body
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <Card.Subtitle
          className="mb-2 text-muted"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            alt="userImage"
            src={imageBase}
            style={{ display: "flex", width: "100%" }}
          />
        </Card.Subtitle>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group controlId="useEditPhoto" className="mb-3">
            <Form.Control
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => onAddImage(e)}
            />
          </Form.Group>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col>
              <Button variant="outline-primary" type="submit" className="me-3">
                Save
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
