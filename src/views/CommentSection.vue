<template>
	<div class="d-flex flex-column w-100">
		<div class="d-flex w-100">
			<a
				class="
          emoji-bttn
          d-flex
          align-items-center
          fw-600
          text-grey-900 text-dark
          lh-26
          font-xssss
          me-2
        "
			>
				<!-- <i class="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i> -->

				<a
					@click="likeOrUnlike(post._id)"
					class="cursor-pointer d-flex
          align-items-center"
				>
					<span class="mr-3 text-black font-xss">
						{{ post.likesFrom.length }}
					</span>

					<i
						v-if="post.likesFrom.indexOf(userId) != -1"
						class="
            feather-star
          text-ornage
          btn-round-sm
          font-lg
          "
					></i>
					<i
						v-else
						class="
            feather-star
          text-black
          btn-round-sm
          font-lg
          "
					></i>
				</a>
			</a>
			<a
				class="
          d-flex
          align-items-center
          fw-600
          text-grey-900 text-dark
          lh-26
          font-xssss
        "
			>
				<i
					class="
            feather-message-circle
            text-dark text-grey-900
            btn-round-sm
            font-lg
          "
        ></i>
        <span @click="showCommentSection" class="d-none-xss cursor-pointer"
          >{{ post.commentCount }} Comment</span
        >
      </a>
    </div>
    <div
      v-if="showSection"
      class="
        card
        w-100
        d-flex
        flex-column
        shadow-xss
        rounded-xxl
        border-0
        p-4
        mb-3
        mt-3
      "
    >
      <div v-for="commentContainer in comments" :key="commentContainer.id">
        <div class="flex-nowrap d-flex">
          <input
            v-model="commentInput"
            class="
              style2-input
              ps-5
              form-control
              text-grey-900
              font-xsss
              fw-600
            "
            placeholder="Enter Your Comment"
          />
          <button @click="sendComment" class="nav-menu me-0 ms-2">Send</button>
        </div>
        <div
          v-for="comment in commentContainer"
          :key="comment.id"
          class="mt-2 mb-2 card w-100 shadow-xss rounded-xxl border-10"
        >
          <Comment
            :comment="comment"
            :post="post"
            :likeCount="comment.likesFrom.length"
            :deleteComment="deleteComment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import globalservice from "../services/globalservice";
import { mapGetters } from "vuex";
import Comment from "./Comment.vue";

export default {
  data: () => ({
    showSection: false,
    comments: [],
    commentInput: "",
  }),
  props: ["post"],
  components: {
    Comment,
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  methods: {
    showCommentSection() {
      globalservice.getComments(this.post._id).then((res) => {
        this.comments = [];
        this.comments.push(res.data?.comments);
        console.log(this.comments);
      });
      this.showSection = !this.showSection;
    },
    likeOrUnlike(id) {
      globalservice
        .likeOrUnlike(id)
        .then(() => {
          if (this.post.likesFrom.indexOf(this.userId) === -1) {
            this.post.likesFrom.push(this.userId);
          } else {
            this.post.likesFrom = this.post.likesFrom.filter(
              (postedId) => postedId !== this.userId
            );
          }
        })
        .catch(() => {
          // this.snackbarText = "Bu mailde account movcud deyil"
          // this.snackbar = true
        });
    },
    sendComment() {
      globalservice
        .postComment(this.post._id, this.commentInput)
        .then(() => {
          this.commentInput = "";
          globalservice.getComments(this.post._id).then((res) => {
            this.comments = [];
            this.comments.push(res.data?.comments);
          });
        })
        .catch((err) => console.log(err));
    },
    deleteComment(commentId) {
      globalservice
        .deleteComment(this.post.postedUser[0], commentId)
        .then(() => {
          globalservice.getComments(this.post._id).then((res) => {
            this.comments = [];
            this.comments.push(res.data?.comments);
          });
        })
        .catch((err) => console.log(err));
    },
    editComment(commentContent) {
      this.editCommentBool = !this.editCommentBool;
      this.editCommentInput = commentContent;
    },
  },
};
</script>
