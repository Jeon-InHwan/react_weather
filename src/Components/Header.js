import styled from "styled-components";

// 켈빈 = (섭씨 + 273.15)

const TitleWrapper = styled.div`
  width: 580px;
  margin: 0 auto;
  display: flex;
  text-align: center;
`;

const Title = styled.h1`
  display: inline-block;
  margin-top: 50px;
  font-weight: 700;
  font-size: 48px;
`;

const ButtonWrapper = styled.div`
  padding-top: 50px;
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
  background-color: #0984e3;
`;

function Header() {
  return (
    <>
      <TitleWrapper>
        <Title>Weather Information with React</Title>
      </TitleWrapper>
      <ButtonWrapper>
        <AreaBtn>1234</AreaBtn>
        <AreaBtn>5678</AreaBtn>
      </ButtonWrapper>
    </>
  );
}

export default Header;
