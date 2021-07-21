import styled from 'styled-components';

export const HomeSection = styled.section`
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap');
  .table-head,
  .table-body {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 0 15px;
    border-radius: 3px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  }

  .table-head {
    width: 100%;
    height: 40px;
    justify-content: space-between;

    @media only screen and (max-width: 600px) {
      display: grid;
      height: 80px;
      grid-template-columns: 50% 50%;
      grid-template-rows: 40px 40px;
    }

    .table-name {
      span {
        letter-spacing: 2px;
      }
    }
  }

  .table-body {
    flex-direction: column;
    margin-top: 2px;

    .table-add-row {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
    }
  }
`;
