import React, { useEffect, useState } from 'react';
import './App.css';
import Fundo from './principal.png';
import Logo from './logo2.png';
import qr from './qr.png';
import Individual from './individuall.png';
import Seta from './seta.png';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import axios from 'axios';
import QRCode from 'react-qr-code';

import {
	CircularProgressbar,
	CircularProgressbarWithChildren,
	buildStyles,
} from 'react-circular-progressbar';
import ChangingProgressProvider from './ChangingProgressProvider';
import InputMask from 'react-input-mask';

import 'react-circular-progressbar/dist/styles.css';

export default function App() {
	const [pagina1, setPagina1] = useState(true);
	const [pagina2, setPagina2] = useState(false);
	const [pagina3, setPagina3] = useState(false);
	const [pagina4, setPagina4] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState(0);
	const [nome, setNome] = useState('');
	const [telefone, setTelefone] = useState('');
	const [convidados, setConvidados] = useState([]);
	const [convidado, setConvidado] = useState();
	const [i, setI] = useState(0);

	function handleChange() {
		setPagina2(true);
		setPagina1(false);
	}
	function handleChange2() {
		setPagina4(true);
		setPagina3(false);
	}
	function handleChange3() {
		setLoading(true);

		let tel = telefone.replace(/ /g, '').replace('-', '');
		for (let i in convidados) {
			if (
				convidados[i].nome.toLowerCase() == nome.toLowerCase() &&
				convidados[i].telefone == tel
			) {
				setConvidado(convidados[i]);
				setPagina3(true);
				setPagina2(false);
			} else {
				setNotFound(true);
				setTimeout(() => {
					setNotFound(false);
				}, 3000);
			}
		}
		setLoading(false);
	}

	useEffect(() => {
		async function getData() {
			await axios
				.get('https://ivie21-server.herokuapp.com/getConvidados')
				.then((response) => {
					setConvidados(response.data);
				});
		}
		getData();
	}, [pagina2]);

	return (
		<div className="App">
			{loading ? (
				<div id="loading">
					<div style={{ width: 50, height: 50 }}>
						<ChangingProgressProvider values={[100, 0]}>
							{(percentage) => (
								<CircularProgressbar
									styles={buildStyles({
										rotation: (1 - percentage / 100) / 2,
									})}
									value={percentage}
								/>
							)}
						</ChangingProgressProvider>
					</div>
				</div>
			) : (
				''
			)}
			{/* {convidados.length == 0 ? <p>oi</p> : <p>ooi</p>} */}
			{pagina1 ? (
				<ReactScrollWheelHandler
					downHandler={() => {
						handleChange();
					}}
					customStyle={{
						width: '150%',
						height: '100vh',
					}}
				>
					<div className="logo">
						<img src={Fundo} width="65%" />
					</div>
					{pagina2 ? (
						''
					) : (
						<div className="seta" onClick={handleChange}>
							<img className="seta-animation" src={Seta} height="30%" />
						</div>
					)}
				</ReactScrollWheelHandler>
			) : (
				''
			)}
			{pagina2 ? (
				<Slide direction="up" in={pagina2} mountOnEnter unmountOnExit>
					<div id="pagina2">
						<img src={Logo} width="50%" />
						<div id="form">
							<p>Digite seu nome completo:</p>
							<TextField
								id="standard-basic"
								variant="standard"
								// value={nome}
								onChange={(e) => setNome(e.target.value)}
							/>

							<p>Digite seu telefone:</p>
							<div id="tel">
								<InputMask
									mask=" 99 99999-9999"
									placeholder="99 99999-9999"
									onChange={(e) => setTelefone(e.target.value)}
								/>
							</div>

							{/* <TextField
								placeholder="(11) 99999-9999"
								id="standard-basic"
								variant="standard"
								// value={telefone}
								onChange={(e) => setTelefone(e.target.value)}
							/> */}
							{notFound ? (
								<p
									style={{
										position: 'absolute',
										color: 'red',
										bottom: '10vh',
										textAlign: 'center',
									}}
								>
									Convidado não encontrado. Tente novamente!
								</p>
							) : (
								''
							)}
						</div>
						{pagina4 ? (
							''
						) : (
							<div className="seta" onClick={handleChange3}>
								<img className="seta-noanimation" src={Seta} height="30%" />
							</div>
						)}
					</div>
				</Slide>
			) : (
				''
			)}
			{pagina3 ? (
				<Slide direction="up" in={pagina3} mountOnEnter unmountOnExit>
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
			) : (
				''
			)}

			{pagina4 ? (
				<Slide direction="up" in={pagina4} mountOnEnter unmountOnExit>
					<div id="pagina3">
						{/* <img src={Logo} width="60%" />
					<img src={qr} width="60%" /> */}
						<img src={Individual} width="60%" />
						<br />
						<QRCode size={200} value={`${convidado._id}`} />
						<br />
						<p>
							Este é seu convite! <br />
							Obrigatório apresentar documento com foto.
						</p>
					</div>
				</Slide>
			) : (
				''
			)}
		</div>
	);
}
