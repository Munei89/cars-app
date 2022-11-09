import * as React from 'react';
import styled from 'styled-components/macro';
import { P } from './P';
import { Helmet } from 'react-helmet-async';
import StyledButton from '../StyledButton';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper>
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </Title>
        <P>Page not found.</P>
        <StyledButton onClick={() => navigate('/')}>
          Go to homepage
        </StyledButton>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: black;
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;
