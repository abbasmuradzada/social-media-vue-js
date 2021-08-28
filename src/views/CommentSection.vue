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
				<span @click="showCommentSection" class="d-none-xss"
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
				<div v-for="comment in commentContainer" :key="comment.id">
					{{ comment.content }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import globalservice from "../services/globalservice";
import { mapGetters } from "vuex";

export default {
	data: () => ({
		showSection: false,
		comments: [],
	}),
	props: ["post"],
	computed: {
		...mapGetters(["userId"]),
		// test: function(){
		//     return this.likeCount
		// }
	},
	methods: {
		showCommentSection() {
			globalservice.getComments(this.post._id).then((res) => {
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
	},
};
</script>
