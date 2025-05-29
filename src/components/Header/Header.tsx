"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<HeaderWrapper>
			<StyledImage src="/thermometer.svg" alt="logo" width={60} height={60}></StyledImage>
			<BurgerButton aria-label="Toggle menu" onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? "✖" : "☰"}
			</BurgerButton>
			<Menu>
				<MenuLink href="/">Главная</MenuLink>
			</Menu>
		</HeaderWrapper>
	);
}

const HeaderWrapper = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1rem;
	height: 60px;
	position: relative;
	border-bottom: 1px solid gray;
`;

const StyledImage = styled(Image)`
	margin-bottom: 5px;
`;

const BurgerButton = styled.button`
	font-size: 1.5rem;
	background: none;
	border: none;
	cursor: pointer;

	@media (max-width: 360px) {
		font-size: 1.8rem;
	}
`;

const Menu = styled.nav`
	position: absolute;
	top: 60px;
	right: 0;
	background-color: #fff;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	padding: 1rem;
	display: flex;
	flex-direction: column;
	min-width: 150px;

	@media (min-width: 361px) {
		display: none;
	}
`;

const MenuLink = styled(Link)`
	margin-bottom: 0.5rem;
	text-decoration: none;
	color: #333;

	&:last-child {
		margin-bottom: 0;
	}
`;
