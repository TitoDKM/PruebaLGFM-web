import axios from "axios";

export const login = (email, password) => {
	return axios.post('http://localhost:8080/api/users/login', {
		email,
		password
	});
}

export const register = (email, password, password2, name, surname, location) => {
	return axios.post('http://localhost:8080/api/users/register', {
		email,
		password,
		password2,
		name,
		surname,
		location
	});
}