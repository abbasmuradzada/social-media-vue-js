import axios from "axios";
// import store from '../store/index';

axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.request.use((config) => {
	if (typeof window === "undefined") {
		return config;
	}
	const token = window.localStorage.getItem("userToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

const globalService = {
	login(credentials) {
		return new Promise((resolve, reject) => {
			axios
				.post("/auth/login", {
					email: credentials.email,
					password: credentials.password,
				})
				.then((res) => {
					if (res.data.user.token) {
						resolve(res.data.user);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	register(credentials) {
		console.log(credentials);
		return new Promise((resolve, reject) => {
			axios
				.post("/auth/register", {
					userName: credentials.username,
					email: credentials.email,
					password: credentials.password,
				})
				.then((res) => {
					console.log("registered");
					if (res.data.user.token) {
						resolve(res.data.user);
					}
				})
				.catch((err) => {
					console.log("register failed");
					reject(err);
				});
		});
	},
	logout() {
		return new Promise((resolve, reject) => {
			axios
				.get("/auth/logout")
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	forgetPass(email) {
		return new Promise((resolve, reject) => {
			axios
				.post("/auth/forgetPassword", {
					email,
				})
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	getAllPosts() {
		return new Promise((resolve, reject) => {
			axios
				.get("/post")
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	deleteRequest(id) {
		return new Promise((resolve, reject) => {
			axios
				.delete(`/post/${id}`)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	getOwnPosts() {
		return new Promise((resolve, reject) => {
			axios
				.get("/post/myProfile")
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	createPost(credentials) {
		return new Promise((resolve, reject) => {
			axios
				.post("/post", credentials)
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
};

export default globalService;
