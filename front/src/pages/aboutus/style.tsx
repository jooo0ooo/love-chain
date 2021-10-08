import styled from '@emotion/styled';

export const Container = styled.div`
  height: 200%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  font-family: "Aron Grotesque Light", Verdana, Arial, sans-serif;
`;

export const FirContentBody = styled.div`
  //height: 100%;  
  //background-color: #02FFD5;
  padding-top: 5%;
  width:70%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
`;

export const SecContentBody = styled.div`
  background-color: #282f3b;
  width:100%;
  height: 40%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
`;

export const ThrContentBody = styled.div`
  background-color: rgba(230,232,234,0.7);
  width:100%;
  height: 60%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
`;

export const ContactUs = styled.div`
  background-color: white;
  width:70%;
  height: 60%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  padding-top: 10vh;
  & > div {
    //background-color: #3d943d;
    font-family: "Aron Grotesque Light", Verdana, Arial, sans-serif;
    font-weight: 400;
    font-size: 45px;
    line-height: 1.2;
    letter-spacing: 4px;
    text-align: center;
    width: 100%;
    height: 10%;
  }
`;

export const ContentOfContactUs = styled.p`
  font-size: 20px;
  line-height: 32px;
  font-family: AppleGothic;
`;

export const TableOfContactUs = styled.table`
  padding-top: 7%;
  //border: 1px solid #444444;
  width: 100%;
  border-spacing: 1vw;
  & > th, td {
    //border: 1px solid #444444;
      & > input {
        background-color: gainsboro;
        color:white;
        width: 99%;
        height: 60px;
        font-size: 15px;
        font-weight: 700;
        border: 0;
        outline: 0;
      }
    & > textarea {
      background-color: gainsboro;
      color:white;
      width: 99%;
      height: 200px;
      font-size: 15px;
      font-weight: 700;
      border: 0;
      outline: 0;
    }
    input::placeholder { font-size: 180%;  color: #aaaaaa }
    textarea::placeholder { font-size: 210%;  color: #aaaaaa }
  }
`;

export const FourthContentBody = styled.div`
  background-color: #282f3b;
  width:100%;
  height: 16%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
`;

export const FifthContentBody = styled.div`  // 명언
  background-color: #bf9786;
  width:100%;
  height: 17%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  & > div {
    text-align: center;
    padding-top: 8.5%;
  }
`;

export const SixthContentBody = styled.div`
  background-color: #282f3b;
  width:100%;
  height: 20%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
`;


export const FirstContent = styled.div`
  margin: 0;
  padding: 0% 35% 0;
  font-size: 35px;
  line-height: 95%;
  width: 30%;
  font-weight: 500;
  background-color: transparent;
  text-align: center;
`;

export const ImageFir = styled.div`
  height: 300px;
  width: 100%;
  background-repeat:no-repeat;
  background-position:center top;
`;