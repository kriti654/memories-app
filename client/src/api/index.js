import axios from "axios";
import CircuitBreaker from "../lib/circuitbreaker";

const url = 'http://localhost:5000/posts/';
const circuitBreaker = new CircuitBreaker();

export const fetchPosts = () => circuitBreaker.callService({ method: 'get', url: `${url}` })
export const createPost = (newPost) => circuitBreaker.callService({method: 'post', url: `${url}`, data: newPost})
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);