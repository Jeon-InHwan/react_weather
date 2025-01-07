import { useState } from "react";
import styled from "styled-components";
import Seoul from "./Seoul";
import Tokyo from "./Tokyo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";

// 켈빈 = (섭씨 + 273.15)

const TitleWrapper = styled.div`
  padding-top: 6%;
  width: 580px;
  margin: 0 auto;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

const Title = styled.h1`
  display: inline-block;
  margin-top: 50px;
  font-weight: 700;
  font-size: 36px;
`;

const ButtonWrapper = styled.div`
  padding-top: 70px;
  width: 580px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
`;

const AreaBtn = styled.button`
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardBgColor}
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
  font-size: 1.2em;
  &:hover {
    cursor: pointer;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const Toggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 35px 0px;
  button {
    margin: 0 auto;
    border: 1px solid ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.textColor};
    border-radius: 15px;
    background-color: transparent;
    min-height: 30px;
    min-width: 140px;
    &:hover {
      background-color: #dee2fc;
    }
  }
`;

function Header() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleDarkAtom = () => {
    setDarkAtom((prev) => !prev);
  };

  const [showSeoul, setShowSeoul] = useState(true);

  const toggleForArea = () => {
    setShowSeoul((prev) => !prev);
  };

  return (
    <>
      <TitleWrapper>
        <FontAwesomeIcon
          icon={faCloudSun}
          size="3x"
          style={{ color: "orange" }}
        />
        <Title>Seoul & Tokyo Weather</Title>
      </TitleWrapper>
      <Toggle>
        <button onClick={toggleDarkAtom}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </Toggle>
      <ButtonWrapper>
        {showSeoul ? (
          <>
            <AreaBtn
              style={{
                backgroundColor: "#33adff",
                border: isDark ? "3px solid white" : "3px solid black",
              }}
              onClick={toggleForArea}
            >
              Seoul
            </AreaBtn>
            <AreaBtn
              style={{ backgroundColor: "#BEDDF1" }}
              onClick={toggleForArea}
            >
              Tokyo
            </AreaBtn>
          </>
        ) : (
          <>
            <AreaBtn
              style={{ backgroundColor: "#BEDDF1" }}
              onClick={toggleForArea}
            >
              Seoul
            </AreaBtn>
            <AreaBtn
              style={{
                backgroundColor: "#33adff",
                border: isDark ? "3px solid white" : "3px solid black",
              }}
              onClick={toggleForArea}
            >
              Tokyo
            </AreaBtn>
          </>
        )}
      </ButtonWrapper>
      {showSeoul ? <Seoul /> : <Tokyo />}
    </>
  );
}

export default Header;
