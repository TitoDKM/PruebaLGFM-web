import axios from "axios"

export const getPost = (postId) => {
	return axios.get('http://localhost:8080/api/posts/single/' + postId);
}

export const getPosts = (page, size, category) => {
	return axios.get('http://localhost:8080/api/posts/latests?page=' + page + '&size=' + size + '&category=' + category);
}

export const getComments = (postId) => {
	return axios.get('http://localhost:8080/api/comments?postId=' + postId);
}

export const searchPosts = (page, size, search) => {
	return axios.get('http://localhost:8080/api/posts/search?page=' + page + '&size=' + size + '&search=' + search);
}