import styled from 'styled-components';

export const HeaderDiv = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  background: #333;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    min-height: 50px;

    @media only screen and (max-width: 600px) {
      flex-direction: column;
    }

    h1,
    .logo {
      margin: 10px 5px;
      @media only screen and (max-width: 600px) {
        margin: 5px 5px;
      }
    }
  }

  .logo {
    width: 20%;
    text-align: center;

    @media only screen and (max-width: 600px) {
      width: 76px;
    }
    img {
      height: 30px;
    }
  }

  h1 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
    color: #fff;
  }
`;
