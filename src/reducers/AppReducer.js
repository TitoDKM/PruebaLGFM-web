export const LOGIN = 'LOGIN';
export const LOAD_CATS = 'LOAD_CATS';
export const TOKEN = 'TOKEN';
export const LOGOUT = 'LOGOUT';
export const SET_CATEGORY = 'SET_CATEGORY';
export const ERROR = 'ERROR';
export const REGISTER = 'REGISTER';
export const SET_CATS = 'SET_CATS';

const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : "";

export const INITIAL_STATE = {
	login_data: loginData !== "" ? loginData : null,
	logged: loginData !== "" ? true : false,
	token: loginData !== "" ? loginData.token : "",
	email: loginData !== "" ? loginData.email : "",
	loading: false,
	current_category: 0,
	cats: []
}

export const AppReducer = (state, action) => {
	switch(action.type) {
		case LOGIN:
			return {
				...state,
				logged: false,
				loading: true
			}
		case LOAD_CATS:
			return {
				...state
			}
		case SET_CATS:
			return {
				...state,
				cats: action.cats
			}
		case TOKEN:
			return {
				...state,
				loading: false,
				logged: true,
				token: action.token,
				email: action.email
			}
		case LOGOUT:
			localStorage.removeItem("loginData");
			return {
				...state,
				logged: false,
				token: ''
			}
		case ERROR:
			return {
				...state,
				loading: false
			}
		case SET_CATEGORY:
			return {
				...state,
				current_category: action.category
			}
		case REGISTER:
			return {
				...state,
				loading: true
			}
		default:
			return state;
	}
}