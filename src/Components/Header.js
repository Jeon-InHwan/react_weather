import { useState } from "react";
import styled from "styled-components";
import Seoul from "./Seoul";
import Tokyo from "./Tokyo";

// 켈빈 = (섭씨 + 273.15)

const TitleWrapper = styled.div`
  width: 580px;
  margin: 0 auto;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
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
  border-radius: 20px;
  background-color: #74b9ff;
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
  font-size: 1.2em;
  &:hover {
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

function Header() {
  const [showSeoul, setShowSeoul] = useState(true);

  const toggleForArea = () => {
    setShowSeoul((prev) => !prev);
  };

  return (
    <>
      <TitleWrapper>
        <Title>Weather Information</Title>
      </TitleWrapper>
      <ButtonWrapper>
        {showSeoul ? (
          <>
            <AreaBtn
              style={{ backgroundColor: "#0984e3", border: "2px solid white" }}
              onClick={toggleForArea}
            >
              Seoul
            </AreaBtn>
            <AreaBtn onClick={toggleForArea}>Tokyo</AreaBtn>
          </>
        ) : (
          <>
            <AreaBtn onClick={toggleForArea}>Seoul</AreaBtn>
            <AreaBtn
              style={{ backgroundColor: "#0984e3", border: "2px solid white" }}
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
