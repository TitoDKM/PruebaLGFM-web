import { useContext, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { appContext } from "../..";
import { addAnonComment, addComment } from "../../services/formsService";
import { getComments } from "../../services/postsService";

import './comments.css';

const Comments = ({postData}) => {
	const { state, dispatch } = useContext(appContext);
	const [comments, setComments] = useState([]);
	const comment = useRef();

	useEffect(() => {
		getComments(postData.id)
		.then(response => setComments(response.data))
		.catch(error => console.log(error));
	}, []);

	useEffect(() => {
		console.log(comments);
	}, [comments]);

	const tryAddComment = (e) => {
		e.preventDefault();
		if((postData.comments_type === 1 && !state.logged) || postData.comments_type === 0)
			return;
		let commentResponse = state.logged ? addComment(state.email, postData.id, state.token, comment.current.value) : addAnonComment(postData.id, comment.current.value);
		commentResponse
		.then(response => window.location.reload())
		.catch(error => console.log(error));
	}

	return (
		<div className="comments-container">
			<div className="comments-header">
				<h3>Comentarios</h3>
			</div>
			<div className="comments-content">
				{(comments.length == 0 && postData.comments_type !== 0) && (<h5>Aún no hay comentarios</h5>)}
				{comments.map(comment => (
					<div key={comment.id} className="comments-comment d-flex mb-4">
						<div className="comment-photo">
							<img src={comment.author_photo} />
						</div>
						<div className="comment-content">
							<div className="comment-author">{comment.author_name}</div>
							<div className="comment-body">{comment.body}</div>
						</div>
					</div>
				))}
				{(postData.comments_type === 1 && !state.logged) && (<em>Necesitas iniciar sesión para enviar comentarios</em>)}
				{(postData.comments_type === 0) && (<em>Esta publicación no admite comentarios</em>)}
				{((postData.comments_type === 1 && state.logged) || (postData.comments_type === 2)) &&
					(<div className="comments-add mt-4">
						<h5>Añadir comentario</h5>
						<Form.Control as="textarea" ref={comment}></Form.Control>
						<Button variant="none" className="form-btn mt-3" type="submit" onClick={tryAddComment}>Enviar comentario</Button>
					</div>)
				}
			</div>
		</div>
	);
}

export default Comments;