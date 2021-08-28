<template>
  <div>
    <div class="m-2 d-flex align-items-center">
      <figure class="avatar me-3">
        <img
          :src="comment.commentWriter.profilePicture"
          alt="image"
          class="shadow-sm rounded-circle w45"
        />
      </figure>
      <div>{{ comment.commentWriter.userName }}</div>
    </div>
    <div class="m-3">
      <div v-if="!editCommentBool">{{ comment.content }}</div>
      <div class="flex-nowrap d-flex" v-if="editCommentBool">
        <input
          v-model="editCommentInput"
          class="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
          placeholder="Enter Your Comment"
        />
        <button
          @click="sendEditCommentData(comment._id, comment)"
          class="nav-menu me-0 ms-2"
        >
          Send
        </button>
      </div>
    </div>
    <div
      class="w-100 d-flex mb-2"
      :class="{
        'justify-content-evenly w-80':
          userId === post.postedUser._id ||
          userId === comment.commentWriter._id,
        'px-3':
          userId !== post.postedUser._id &&
          userId !== comment.commentWriter._id,
      }"
    >
      <v-btn
        class="
          d-flex
          w-30
          align-items-center
          justify-content-center
          badge-primary
          text-white
        "
        @click="likeOrUnlike(comment)"
        :class="{
          'w-100':
            userId !== post.postedUser._id &&
            userId !== comment.commentWriter._id,
        }"
      >
        {{ likeCount }}
        {{ !comment.likesFrom.includes(userId) || liked ? "Like" : "Unlike" }}
      </v-btn>
      <v-btn
        v-if="userId === comment.commentWriter._id"
        @click="editComment(comment.content)"
        class="
          d-flex
          w-30
          mr-2
          align-items-center
          justify-content-center
          badge-warning
          text-white
        "
      >
        <v-icon left> mdi-pencil </v-icon>
        <div>Edit</div>
      </v-btn>
      <v-btn
        v-if="
          userId === post.postedUser._id || userId === comment.commentWriter._id
        "
        class="
          d-flex
          w-30
          mr-2
          align-items-center
          justify-content-center
          badge-danger
          text-white
        "
        @click="deleteComment(comment._id)"
      >
        <v-icon left> mdi-delete </v-icon> Delete
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import globalservice from "../services/globalservice";

export default {
  data: () => ({
    editCommentBool: false,
    editCommentInput: "",
    liked: false,
    componentKey: 0,
  }),
  props: ["comment", "post", "likeCount", "deleteComment"],
  computed: {
    ...mapGetters(["userId"]),
  },
  methods: {
    editComment(commentContent) {
      this.editCommentBool = !this.editCommentBool;
      this.editCommentInput = commentContent;
    },
    sendEditCommentData(commentId, comment) {
      globalservice
        .editComment(commentId, this.editCommentInput)
        .then((res) => {
          this.editCommentBool = !this.editCommentBool;
          this.editCommentInput = res.data.content;
          comment.content = res.data.content;
        })
        .catch((err) => console.log(err));
    },
    likeOrUnlike(comment) {
      globalservice
        .likeOrUnlikeComment(comment._id)
        .then((res) => {
          this.likeCount = res?.data.comment?.likesFrom.length ?? 0;
          this.liked = !this.liked;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
