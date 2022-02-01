import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { appContext } from "../..";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ERROR, LOGOUT, REGISTER, SET_CATEGORY, TOKEN } from "../../reducers/AppReducer";
import { register } from "../../services/formsService";
import { getPosts } from "../../services/postsService";

import './register.css';

const Register = () => {
	const { state, dispatch } = useContext(appContext);
	const [error, setError] = useState('');
	let navigate = useNavigate();
	let email = useRef();
	let password = useRef();
	let password2 = useRef();
	let name = useRef();
	let surname = useRef();
	let location = useRef();

	const tryRegister = (e) => {
		e.preventDefault();

		dispatch({type: REGISTER});

		register(email.current.value, password.current.value, password2.current.value, name.current.value, surname.current.value, location.current.value)
		.then(response => {
			localStorage.setItem("loginData", JSON.stringify({token: response.data.token, email: email.current.value}));
			dispatch({type: TOKEN, token: response.data.token, email: email.current.value});
			navigate("/", {replace: true});
		})
		.catch(error => {
			dispatch({type: ERROR});
			if(error.response && error.response.status === 400) setError(error.response.data.message);
			if(error.response && error.response.status === 403) dispatch({type: LOGOUT});
		})
	}

	return (
		<div className="web-container">
			<Header />
			<div className="container">
				<Row>
					<Col className="align-self-center">
						{error && (<Alert variant="danger" className="mt-3">{error}</Alert>)}
						<div className="form-container">
							<div className="form-header">
								<h3 className="selected">Crear nueva cuenta</h3>
							</div>
							<div className="form-content">
								<Form>
									<Form.Group className="mt-3">
										<Form.Label>Correo electrónico</Form.Label>
										<Form.Control type="email" required placeholder="Email (usado para iniciar sesión)" ref={email} />
									</Form.Group>
									<Form.Group className="mt-3">
										<Form.Label>Contraseña</Form.Label>
										<Form.Control type="password" required placeholder="Introduce tu contraseña" ref={password} />
									</Form.Group>
									<Form.Group className="mt-3">
										<Form.Label>Repite tu contraseña</Form.Label>
										<Form.Control type="password" required placeholder="Repite tu contraseña" ref={password2} />
									</Form.Group>
									<Form.Group className="mt-3">
										<Form.Label>Nombre</Form.Label>
										<Form.Control type="text" required placeholder="Nombre real" ref={name} />
									</Form.Group>
									<Form.Group className="mt-3">
										<Form.Label>Apellido</Form.Label>
										<Form.Control type="text" required placeholder="Primer apellido o ambos" ref={surname} />
									</Form.Group>
									<Form.Group className="mt-3">
										<Form.Label>Ubicación</Form.Label>
										<Form.Control type="text" required placeholder="País o ciudad, según tu privacidad" ref={location} />
										<Form.Text className="text-muted">
											<em>Opcional</em>
										</Form.Text>
									</Form.Group>
									<Button variant="none" className="form-btn mt-3" type="submit" onClick={(e) => tryRegister(e)} disabled={state.loading}>{state.loading ? 'Finalizando registro..' : 'Finalizar registro'}</Button>
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

export default Register;