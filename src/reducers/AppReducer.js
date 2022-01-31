export const LOGIN = 'LOGIN';
export const LOAD_CATS = 'LOAD_CATS';
export const TOKEN = 'TOKEN';
export const LOGOUT = 'LOGOUT';

const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : "";

export const INITIAL_STATE = {
	login_data: loginData !== "" ? loginData : null,
	logged: loginData !== "" ? true : false,
	token: loginData !== "" ? loginData.token : "",
	loading: false
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
		default:
			return state;
	}
}