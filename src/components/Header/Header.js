import { useContext, useEffect, useRef, useState } from "react";
import { Container, NavDropdown, Dropdown, InputGroup, SplitButton, Button } from "react-bootstrap";
import { Plus, PlusLg, Search } from 'react-bootstrap-icons';
import { useNavigate, Navigate } from "react-router-dom";
import { appContext } from "../..";
import { LOAD_CATS, LOGOUT, SET_CATS } from "../../reducers/AppReducer";
import { getCats } from "../../services/catsService";

import './header.css';

const Header = () => {
	const {state, dispatch} = useContext(appContext);
	let navigate = useNavigate();
	const searchInput = useRef();

	useEffect(() => {
		dispatch({type: LOAD_CATS});

		getCats()
		.then(response => {
			dispatch({type: SET_CATS, cats: response.data});
		})
		.catch(error => console.log(error));
	}, []);

	const logout = () => {
		localStorage.removeItem("loginData");
		dispatch({type: LOGOUT});
		navigate("/", {replace: true});
	}

	const trySearch = (e) => {
		if(e.charCode === 13) {
			window.location.href = "/search?search=" + searchInput.current.value;
		}
	}

	return (
		<>
			<Container className="header-navbar" fluid>
				<nav className="navbar header">
					<a className="navbar-brand mr-auto" href="/"><img src="/logo_dblog.png" alt="dBlog" /></a>
					<div className="header-search">
						<input className="search-input" type="text" placeholder="Busca lo que necesitas" onKeyPress={trySearch} ref={searchInput} />
						<Search className="search-icon" />
					</div>
					<NavDropdown title={
						<div className="pull-left">
							<img src={state.logged ? state.photo : "default.jpeg"} alt="profilePhoto" className="user-photo" height={25} />
						</div>
					}>
						{state.logged ? (
							<>
								<Dropdown.Item href="/settings">Editar perfil</Dropdown.Item>
								<Dropdown.Item href="#" onClick={logout}>Cerrar sesión</Dropdown.Item>
							</>
						) : (
							<>
								<Dropdown.Item href="/login">Iniciar sesión</Dropdown.Item>
								<Dropdown.Item href="/register">Registro</Dropdown.Item>
							</>
						)}
					</NavDropdown>
				</nav>
			</Container>
			<Container className="header-menu" fluid>
				<nav className="navbar navbar-expand-lg header-menu-container">
					<InputGroup className="w-auto">
						<SplitButton variant="cats" title="Categorías" id="filter-button">
							{state.cats.length > 0 ? state.cats.map(cat => <Dropdown.Item key={cat.id} onClick={() => navigate("/category/" + cat.id)}>{cat.title}</Dropdown.Item>) : <Dropdown.Item>Aún no hay categorías</Dropdown.Item>}
						</SplitButton>
					</InputGroup>
					<ul className="navbar-nav header-navbar-items">
						{state.cats.length > 0 ? state.cats.filter(cat => cat.featured).map(cat => <li key={cat.id} className={"nav-item cursor-pointer" + (cat.id == state.current_category ? ' selected' : '')} onClick={() => navigate("/category/" + cat.id, {replace: true})}>{cat.title}</li>) : <li className="nav-item">Aún no hay categorías</li>}
					</ul>
					{state.logged && (<ul className="navbar-nav ms-auto">
						<Button variant="none" className="newpost-btn" onClick={() => navigate("/create")}><PlusLg /></Button>
					</ul>)}
				</nav>
			</Container>
		</>
	);
}

export default Header;