export const LOGIN = 'LOGIN';
export const LOAD_CATS = 'LOAD_CATS';
export const TOKEN = 'TOKEN';
export const LOGOUT = 'LOGOUT';
export const SET_CATEGORY = 'SET_CATEGORY';
export const ERROR = 'ERROR';
export const REGISTER = 'REGISTER';

const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : "";

export const INITIAL_STATE = {
	login_data: loginData !== "" ? loginData : null,
	logged: loginData !== "" ? true : false,
	token: loginData !== "" ? loginData.token : "",
	loading: false,
	current_category: 0
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
		case TOKEN:
			return {
				...state,
				loading: false,
				logged: true,
				token: action.token
			}
		case LOGOUT:
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