import axios from "axios";

// Backend API configurations
const Api = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
    headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
    },
});


// Helper function to get config with authorization token
const getConfig = () => ({
    headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`,
    },
});

// Authentication APIs
export const registerUserApi = (data) => Api.post('/api/user/create', data);
export const loginUserApi = (data) => Api.post('/api/user/login', data);


export const createtask = (data) => Api.post('/api/task/create', data,);
export const getAllTask = () => Api.get('/api/task/get');
// export const getProductsByCategory = (categoryId) => axios.get(`/api/product/get_all_products?category=${categoryId}`);
// export const getSingleProduct = (id) => Api.get(`/api/product/get_single_product/${id}`, getConfig());
export const updateTaskStatus = (id, data) => Api.put(`/api/task/update/${id}`, data,);
export const deleteTask = (id) => Api.delete(`/api/task/${id}`);

// Cart APIs