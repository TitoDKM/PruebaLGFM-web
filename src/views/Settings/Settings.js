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
import { getUserData, saveUserData } from "../../services/usersService";

const Settings = () => {
	const { state, dispatch } = useContext(appContext);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [myData, setMyData] = useState({});
	const firstname = useRef();
	const lastname = useRef();
	const location = useRef();
	const phone = useRef();
	const biography = useRef();

	useEffect(() => {
		setMyData({});
		setSuccess('');
		setError('');
		getUserData(state.email, state.token)
		.then(response => {
			setMyData(response.data.user);
		})
		.catch(error => {
			if(error.response && error.response.status === 400) setError(error.response.data);
			if(error.response && error.response.status === 403) dispatch({type: LOGOUT});
		})
	}, []);

	const saveData = (e) => {
		e.preventDefault();
		setSuccess('');
		setError('');

		saveUserData(state.email, state.token, firstname.current.value, lastname.current.value, phone.current.value, location.current.value, biography.current.value)
		.then(response => setSuccess('Cambios guardados correctamente'))
		.catch(error => {
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
						{success && (<Alert className="mt-3" variant="success">{success}</Alert>)}
						<div className="form-container">
							<div className="form-header">
								<h3 className="selected">Mi perfil</h3>
							</div>
							<div className="form-content">
								<Form>
									{myData ? (<>
										<Row>
											<Col>
												<Form.Group className="mt-3">
													<Form.Label>Nombre</Form.Label>
													<Form.Control type="text" required placeholder="Nombre" defaultValue={myData.firstname} ref={firstname} />
												</Form.Group>
												<Form.Group className="mt-3">
													<Form.Label>Número de teléfono</Form.Label>
													<Form.Control type="number" placeholder="Número de teléfono" defaultValue={myData.phone} ref={phone} />
													<Form.Text className="text-muted">
														<em>Opcional</em>
													</Form.Text>
												</Form.Group>
												<Form.Group className="mt-3">
													<Form.Label>Ubicación</Form.Label>
													<Form.Control type="text" placeholder="Ubicación actual" defaultValue={myData.location} ref={location} />
													<Form.Text className="text-muted">
														<em>Opcional. Precisión según privacidad personal</em>
													</Form.Text>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group className="mt-3">
													<Form.Label>Apellido</Form.Label>
													<Form.Control type="text" required placeholder="Apellido" defaultValue={myData.lastname} ref={lastname} />
												</Form.Group>
												<Form.Group className="mt-3">
													<Form.Label>Correo electrónico</Form.Label>
													<Form.Control type="email" disabled placeholder="Correo electrónico" defaultValue={myData.email} />
												</Form.Group>
													<Form.Text className="text-muted">
														<em>Establecido en el registro</em>
													</Form.Text>
												<Form.Group className="mt-3">
													<Form.Label>Biografía</Form.Label>
													<Form.Control as="textarea" placeholder="Pequeña carta de presentación" defaultValue={myData.biography} ref={biography} />
													<Form.Text className="text-muted">
														<em>Opcional</em>
													</Form.Text>
												</Form.Group>
											</Col>
										</Row>
										<Button variant="none" className="form-btn mt-3" disabled={state.loading} onClick={saveData} type="submit">{state.loading ? 'Guardando cambios...' : 'Guardar cambios'}</Button>
									</>) : (<h1>Cargando tus datos..</h1>)}
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

export default Settings;