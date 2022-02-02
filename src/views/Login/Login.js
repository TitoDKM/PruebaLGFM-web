import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { appContext } from "../..";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ERROR, LOGIN, LOGOUT, SET_CATEGORY, TOKEN } from "../../reducers/AppReducer";
import { login } from "../../services/formsService";
import { getPosts } from "../../services/postsService";

import './login.css';

const Login = () => {
	const { state, dispatch } = useContext(appContext);
	let email = useRef();
	let password = useRef();
	const [error, setError] = useState('');
	let navigate = useNavigate();

	const tryLogin = (e) => {
		e.preventDefault();

		dispatch({type: LOGIN});
		login(email.current.value, password.current.value)
		.then(response => {
			localStorage.setItem("loginData", JSON.stringify({token: response.data.token, email: email.current.value}));
			dispatch({type: TOKEN, token: response.data.token, email: email.current.value});
			navigate("/", {replace: true});
		})
		.catch(error => {
			dispatch({type: ERROR});
			if(error.response && error.response.status === 400) setError(error.response.data.message);
			if(error.response && error.response.status === 403) dispatch({type: LOGOUT});
		});
	}

	return (
		<div className="web-container">
			<Header />
			<div className="container">
				<Row>
					<Col className="align-self-center">
						{error && (<Alert className="mt-3" variant="danger">{error}</Alert>)}
						<div className="form-container">
							<div className="form-header">
								<h3>Inicio de sesión</h3>
							</div>
							<div className="form-content">
								<Form>
									<Form.Group className="mt-3">
										<Form.Label>Correo electrónico</Form.Label>
										<Form.Control type="email" ref={email} placeholder="Introduce tu correo electrónico" />
									</Form.Group>
									<Form.Group className="mt-3">
										<Form.Label>Contraseña</Form.Label>
										<Form.Control type="password" ref={password} placeholder="Introduce tu contraseña" />
									</Form.Group>
									<Button variant="none" className="form-btn mt-3" disabled={state.loading} type="submit" onClick={(e) => tryLogin(e)}>{state.loading ? 'Iniciando sesión...' : 'Iniciar sesión'}</Button>
								</Form>
							</div>
						</div>
					</Col>
				</Row>
			</div>
			<Footer />
		</div>
	);
}

export default Login;