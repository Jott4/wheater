import styled from "styled-components";

export const WrapperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin: 5vw 5vw 0vw 5vw;

  > * {
    margin: 2%;
  }
`;
export const Hr = styled.hr`
  background-color: #fff;
  height: 1px;
  border: none;
`;

export const MinMaxWrapper = styled.div`
  display: flex;
  padding-bottom: 15px;
  > * {
    padding-right: 1em;
  }
`;

export const CapitalsWrapper = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0;
  display: flex;
  color: rgba(0, 0, 0, 0.7);

  > * {
    padding-right: 0.6em;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 10px 5px;
`;
