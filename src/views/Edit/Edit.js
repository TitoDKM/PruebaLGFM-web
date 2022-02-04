import { Dropzone, FileItem } from "@dropzone-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { appContext } from "../..";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { LOGOUT, SET_CATEGORY } from "../../reducers/AppReducer";
import { createPost } from "../../services/formsService";
import { getPost } from "../../services/postsService";

const Edit = () => {
	const { state, dispatch } = useContext(appContext);
	const params = useParams();
	const [error, setError] = useState('');
	const [files, setFiles] = useState([]);
	const [post, setPost] = useState({});
	const [category, setCategory] = useState(-1);
	const [comments, setComments] = useState(0);
	const title = useRef();
	const editorRef = useRef(null);
	let navigate = useNavigate();

	useEffect(() => {
		getPost(params.id)
		.then(response => {
			if(response.data.author !== state.id)
				navigate("/", {replace: true});
			dispatch({type: SET_CATEGORY, category: response.data.category_id});
			setPost(response.data);
			setCategory(response.data.category_id);
			setComments(response.data.comments_type);
		})
		.catch(error => console.log(error));
	}, []);

	const updateFiles = (incomingFiles) => {
		setFiles(incomingFiles);
		console.log(incomingFiles);
	}

	const onDelete = (id) => {
		setFiles(files.filter(x => x.id !== id));
	}

	const trySendPost = (e) => {
		e.preventDefault();
		setError('');

		createPost(state.email, state.token, params.id, title.current.value, category, comments, files[0] ? files[0].uploadMessage : "", editorRef.current.getContent())
		.then(response => navigate("/post/" + response.data.id, {replace: true}))
		.catch(error => {
			if(error.response && error.response.status === 400) setError(error.response.data.message);
			else dispatch({type: LOGOUT});
		});
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
								<h3>Editar mi entrada</h3>
							</div>
							<div className="form-content">
								<Form>
									<Form.Group className="mt-3">
										<Form.Label>Título del post</Form.Label>
										<Form.Control type="text" required placeholder="Título" defaultValue={post.title} ref={title} />
									</Form.Group>
									<Form.Group className="mt-3">
										<Form.Label>Categoría</Form.Label>
										<Form.Select onChange={(e) => setCategory(e.target.value)} defaultValue={post.category_id}>
											<option value="-1">Sin categoría</option>
											{state.cats.map(cat => <option key={cat.id} selected={cat.id === post.category_id} value={cat.id}>{cat.title}</option>)}
										</Form.Select>
									</Form.Group>
									<Form.Group className="mt-3">
										<Form.Label>Permitir comentarios</Form.Label>
										<Form.Select onChange={(e) => setComments(e.target.value)} defaultValue={post.comments_type}>
											<option value="0" selected={0 === post.comments_type}>No</option>
											<option value="1" selected={1 === post.comments_type}>Sólo registrados</option>
											<option value="2" selected={2 === post.comments_type}>Cualquier visitante</option>
										</Form.Select>
									</Form.Group>
									<Form.Group className="mt-3">
										<Form.Label>Imagen destacada</Form.Label><br />
										<Form.Text className="text-muted">
											<em>Se mantendrá la actual si no subes ninguna</em>
										</Form.Text>
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
										initialValue={post.body}
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
								<Button variant="none" className="form-btn mt-3" type="submit" onClick={trySendPost} disabled={state.loading}>{state.loading ? 'Guardando cambios..' : 'Guardar cambios'}</Button>
							</div>
						</div>
					</Col>
				</Row>
			</div>
			<Footer />
		</div>
	)
}

export default Edit;