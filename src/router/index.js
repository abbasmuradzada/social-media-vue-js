import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
const Login = () => import(/* webpackChunkName: "login" */ "../views/Login");
const Register = () =>
  import(/* webpackChunkName: "register" */ "../views/Register");
const ForgetPass = () =>
  import(/* webpackChunkName: "forget-password" */ "../views/ForgetPass");
const Main = () => import(/* webpackChunkName: "main" */ "../views/Main");
const Home = () => import(/* webpackChunkName: "home" */ "../views/Home");
const Update = () => import(/* webpackChunkName: "update" */ "../views/Update");
const MyProfile = () =>
  import(/* webpackChunkName: "my-profile" */ "../views/MyProfile");
const Profile = () =>
  import(/* webpackChunkName: "profile" */ "../views/Profile");
const MainLayout = () =>
  import(/* webpackChunkName: "main-layout" */ "../views/MainLayout");
const FollowList = () =>
  import(/* webpackChunkName: "main-layout" */ "../views/FollowList");
const FollowerList = () =>
  import(/* webpackChunkName: "main-layout" */ "../views/FollowerList");
// const AccountSettings = () =>
//   import(/* webpackChunkName: "main-layout" */ "../views/AccountSettings");

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
      isOnlyPublic: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAuth: false,
      isOnlyPublic: true,
    },
  },
  {
    path: "/forgetPass",
    name: "ForgetPassword",
    component: ForgetPass,
    meta: {
      requiresAuth: false,
      isOnlyPublic: true,
    },
  },
  {
    path: "/",
    name: "Main",
    component: Main,
    meta: {
      requiresAuth: true,
      isOnlyPublic: false,
    },
    children: [
      {
        path: "/",
        name: "example",
        component: MainLayout,
        meta: {
          requiresAuth: true,
          isOnlyPublic: false,
        },
        children: [
          {
            path: "/",
            redirect: "/home",
          },
          {
            path: "/home",
            name: "Home",
            component: Home,
            meta: {
              requiresAuth: true,
              isOnlyPublic: false,
            },
          },
          {
            path: "/update/:id",
            name: "Update",
            component: Update,
            meta: {
              requiresAuth: true,
              isOnlyPublic: false,
            },
          },
        ],
      },
      {
        path: "/myprofile/:userName",
        name: "MyProfile",
        component: MyProfile,
        meta: {
          isOnlyPublic: false,
          requiresAuth: true,
        },
      },
      {
        path: "/profile/:userName",
        name: "Profile",
        component: Profile,
        meta: {
          isOnlyPublic: false,
          requiresAuth: true,
        },
      },
      {
        path: "/followlist",
        name: "FollowList",
        component: FollowList,
        meta: {
          isOnlyPublic: false,
          requiresAuth: true,
        },
      },
      {
        path: "/followerlist",
        name: "FollowerList",
        component: FollowerList,
        meta: {
          isOnlyPublic: false,
          requiresAuth: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.isOnlyPublic);
  const isRequireAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = store.getters.isAuthenticated;

  if (!isPublic && !isAuthenticated) {
    return next({
      path: "/login",
      query: {
        redirect: to.path,
      }, // Store the full path to redirect the user to after login
    });
  }

  if (isPublic && !isAuthenticated) {
    // show notification
    // please log out to see page
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (isAuthenticated && !isRequireAuth) {
    return next("/");
  }

  next();
});

export default router;
