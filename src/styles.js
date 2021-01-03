import styled from "styled-components";

export const WrapperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > * {
    margin: 10% 0;
  }
  margin: 12% 0 0% 0;
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
    padding-right: 1em
  }
`;

export const CapitalsWrapper = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0;
  display: flex;

  > * {
    padding-right: 0.6em
  }
`
