import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import QRCode from 'react-qr-code';
export default function App() {
	const [pagina1, setPagina1] = useState(true);
	const [pagina2, setPagina2] = useState(false);
	const [pagina3, setPagina3] = useState(false);
	const [pagina4, setPagina4] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const [nome, setNome] = useState('');
	const [telefone, setTelefone] = useState('');
	const [convidados, setConvidados] = useState([]);
	const [convidado, setConvidado] = useState();

	function handleChange() {
		setPagina2(true);
		setPagina1(false);
	}
	function handleChange2() {
		setPagina4(true);
		setPagina3(false);
	}
	function handleChange3() {
		for (let i in convidados) {
			if (
				convidados[i].nome.toLowerCase() == nome.toLowerCase() &&
				convidados[i].telefone == telefone
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
	}

	useEffect(() => {
		async function getData() {
			await axios
				.get('http://localhost:8000/getConvidados')
				.then((response) => {
					setConvidados(response.data);
					console.log(response.data);
				});
		}
		getData();
	}, []);

	return (
		<div className="App">
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
						<img src={Fundo} width="60%" />
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
				<ReactScrollWheelHandler
					downHandler={() => {
						handleChange3();
					}}
					customStyle={{
						width: '150%',
						height: '100vh',
					}}
				>
					<Slide direction="up" in={pagina2} mountOnEnter unmountOnExit>
						<div id="pagina2">
							<img src={Logo} width="40%" />
							<div id="form">
								<p>Digite seu nome completo:</p>
								<TextField
									id="standard-basic"
									variant="standard"
									// value={nome}
									onChange={(e) => setNome(e.target.value)}
								/>

								<p>Digite seu telefone:</p>
								<TextField
									placeholder="(11) 99999-9999"
									id="standard-basic"
									variant="standard"
									// value={telefone}
									onChange={(e) => setTelefone(e.target.value)}
								/>
								{notFound ? (
									<p
										style={{
											position: 'absolute',
											color: 'red',
											bottom: '30vh',
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
									<img className="seta-animation" src={Seta} height="30%" />
								</div>
							)}
						</div>
					</Slide>
				</ReactScrollWheelHandler>
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
						<QRCode value={`${convidado._id}`} />
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
