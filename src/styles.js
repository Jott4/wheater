import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 3.5rem;
  margin: 15% 5% 5% 5%;
`;

export const SecondTitle = styled.h2`
  color: #fff;
  font-size: 2.5rem;
  width: 600px;
  margin: 0;
  text-align: left;
  align-self: left;
`;

export const Divider = styled.div`
  margin: 10% 0 15px 0;
  background: #fff;
  width: 100%;
  height: 1px;
`;

export const ListCapitals = styled.div`
  color: rgba(0,0,0,0.8);
  font-weight: bold;
  display: flex;
  margin: 15px;
  span {
    font-weight:100;
    margin-right: 10px;
  }
`;
