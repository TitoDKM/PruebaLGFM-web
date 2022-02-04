import axios from 'axios';

export const getUserData = (email, token) => {
	return axios.get('http://localhost:8080/api/users/info?email=' + email, {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	});
}

export const saveUserData = (email, token, firstname, lastname, phone, location, biography, photo) => {
	return axios.post('http://localhost:8080/api/users/save', {
		email,
		firstname,
		lastname,
		phone,
		location,
		biography,
		photo
	}, {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	})
}