export const LOGIN = 'LOGIN';
export const LOAD_CATS = 'LOAD_CATS';
export const TOKEN = 'TOKEN';
export const LOGOUT = 'LOGOUT';
export const SET_CATEGORY = 'SET_CATEGORY';

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
				...state,
				loading: true
			}
		case TOKEN:
			return {
				...state,
				token: action.token
			}
		case LOGOUT:
			return {
				...state,
				logged: false,
				token: ''
			}
		case SET_CATEGORY:
			return {
				...state,
				current_category: action.category
			}
		default:
			return state;
	}
}