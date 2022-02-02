import { Dropzone, FileItem } from "@dropzone-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { appContext } from "../..";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { LOGOUT } from "../../reducers/AppReducer";
import { createPost } from "../../services/formsService";

const Create = () => {
	const { state, dispatch } = useContext(appContext);
	const [error, setError] = useState('');
	const [files, setFiles] = useState([]);
	const [category, setCategory] = useState(-1);
	const [comments, setComments] = useState(0);
	const title = useRef();
	const editorRef = useRef(null);
	let navigate = useNavigate();

	const updateFiles = (incomingFiles) => {
		setFiles(incomingFiles);
	}

	const onDelete = (id) => {
		setFiles(files.filter(x => x.id !== id));
	}

	const trySendPost = (e) => {
		e.preventDefault();
		setError('');
		if(files.length === 0 || files[0].uploadStatus !== "success") setError('Debes subir una foto para publicar una entrada');
		else {
			createPost(state.email, state.token, title.current.value, category, comments, files[0].uploadMessage, editorRef.current.getContent())
			.then(response => navigate("/post/" + response.data.id, {replace: true}))
			.catch(error => {
				if(error.response && error.response.status === 400) setError(error.response.data.message);
				else dispatch({type: LOGOUT});
			})
		}
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
								<h3>Publicar nueva entrada</h3>
							</div>
							<div className="form-content">
								<Form>
									<Form.Group className="mt-3">
										<Form.Label>Título del post</Form.Label>
										<Form.Control type="text" required placeholder="Título" ref={title} />
									</Form.Group>
									<Form.Group className="mt-3">
										<Form.Label>Categoría</Form.Label>
										<Form.Select onChange={(e) => setCategory(e.target.value)}>
											<option value="-1">Sin categoría</option>
											{state.cats.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
										</Form.Select>
									</Form.Group>
									<Form.Group className="mt-3">
										<Form.Label>Permitir comentarios</Form.Label>
										<Form.Select onChange={(e) => setComments(e.target.value)}>
											<option value="0">No</option>
											<option value="1">Sólo registrados</option>
											<option value="2">Cualquier visitante</option>
										</Form.Select>
									</Form.Group>
									<Form.Group className="mt-3">
										<Form.Label>Imagen destacada</Form.Label>
										<Dropzone
											onChange={updateFiles}
											value={files}
											onClean
											maxFiles={1}
											accept={"image/*"}
											label={"Arrastra una imagen o haz click para seleccionarla"}
											minHeight={"100px"}
											maxHeight={"100px"}
											localization={"ES-es"}
											url={"http://localhost:8080/api/files/upload"}
											uploadOnDrop
											disableScroll
										>
											{files.map(file => (<FileItem {...file} id={file.id} onDelete={onDelete} alwaysActive localization={"ES-es"} preview info resultOnTooltip />))}
										</Dropzone>
									</Form.Group>
								</Form>
								<Form.Group className="mt-3">
									<Form.Label>Contenido de la entrada</Form.Label>
									<Editor apiKey="xd116zalk9rdgrhgu671k0xtpe7uavm4tapzerr3ddmz4m6w"
										onInit={(evt, editor) => editorRef.current = editor}
										placeholder="Contenido completo de la entrada"
										init={{
											height: 350,
											menubar: false,
											plugins: [
												'advlist autolink lists link image charmap print preview anchor',
												'searchreplace visualblocks code fullscreen image',
												'insertdatetime media table paste code help wordcount'
											],
											toolbar: 'undo redo | formatselect | ' +
											'bold italic backcolor | alignleft aligncenter ' +
											'alignright alignjustify | bullist numlist outdent indent | ' +
											'image | removeformat | help',
											language: 'es'
										}} />
								</Form.Group>
									<Button variant="none" className="form-btn mt-3" type="submit" onClick={trySendPost} disabled={state.loading}>{state.loading ? 'Publicando entrada..' : 'Publicar entrada'}</Button>
							</div>
						</div>
					</Col>
				</Row>
			</div>
			<Footer />
		</div>
	)
}

export default Create;