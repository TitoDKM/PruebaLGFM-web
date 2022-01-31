import { useEffect, useState } from "react";
import { Folder } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Share from "../../components/Share/Share";
import { getPost } from "../../services/postsService";

import './post.css';

const Post = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	let navigate = useNavigate();

	useEffect(() => {
		getPost(params.id)
		.then(response => setPost(response.data))
		.catch(error => console.log(error));
	}, []);
	
	return (
		<div className="web-container">
			<Header />
			<div className="post-container">

				<div className="post-header">
					<h1>{post.title}</h1>
					<div className="post-category cursor-pointer" onClick={() => navigate("/category/" + post.category_id)}><Folder />&nbsp;&nbsp;{post.category}</div>
					<div className="post-image"><img src={post.image} align="center" /></div>
				</div>
				<div className="post-content" dangerouslySetInnerHTML={{ __html: post.body }}></div>
				<hr />
				<Share />
			</div>
			<Footer />
		</div>
	)
}

export default Post;