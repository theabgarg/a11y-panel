import React from 'react';
import styled from 'styled-components';

export default function Header() {
  return (
    <Container>
      <h3>Accessibility Settings</h3>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.primary};
  h3 {
    color: ${({ theme }) => theme.text};
    padding: 20px 30px;
    margin: 0rem;
    text-align: center;
  }
`;
