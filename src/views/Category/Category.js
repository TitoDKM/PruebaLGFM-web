import { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { getCat } from "../../services/catsService";
import { getPosts } from "../../services/postsService";
import { appContext } from "../../";
import { SET_CATEGORY } from "../../reducers/AppReducer";

const Category = () => {
	const { state, dispatch }  = useContext(appContext);
	const [posts, setPosts] = useState([]);
	const [categoryData, setCategoryData] = useState({});
	const params = useParams();
	let navigate = useNavigate();

	useEffect(() => {
		getPosts(0, 25, params.id)
		.then(response => setPosts(response.data.posts))
		.catch(error => console.log(error));

		getCat(params.id)
		.then(response => setCategoryData(response.data))
		.catch(error => console.log(error));

		dispatch({type: SET_CATEGORY, category: params.id});
	}, [params.id]);

	const parseDate = (date) => {
		return date.split('T')[0].replaceAll("-", "/");
	}

	const minifiedBody = (body) => {
		return body.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 200);
	}

	return (
		<div className="web-container">
			<Header />
			<div className="post-list-container">
				<h4>{categoryData.title}</h4>
				<div className="post-list-content">
					<Row xs={2} md={4} lg={5}>
						{posts.length === 0 
						? <h1>No hay publicaciones disponibles</h1>
						: posts.map(post => (
							<Col key={post.id}>
								<Card style={{ width: '15rem', height: '385px', marginTop: '20px'}} className="cursor-pointer" onClick={() => navigate("/post/" + post.id)}>
									<Card.Img variant="top" src={post.image} />
									<Card.Body className="blue">
										<Card.Title>
											<div className="card-title-main d-flex">{post.title}</div>
											<div className="card-title-sub">{parseDate(post.date)}</div>
										</Card.Title>
										<Card.Text>
											{minifiedBody(post.body)}...
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Category;