import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { validateEmail, validatePassword } from "@utils/validate";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginActions } from "@store/userLogin";
import useApi from "@hooks/useApi";
import { RootState } from "@store/index";

function LoginForm() {
  const navigate = useNavigate();
  const [emailState, setEmail] = useState("");
  const [passwordState, setPassword] = useState("");
  const dispatch = useDispatch();
  // const [isFirst, setIsFirst] = useState(true);
  const userState = useSelector((state: RootState) => state.userLogin);
  const { result, trigger } = useApi({
    method: "get",
    path: "user/current",
    data: {},
    shouldInitFetch: false,
  });
  const isEmailValid = useMemo(() => validateEmail(emailState), [emailState]);
  const isPasswordValid = useMemo(
    () => validatePassword(passwordState),
    [passwordState]
  );
  const isFormValid = useMemo(
    () => isEmailValid && isPasswordValid,
    [isEmailValid, isPasswordValid]
  );

  useEffect(() => {
    if (!userState?.userInfo?._id) {
      navigate("/login", { replace: true });
      return;
    } else if (userState?.userInfo?._id) {
      navigate("/", { replace: true });
    }
  }, [userState?.userInfo?._id, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = {
      email: emailState,
      password: passwordState,
    };
    await trigger({
      method: "post",
      path: "user/login",
      data: loginData,
      applyResult: true,
      isShowBoundary: false,
      shouldSetError: false,
    });
  };

  useEffect(() => {
    if (result.status !== 200) return;
    const user = result.data;
    dispatch(userLoginActions.storeUser(user));
    navigate("/", { replace: true });
  }, [result]);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loginEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="on"
                value={emailState}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => {
                  // setIsFirst(false);
                  return validateEmail(emailState);
                }}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="loginPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="on"
                value={passwordState}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => {
                  // setIsFirst(false);
                  validatePassword(passwordState);
                }}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 5글자 이상입니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" disabled={!isFormValid}>
                  로그인
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="light" onClick={() => navigate("/register")}>
                  회원가입하기
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
