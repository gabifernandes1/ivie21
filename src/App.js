import React, { useState } from 'react';
import './App.css';
import Fundo from './inicio.png';
import Logo from './logo2.png';
import qr from './qr.png';
import Individual from './individuall.png';
import Seta from './seta.png';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';

export default function App() {
	const [pagina, setPagina] = useState(false);
	function pagina2() {
		// setPagina(true);
	}
	const [checked, setChecked] = React.useState(false);
	const [checked2, setChecked2] = React.useState(false);
	const [checked3, setChecked3] = React.useState(false);
	const [checked4, setChecked4] = React.useState(false);
	const [user, setUser] = React.useState({});

	function handleChange() {
		setChecked(true);
	}
	function handleChange2() {
		setChecked2(true);
	}
	function handleChange3() {
		setChecked3(true);
	}
	function handleChange4() {
		setChecked4(true);
	}

	return (
		<div className="App">
			<ReactScrollWheelHandler
				downHandler={() => {
					setChecked(true);
				}}
				customStyle={{
					width: '150%',
					height: '100vh',
				}}
			>
				<div className="logo">
					<img src={Fundo} width="60%" />
				</div>
				{checked ? (
					''
				) : (
					<div className="seta" onClick={handleChange}>
						<img className="seta-animation" src={Seta} height="30%" />
					</div>
				)}
			</ReactScrollWheelHandler>
			<Slide direction="up" in={checked} mountOnEnter unmountOnExit>
				<div id="pagina2">
					<img src={Logo} width="40%" />
					<div id="form">
						<p>Digite seu nome completo:</p>
						<TextField id="standard-basic" variant="standard" />

						<p>Digite seu telefone:</p>
						<TextField
							placeholder="(11) 99999-9999"
							id="standard-basic"
							variant="standard"
						/>
					</div>
					{checked2 ? (
						''
					) : (
						<div className="seta" onClick={handleChange3}>
							<img className="seta-animation" src={Seta} height="30%" />
						</div>
					)}
				</div>
			</Slide>
			<Slide direction="up" in={checked3} mountOnEnter unmountOnExit>
				<div id="pagina4">
					<div id="left">
						<IconButton aria-label="fingerprint" color="success" disabled>
							<div id="option">
								<Fingerprint />
								<p>NÃO VOU</p>
							</div>
						</IconButton>
					</div>
					<div id="right" onClick={handleChange2}>
						<IconButton aria-label="fingerprint" disabled>
							<div id="option">
								<Fingerprint />
								<p>VOU</p>
							</div>
						</IconButton>
					</div>
				</div>
			</Slide>
			<Slide direction="up" in={checked2} mountOnEnter unmountOnExit>
				<div id="pagina3">
					{/* <img src={Logo} width="60%" />
					<img src={qr} width="60%" /> */}
					<img src={Individual} width="60%" />
					<p>
						Este é seu convite! <br />
						Obrigatório apresentar documento com foto.
					</p>
				</div>
			</Slide>
		</div>
	);
}
