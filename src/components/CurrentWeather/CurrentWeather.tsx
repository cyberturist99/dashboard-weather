"use client";
import Weather24 from "@/components/Weather24/Weather24";
import UpcomingWeather from "@/components/UpcomingWeather/UpcomingWeather";
import WeatherAdditional from "@/components/WeatherAdditional/WeatherAdditional";
import styled from "styled-components";
export default function CurrentWeather() {
	return (
		<WrapperMain>
			<WeatherInfo>
				<Text>Москва</Text>
				<br></br>
				<Text>7°</Text>
				<br></br>
				по ощущениям как 3° Макс.: 9°, мин.: 3°
			</WeatherInfo>
			<Weather24 />
			<UpcomingWeather />
			<WeatherAdditional />
		</WrapperMain>
	);
}
const WrapperMain = styled.main`
	min-height: calc(100vh - 60px);
	font-size: 1.35rem;
	line-height: 1.7;
	text-align: center;
	color: black;
	background: white;
`;
const WeatherInfo = styled.div`
	margin-bottom: 10px;
`;

const Text = styled.span`
	font-size: 2rem;
`;
