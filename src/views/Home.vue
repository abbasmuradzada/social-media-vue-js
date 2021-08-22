<template>
  <div>
    <div
      v-for="post in posts"
      :key="post._id"
      class="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
    >
      <div class="card-body p-0 d-flex">
        <router-link
          :to="{
            name: post.postedUser[0]._id == userId ? 'MyProfile' : 'Profile',
            params: { userName: post.postedUser[0].userName },
          }"
        >
          <figure class="avatar me-3">
            <img
              :src="post.postedUser[0].profilePicture"
              alt="image"
              class="shadow-sm rounded-circle w45"
            />
          </figure>
        </router-link>
        <h4 class="fw-700 text-grey-900 font-xssss mt-1">
          {{ post.postedUser[0].userName }}
          <span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{{
            formatDate(post.createdAt) | moment("from", "now")
          }}</span>
        </h4>
      </div>
      <div class="card-body p-0 me-lg-5">
        <p class="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
          {{ post.content }}
        </p>
      </div>
      <div v-if="post.type === 'photo'" class="card-body d-block p-0 mb-3">
        <div class="row ps-2 pe-2">
          <div class="col-sm-12 p-1">
            <img :src="post.postContent" class="rounded-3 w-100" alt="image" />
          </div>
        </div>
      </div>
      <div v-if="post.type === 'video'" class="card-body d-block p-0 mb-3">
        <div class="row ps-2 pe-2">
          <div class="col-sm-12 p-1">
            <vuePlayer :src="post.postContent"> </vuePlayer>
          </div>
        </div>
      </div>
      <div class="d-flex p-0 w-100">
        <CommentSection :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import globalservice from "../services/globalservice";
import { mapGetters } from "vuex";
import moment from "moment";
import vuePlayer from "@algoz098/vue-player";
import CommentSection from "./CommentSection.vue";

export default {
  data: () => ({
    posts: [],
    commentSectionCheck: {},
  }),
  components: {
    vuePlayer,
    CommentSection,
  },
  computed: {
    ...mapGetters(["userId"]),
    // test: function(){
    //     return this.likeCount
    // }
  },
  methods: {
    getPosts() {
      globalservice
        .getAllPosts(this.email)
        .then((res) => {
          this.posts = res.data.posts;
          this.posts.map((user) => user);
          console.log(this.posts);
        })
        .catch(() => {
          // console.log(err);
          // console.log("test");
        });
    },
    likeOrUnlike(id) {
      globalservice
        .likeOrUnlike(id)
        .then(() => {
          const index = this.posts.findIndex((post) => post._id === id);
          if (this.posts[index].likesFrom.indexOf(this.userId) === -1) {
            this.posts[index].likesFrom.push(this.userId);
          } else {
            console.log(this.posts[index].postedUser[0]._id);
            this.posts[index].likesFrom = this.posts[index].likesFrom.filter(
              (postedId) => postedId !== this.userId
            );
          }
        })
        .catch(() => {
          // this.snackbarText = "Bu mailde account movcud deyil"
          // this.snackbar = true
        });
    },
    // likeMeter(liked, count){
    //     this.likeCount = count
    //     return liked ? 'unlike ' : 'like '
    // }
    formatDate(postDate) {
      const hours = moment().diff(postDate, "hours");
      if (hours > 24) return moment(postDate).locale("az").format("LL");
      return postDate;
    },

    openCommentSection(postId) {
      this.commentSectionCheck[`${postId}`] =
        !this.commentSectionCheck[`${postId}`];

      console.log(this.commentSectionCheck[`${postId}`]);
    },
  },
  created() {
    this.getPosts();
  },
};
</script>
