import axios from "axios"

export const getCats = () => {
	return axios.get('http://localhost:8080/api/categories');
}

export const getCat = (catId) => {
	return axios.get('http://localhost:8080/api/categories/' + catId);
}