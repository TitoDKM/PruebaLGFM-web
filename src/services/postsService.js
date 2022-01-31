import axios from "axios"

export const getPost = (postId) => {
	return axios.get('http://localhost:8080/api/posts/single/' + postId);
}

export const getPosts = (page, size, category) => {
	return axios.get('http://localhost:8080/api/posts/latests?page=' + page + '&size=' + size + '&category=' + category);
}