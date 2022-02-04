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

export const createPost = (email, token, id, title, category, comments, image, body) => {
	return axios.post('http://localhost:8080/api/posts/create', {
		email,
		id,
		title,
		category,
		comments,
		image,
		body
	},
	{
		headers: {
			'Authorization': 'Bearer ' + token
		}
	});
}

export const addComment = (email, postId, token, body) => {
	return axios.post('http://localhost:8080/api/comments/create', {
		email,
		postId,
		body
	}, {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	});
}

export const addAnonComment = (postId, body) => {
	return axios.post('http://localhost:8080/api/comments/anon', {
		postId,
		body
	});
}