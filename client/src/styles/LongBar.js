import styled from "styled-components";

export const LongBarInput = styled.input`
  width: 100%;
  margin-top: 15px;
  height: 50px;
  border-radius: 10px;
  padding: 0 10px 0 10px;
  font-size: var(--medium-font-size-mobile);
  color: var(--subfont-color);
  outline: none;
  @media screen and (max-width: 768px) {
    font-size: var(--small-font-size);
  }
`;

export const LongBarButton = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 25px;
  border-radius: 10px;
  background-color: var(--todays-main-color);
  border: none;
  font-size: var(--small-font-size);
`;
