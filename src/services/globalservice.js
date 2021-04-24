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
            axios.post("/auth/signIn", {
                email: credentials.email,
                password: credentials.password
            })
              .then((res) => {
                if (res.data.user.token) {
                  resolve(res.data.user);
                }
              })
              .catch((err) => {
                reject(err);
              }
          );
        });
    },
    register(credentials) {
        return new Promise((resolve, reject) => {
            axios.post("/auth/signup", {
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                email: credentials.email,
                password: credentials.password
            })
              .then((res) => {
                console.log('registered');
                if (res.data.user.token) {
                  resolve(res.data.user);
                }
              })
              .catch((err) => {
                  console.log('register failed');
                reject(err);
              }
          );
        });
    },
}

export default globalService;