import styled from "styled-components";

export default function WeatherAdditional() {
	return (
		<WrapperSec>
			<Item className="item1">
				Ощущается как
				<br /> 9°
			</Item>
			<Item className="item2">
				УФ-Индекс
				<br />1
				<br />
				низкий
			</Item>
			<Item className="item3">
				Ветер 2 м/с <br />
				Порывы ветра 5 м/с <br />
				Направление 306 С3
			</Item>
			<Item className="item4">Видимость 24 км идеальная</Item>
			<Item className="item5">
				Влажность
				<br /> 45%
			</Item>
			<Item className="item6">
				Давление
				<br /> 760 мм. рт. ст.
			</Item>
			<Item className="item7">
				Осадки
				<br /> 0 мм пт:
				<br /> Ожидается 10 мм осадков
			</Item>
		</WrapperSec>
	);
}

const WrapperSec = styled.section`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
	margin-left: 15px;
	margin-right: 15px;
`;

const Item = styled.div`
	background: #cce4ff;
	padding: 15px;
	text-align: center;
	font-weight: bold;
	border-radius: 6px;
	color: white;

	&.item1 {
		grid-column: 1 / 2;
		grid-row: 1;
		background: linear-gradient(to right, #d946ef, #06b6d4);
	}

	&.item2 {
		grid-column: 2 / 3;
		grid-row: 1;
		background: linear-gradient(to right, #ef4444, #f97316);
	}
	&.item3 {
		grid-column: 1 / 3; /* занимает обе колонки */
		grid-row: 2;
		background: linear-gradient(to right, #38b2ac, #fef08a);
		text-align: left;
	}

	&.item4 {
		grid-column: 1 / 2;
		grid-row: 3;
		background: linear-gradient(to right, #bfdbfe, #67e8f9);
	}

	&.item5 {
		grid-column: 2 / 3;
		grid-row: 3;
		background: linear-gradient(to right, #f59e0b, #ec4899);
	}

	&.item6 {
		grid-column: 1 / 2;
		grid-row: 4;
		background: linear-gradient(to right, #ec4899, #f43f5e);
	}

	&.item7 {
		grid-column: 2 / 3;
		grid-row: 4;
		background: linear-gradient(to right, #6366f1, #3b82f6);
	}
`;
