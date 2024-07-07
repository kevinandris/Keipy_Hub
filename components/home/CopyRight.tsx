"use client";
import styled from "styled-components";

const CopyRight = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <CopyRightStyle className="copyRight ">
      <p>© {year} Keipy Hub - All right reserved</p>
    </CopyRightStyle>
  );
};

const CopyRightStyle = styled.div`
  width: 100%;
  height: 10px;
  padding: 80px 40px 0 15px;
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    p {
      display: none;
    }
  }
`;

export default CopyRight;
