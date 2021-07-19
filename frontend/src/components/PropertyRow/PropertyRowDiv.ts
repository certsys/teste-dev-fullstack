import styled from 'styled-components';

export const PropertyRowDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 5px 0;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  color: #333;

  span,
  p {
    font-size: 15px;
  }

  .top {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;

    h3 {
      font-size: 20px;
    }

    h3,
    > div {
      margin: 5px 0;
    }
  }

  .property-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .property-check,
    .property-edit {
      margin-right: 20px;
    }

    button {
      border: none;
      background: none;
    }
  }

  .main-content {
    width: 100%;
    margin-botton: 10px;

    .location {
      margin: 5px 0;

      .address {
        span {
          display: block;
        }
      }

      .infos {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 250px;
        .price {
          margin: 8px 0;
          span {
            font-size: 18px;
            font-weight: bold;
          }
        }

        .area {
          display: flex;
          justify-content: flex-end;
          width: 80px;
        }
      }
    }

    .description {
      margin-top: 10px;
      margin-bottom: 16px;
      h4 {
        font-size: 18px;
        margin-bottom: 10px;
      }
    }
  }
`;
