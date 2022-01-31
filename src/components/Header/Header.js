import { useContext, useEffect, useState } from "react";
import { Container, NavDropdown, Dropdown, InputGroup, SplitButton, Button } from "react-bootstrap";
import { Plus, PlusLg, Search } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";
import { appContext } from "../..";
import { LOAD_CATS } from "../../reducers/AppReducer";
import { getCats } from "../../services/catsService";

import './header.css';

const Header = () => {
	const {state, dispatch} = useContext(appContext);
	const [cats, setCats] = useState([]);
	let navigate = useNavigate();

	useEffect(() => {
		dispatch({type: LOAD_CATS});

		getCats()
		.then(response => {
			setCats(response.data);
		})
		.catch(error => console.log(error));
	}, []);

	return (
		<>
			<Container className="header-navbar" fluid>
				<nav className="navbar header">
					<a className="navbar-brand mr-auto" href="/"><img src="/logo_dblog.png" alt="dBlog" /></a>
					<div className="header-search">
						<input className="search-input" type="text" placeholder="Busca lo que necesitas" />
						<Search className="search-icon" />
					</div>
					<NavDropdown title={
						<div className="pull-left">
							<img src="/default.jpeg" alt="profilePhoto" className="user-photo" height={25} />
						</div>
					}>
						<Dropdown.Item href="/profile">Perfil</Dropdown.Item>
						<Dropdown.Item href="/profile">Salir</Dropdown.Item>
					</NavDropdown>
				</nav>
			</Container>
			<Container className="header-menu" fluid>
				<nav className="navbar navbar-expand-lg header-menu-container">
					<InputGroup className="w-auto">
						<SplitButton variant="cats" title="Categorías" id="filter-button">
							{cats.length > 0 ? cats.map(cat => <Dropdown.Item key={cat.id} onClick={() => navigate("/category/" + cat.id)}>{cat.title}</Dropdown.Item>) : <Dropdown.Item>Aún no hay categorías</Dropdown.Item>}
						</SplitButton>
					</InputGroup>
					<ul className="navbar-nav header-navbar-items">
						{cats.length > 0 ? cats.filter(cat => cat.featured).map(cat => <li key={cat.id} className={"nav-item cursor-pointer" + (cat.id == state.current_category ? ' selected' : '')} onClick={() => navigate("/category/" + cat.id, {replace: true})}>{cat.title}</li>) : <li className="nav-item">Aún no hay categorías</li>}
					</ul>
					<ul className="navbar-nav ms-auto">
						<Button variant="none" className="newpost-btn"><PlusLg /></Button>
					</ul>
				</nav>
			</Container>
		</>
	);
}

export default Header;