import styled from 'styled-components';

export const AddPropertyButtonButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
  height: 30px;
  border: none;
  background: none;

  font-size: 12px;
  font-family: 'Work Sans', sans-serif;

  @media only screen and (max-width: 600px) {
    grid-column-start: 2;
    grid-row-start: 1;
    justify-self: center;
  }

  svg {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    overflow: initial;
  }
`;
