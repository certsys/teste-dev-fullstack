import styled from 'styled-components';

export const NewPropertyDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 5px 0;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 5px 10px;

  color: #333;

  &.new-Property {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  span,
  p,
  label,
  input {
    font-size: 15px;
  }

  label {
    margin: 10px 15px 5px 0;
  }

  input {
    margin: 5px 0;
  }

  .top {
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 10px 0;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    .title {
      width: 85%;
      margin: 0;

      div {
        width: 100%;
      }
    }
  }

  .property-buttons {
    position: absolute;
    top: 0;
    right: 0;
    width: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      border: none;
      background: none;
    }
  }

  .main-content {
    width: 100%;

    .location {
      .address-all {
        display: flex;
        flex-wrap: wrap;
      }

      .property-input {
        width: auto;
        min-width: 190px;
        max-width: 200px;
      }

      .number,
      .state {
        .property-input {
          min-width: 90px;
          width: 90px;
        }
      }
    }

    .infos {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .area {
        display: grid;
        align-items: center;
        label {
          span {
            display: flex;
            align-items: center;
          }
        }
      }
    }

    .description {
      width: 100%;
      margin: 15px 0;

      h4 {
        margin-bottom: 10px;
      }
    }
  }
`;
