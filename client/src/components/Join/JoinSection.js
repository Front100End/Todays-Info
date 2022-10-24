import React, { useEffect, useState } from "react";
import styles from "./JoinSection.module.scss";
import { LongBarButton, LongBarInput } from "../../styles/LongBar";
import { joinAction } from "./joinAction";
import { useNavigate } from "react-router-dom";

const JoinSection = (props) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [checkState, setCheckState] = useState(false);
  const [guideMessage, setGuideMessage] = useState("");

  const navigate = useNavigate();

  const checkPassword = () => {
    if (password === "") {
      setCheckState(false);
    }
    if (passwordCheck === password) {
      setCheckState(true);
    } else {
      setCheckState(false);
    }
  };
  const guideMessageChange = (message) => {
    setGuideMessage(message);
  };

  useEffect(() => {
    checkPassword();
  }, [passwordCheck]);

  return (
    <section
      className={styles.JoinSection}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (
            checkState === true &&
            id !== "" &&
            email !== "" &&
            nickname !== ""
          ) {
            joinAction(
              id,
              nickname,
              email,
              password,
              navigate,
              guideMessageChange
            );
          } else {
            alert("비어있는 칸이 있는지 확인해주세요.");
          }
        }
      }}
    >
      <p>아이디</p>
      <LongBarInput
        placeholder="아이디 입력"
        style={{ marginTop: "8px" }}
        onChange={(e) => setId(e.target.value)}
      ></LongBarInput>
      {guideMessage ? <span>※ {guideMessage}</span> : ""}
      <p>별명</p>
      <LongBarInput
        placeholder="닉네임 입력"
        style={{ marginTop: "8px" }}
        onChange={(e) => setNickname(e.target.value)}
      ></LongBarInput>
      <p>이메일</p>
      <LongBarInput
        placeholder="이메일 입력"
        style={{ marginTop: "8px" }}
        onChange={(e) => setEmail(e.target.value)}
      ></LongBarInput>
      <p>비밀번호</p>
      <LongBarInput
        type="password"
        placeholder="비밀번호 입력"
        style={{ marginTop: "8px" }}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></LongBarInput>
      <LongBarInput
        type="password"
        placeholder="비밀번호 재입력"
        onChange={(e) => {
          setPasswordCheck(e.target.value);
        }}
      ></LongBarInput>
      {passwordCheck.length !== 0 ? (
        checkState ? (
          <span style={{ color: "#00e676" }}>※ 비밀번호가 일치합니다.</span>
        ) : (
          <span>※ 비밀번호가 일치하지 않습니다.</span>
        )
      ) : (
        ""
      )}
      <LongBarButton
        onClick={() => {
          if (
            checkState === true &&
            id !== "" &&
            email !== "" &&
            nickname !== ""
          ) {
            joinAction(
              id,
              nickname,
              email,
              password,
              navigate,
              guideMessageChange
            );
          } else {
            alert("비어있는 칸이 있는지 확인해주세요.");
          }
        }}
      >
        가입하기
      </LongBarButton>
    </section>
  );
};

export default JoinSection;
