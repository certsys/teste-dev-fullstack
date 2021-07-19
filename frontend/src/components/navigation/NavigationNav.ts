import styled from 'styled-components';

export const NavigationNav = styled.nav`
  width: 100%;
  height: 30px;
  padding: 0 5%;
  ul {
    display: flex;
    align-items: center;
    list-style: none;
    li {
      margin: 0 10px;
      a {
        font-size: 1.1rem;
        font-weight: 500;
        color: #fff;
        text-decoration: none;
      }
    }
  }
`;
