'use client'

import Link from 'next/link'
import styled, { keyframes } from 'styled-components'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Wrapper404>
      <BackgroundPattern />
      <Content>
        <Err404 $isMounted={isMounted}>404</Err404>
        <ErrText $isMounted={isMounted}>
          Упс! Такой страницы не существует
        </ErrText>
        <LinkMain href='/'>
          Вернуться на главную
          <HoverArrow aria-hidden='true'>→</HoverArrow>
        </LinkMain>
      </Content>
    </Wrapper404>
  )
}

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`

const Wrapper404 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f9f9f9 0%, #f0f0f0 100%);
`

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(
      circle at 25% 25%,
      rgba(255, 61, 0, 0.03) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(255, 61, 0, 0.03) 0%,
      transparent 50%
    );
  z-index: 0;
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
`

const Err404 = styled.h1<{ $isMounted: boolean }>`
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 900;
  margin: 0;
  color: #ff3d00;
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
  animation: ${({ $isMounted }) => ($isMounted ? float : 'none')} 3s ease-in-out
    infinite;
  line-height: 1;
  letter-spacing: -0.05em;
`

const ErrText = styled.p<{ $isMounted: boolean }>`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: #333;
  margin: 1.5rem 0 2.5rem;
  animation: ${({ $isMounted }) => ($isMounted ? pulse : 'none')} 2s ease-in-out
    infinite;
  font-weight: 500;
`

const HoverArrow = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
  transform: translateX(0);
  transition: transform 0.2s ease;
`

const LinkMain = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 2rem;
  background-color: #ff3d00;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 61, 0, 0.2);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: #e63600;
    transition: width 0.3s ease;
    z-index: -1;
  }

  &:hover {
    box-shadow: 0 6px 20px rgba(255, 61, 0, 0.3);

    &:before {
      width: 100%;
    }

    ${HoverArrow} {
      transform: translateX(4px);
    }
  }

  &:active {
    transform: scale(0.98);
  }
`
