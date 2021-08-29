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
    if (credentials.email) {
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
    } else {
      return new Promise((resolve, reject) => {
        axios
          .post("/auth/login", {
            userName: credentials.userName,
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
    }
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
  deletePost(id) {
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
  likeOrUnlike(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/post/likeOrUnlike/${id}`)
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
  getOwnUser() {
    return new Promise((resolve, reject) => {
      axios
        .get("/user/ownProfile")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getSingleUser(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
      axios
        .get(`/user/${id}`)
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
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  createVideoPost(credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post("/post/video", credentials)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getSinglePost(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/post/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getPostOfUser() {
    return new Promise((resolve, reject) => {
      axios
        .get("/post/postsOfSubs")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updatePost(credentials) {
    return new Promise((resolve, reject) => {
      axios
        .put("/post/update", {
          _id: credentials.id,
          content: credentials.content,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  sendOrRemoveSubscribtionRequest(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/subscription/toUser/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getFollowers(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/subscription/followers/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getFollowing(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/subscription/following/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getUserIdByUsername(userName) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/user/getUserName`, {
          userName,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  changePassword(credentials) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/auth/changePassword`, {
          oldPassword: credentials.prevPassword,
          newPassword: credentials.newPassword,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getPostOfAnyUser(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/post/postsOfUser/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getComments(postId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/comment/${postId}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  postComment(postId, comment) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/comment/${postId}`, {
          content: comment,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteComment(user, commentId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/comment/own/${commentId}`, {
          user,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editComment(commentId, content) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/comment/update/${commentId}`, {
          content,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  likeOrUnlikeComment(commentId) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/comment/likeOrUnlike/${commentId}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default globalService;
