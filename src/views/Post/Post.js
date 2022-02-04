import { useContext, useEffect, useState } from "react";
import { Folder } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import { appContext } from "../..";
import Comments from "../../components/Comments/Comments";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Share from "../../components/Share/Share";
import { SET_CATEGORY } from "../../reducers/AppReducer";
import { getPost } from "../../services/postsService";

import './post.css';

const Post = () => {
	const { state, dispatch } = useContext(appContext);
	const params = useParams();
	const [post, setPost] = useState({});
	let navigate = useNavigate();

	useEffect(() => {
		getPost(params.id)
		.then(response => {
			setPost(response.data);
			dispatch({type: SET_CATEGORY, category: response.data.category_id});
		})
		.catch(error => console.log(error));
	}, []);
	
	return (
		<div className="web-container">
			<Header />
			<div className="post-container">

				<div className="post-header">
					<h1>{post.title}</h1>
					{(state.logged && post.author === state.id) && (<em><a href={'/edit/' + post.id}>Editar entrada</a></em>)}
					<div className="post-category cursor-pointer" onClick={() => navigate("/category/" + post.category_id)}><Folder />&nbsp;&nbsp;{post.category}</div>
					<div className="post-image"><img src={post.image} align="center" /></div>
				</div>
				<div className="post-content" dangerouslySetInnerHTML={{ __html: post.body }}></div>
				<Share />
				<hr />
				{post.id && (<Comments postData={post} />)}
			</div>
			<Footer />
		</div>
	)
}

export default Post;