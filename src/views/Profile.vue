<template>
	<div class="row">
		<div class="col-lg-12">
			<div class="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
				<div class="card-body h250 p-0 rounded-xxl overflow-hidden m-3">
					<img :src="myUser.backgroundPicture" alt="image" />
				</div>
				<div class="card-body p-0 position-relative">
					<figure
						class="avatar position-absolute w100 z-index-1"
						style="top: -40px; left: 30px"
					>
						<img
							:src="myUser.profilePicture"
							alt="image"
							class="float-right p-1 bg-white rounded-circle w-100"
						/>
					</figure>
					<h4 class="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
						{{ myUser.userName }}
						<span class="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
							{{ myUser.email }}
						</span>
					</h4>
					<div
						class="
              d-flex
              align-items-center
              justify-content-center
              position-absolute-md
              right-15
              top-0
              me-2
            "
					>
						<a
							@click="sendOrRemoveSubscribe(myUser._id)"
							v-if="userId !== this.$route.params.id"
							class="
                d-none
                cursor-pointer
                d-lg-block
                bg-success
                p-3
                z-index-1
                rounded-3
                text-white
                font-xsssss
                text-uppercase
                fw-700
                ls-3
              "
							>{{ followStatus }}</a
						>
						<div
							class="
                dropdown-menu dropdown-menu-end
                p-4
                rounded-xxl
                border-0
                shadow-lg
              "
							aria-labelledby="dropdownMenu4"
						>
							<div class="card-body p-0 d-flex">
								<i class="feather-bookmark text-grey-500 me-3 font-lg"></i>
								<h4 class="fw-600 text-grey-900 font-xssss mt-0 me-0">
									Save Link
									<span
										class="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500"
										>Add this to your saved items</span
									>
								</h4>
							</div>
							<div class="card-body p-0 d-flex mt-2">
								<i class="feather-alert-circle text-grey-500 me-3 font-lg"></i>
								<h4 class="fw-600 text-grey-900 font-xssss mt-0 me-0">
									Hide Post
									<span
										class="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500"
										>Save to your saved items</span
									>
								</h4>
							</div>
							<div class="card-body p-0 d-flex mt-2">
								<i class="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
								<h4 class="fw-600 text-grey-900 font-xssss mt-0 me-0">
									Hide all from Group
									<span
										class="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500"
										>Save to your saved items</span
									>
								</h4>
							</div>
							<div class="card-body p-0 d-flex mt-2">
								<i class="feather-lock text-grey-500 me-3 font-lg"></i>
								<h4 class="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-0">
									Unfollow Group
									<span
										class="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500"
										>Save to your saved items</span
									>
								</h4>
							</div>
						</div>
					</div>
				</div>

				<div class="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
					<ul
						class="
              nav nav-tabs
              h55
              d-flex
              product-info-tab
              border-bottom-0
              ps-4
            "
						id="pills-tab"
						role="tablist"
					>
						<li class="active list-inline-item me-5">
							<a
								class="
                  fw-700
                  font-xssss
                  text-grey-500
                  pt-3
                  pb-3
                  ls-1
                  d-inline-block
                  active
                "
								href="#navtabs1"
								data-toggle="tab"
								>About</a
							>
						</li>
						<li class="list-inline-item me-5">
							<a
								class="
                  fw-700
                  font-xssss
                  text-grey-500
                  pt-3
                  pb-3
                  ls-1
                  d-inline-block
                "
								href="#navtabs4"
								data-toggle="tab"
								>Video</a
							>
						</li>
						<li class="list-inline-item me-5">
							<a
								class="
                  fw-700
                  me-sm-5
                  font-xssss
                  text-grey-500
                  pt-3
                  pb-3
                  ls-1
                  d-inline-block
                "
								href="#navtabs7"
								data-toggle="tab"
								>Media</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="col-xl-4 col-xxl-3 col-lg-4 pe-0">
			<router-link :to="{ name: 'FollowerList' }">
				<div
					class="
            cursor-pointer
            card
            w-100
            shadow-xss
            rounded-xxl
            border-0
            mb-3
            mt-3
          "
				>
					<div class="card-body border-0">
						<div class="row">
							<h4
								class="profile-statictic-text font-xsss d-flex align-items-sm-center ml-3 fw-700"
							>
								<a class="text-center menu-icon chat-active-btn"
									><i
										class="profile-statictic-icon feather-users font-md text-black"
									></i
								></a>
								<span class="mb-1">{{ myUser.followersCount }} Follower</span>
							</h4>
						</div>
					</div>
				</div>
			</router-link>

			<router-link :to="{ name: 'FollowList' }">
				<div
					class="
            cursor-pointer
            card
            w-100
            shadow-xss
            rounded-xxl
            border-0
            mb-3
            mt-3
          "
				>
					<div class="card-body border-0">
						<div class="row">
							<h4
								class="profile-statictic-text font-xsss d-flex align-items-sm-center ml-3 fw-700"
							>
								<a class="text-center menu-icon chat-active-btn"
									><i
										class="profile-statictic-icon feather-user-check font-md text-black"
									></i
								></a>
								<span class="mb-1">{{ myUser.followsCount }} Follow</span>
							</h4>
						</div>
					</div>
				</div>
			</router-link>
			<div
				class="
          cursor-pointer
          card
          w-100
          shadow-xss
          rounded-xxl
          border-0
          mb-3
          mt-3
        "
			>
				<div class="card-body border-0">
					<div class="row">
						<h4
							class=" profile-statictic-text font-xsss d-flex align-items-sm-center ml-3 fw-700"
						>
							<a class="text-center menu-icon chat-active-btn"
								><i
									class="profile-statictic-icon feather-list font-md text-black"
								></i
							></a>
							<span class="mb-1">{{ myUser.postsCount }} Post</span>
						</h4>
					</div>
				</div>
			</div>
			<div class="card w-100 shadow-xss rounded-xxl border-0 mb-3">
				<div class="card-body d-block p-4">
					<h4 class="fw-700 mb-3 font-xsss text-grey-900">About</h4>
					<p class="fw-500 text-grey-500 lh-24 font-xssss mb-0">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla
						dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus
						mollis pharetra. Proin blandit ac massa sed rhoncus
					</p>
				</div>
				<div class="card-body border-top-xs d-flex">
					<i class="feather-lock text-grey-500 me-3 font-lg"></i>
					<h4 class="fw-700 text-grey-900 font-xssss mt-0">
						Private
						<span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"
							>What's up, how are you?</span
						>
					</h4>
				</div>

				<div class="card-body d-flex pt-0">
					<i class="feather-eye text-grey-500 me-3 font-lg"></i>
					<h4 class="fw-700 text-grey-900 font-xssss mt-0">
						Visble
						<span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"
							>Anyone can find you</span
						>
					</h4>
				</div>
				<div class="card-body d-flex pt-0">
					<i class="feather-map-pin text-grey-500 me-3 font-lg"></i>
					<h4 class="fw-700 text-grey-900 font-xssss mt-1">Flodia, Austia</h4>
				</div>
				<div class="card-body d-flex pt-0">
					<i class="feather-users text-grey-500 me-3 font-lg"></i>
					<h4 class="fw-700 text-grey-900 font-xssss mt-1">Genarel Group</h4>
				</div>
			</div>
			<div class="card w-100 shadow-xss rounded-xxl border-0 mb-3">
				<div class="card-body d-flex align-items-center p-4">
					<h4 class="fw-700 mb-0 font-xssss text-grey-900">Photos</h4>
					<a href="#" class="fw-600 ms-auto font-xssss text-primary">See all</a>
				</div>
				<div class="card-body d-block pt-0 pb-2">
					<div class="row">
						<div class="col-6 mb-2 pe-1">
							<a href="../assets/images/e-2.jpg" data-lightbox="roadtrip"
								><img
									src="../assets/images/e-2.jpg"
									alt="image"
									class="img-fluid rounded-3 w-100"
							/></a>
						</div>
						<div class="col-6 mb-2 ps-1">
							<a href="../assets/images/e-3.jpg" data-lightbox="roadtrip"
								><img
									src="../assets/images/e-3.jpg"
									alt="image"
									class="img-fluid rounded-3 w-100"
							/></a>
						</div>
						<div class="col-6 mb-2 pe-1">
							<a href="../assets/images/e-4.jpg" data-lightbox="roadtrip"
								><img
									src="../assets/images/e-4.jpg"
									alt="image"
									class="img-fluid rounded-3 w-100"
							/></a>
						</div>
						<div class="col-6 mb-2 ps-1">
							<a href="../assets/images/e-5.jpg" data-lightbox="roadtrip"
								><img
									src="../assets/images/e-5.jpg"
									alt="image"
									class="img-fluid rounded-3 w-100"
							/></a>
						</div>
						<div class="col-6 mb-2 pe-1">
							<a href="../assets/images/e-2.jpg" data-lightbox="roadtrip"
								><img
									src="../assets/images/e-2.jpg"
									alt="image"
									class="img-fluid rounded-3 w-100"
							/></a>
						</div>
						<div class="col-6 mb-2 ps-1">
							<a href="../assets/images/e-1.jpg" data-lightbox="roadtrip"
								><img
									src="../assets/images/e-1.jpg"
									alt="image"
									class="img-fluid rounded-3 w-100"
							/></a>
						</div>
					</div>
				</div>
				<div class="card-body d-block w-100 pt-0">
					<a
						href="#"
						class="
              p-2
              lh-28
              w-100
              d-block
              bg-grey
              text-grey-800 text-center
              font-xssss
              fw-700
              rounded-xl
            "
						><i class="feather-external-link font-xss me-2"></i> More</a
					>
				</div>
			</div>
		</div>
		<div class="col-xl-8 col-xxl-9 col-lg-8 mt-3">
			<div
				v-for="post in posts"
				:key="post"
				class="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
			>
				<div class="card-body p-0 d-flex">
					<figure class="avatar me-3">
						<img
							:src="myUser.profilePicture"
							alt="image"
							class="shadow-sm rounded-circle w45"
						/>
					</figure>
					<h4 class="fw-700 text-grey-900 font-xssss mt-1">
						{{ myUser.userName }}
						<span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{{
							post.createdAt | moment("from", "now")
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
							<img
								:src="post.postContent"
								class="rounded-3 w-100"
								alt="image"
							/>
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

				<div class="card-body d-flex p-0">
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
						<i
							class="
                feather-thumbs-up
                text-white
                bg-primary-gradiant
                me-1
                btn-round-xs
                font-xss
              "
						></i>
						<!-- <i class="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i> -->

						<v-btn @click="likeOrUnlike(post._id)" mr-2 color="red">{{
							(post.likesFrom.indexOf(userId) != -1 ? "unlike " : "like ") +
								post.likesFrom.length
						}}</v-btn>
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
						<span class="d-none-xss">{{ post.commentCount }} Comment</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import globalservice from "../services/globalservice";
import { mapGetters } from "vuex";
// import vuePlayer from "@algoz098/vue-player";

export default {
	data: () => ({
		posts: [],
		myUser: null,
		followStatus: "",
		data: {
			content: "",
			type: "text",
			uploadObject: null,
		},
	}),
	components: {
		// vuePlayer,
	},
	computed: {
		...mapGetters(["userId"]),
	},
	methods: {
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
		sendOrRemoveSubscribe(id) {
			console.log(id);
			globalservice
				.sendOrRemoveSubscribtionRequest(id)
				.then((res) => {
					if (res.data.follow === "following") {
						this.followStatus = "UNFOLLOW";
						this.myUser.followersCount++;
					}
					if (res.data.follow === "false") {
						this.followStatus = "FOLLOW";
						this.myUser.followersCount--;
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
	created() {
		globalservice
			.getUserIdByUsername(this.$route.params.userName)
			.then((idRes) => {
				globalservice
					.getSingleUser(idRes.data.id)
					.then((res) => {
						this.posts = res.data.posts.reverse();
						this.myUser = res.data.user;
						this.followStatus = res.data.isSubscribe ? "FOLLOW" : "UNFOLLOW";
					})
					.catch(() => {});
			})
			.catch(() => {});
	},
};
</script>

<style lang="scss" scoped>
.profile-statictic {
	&-icon {
		margin-right: 8px;
	}
	&-text {
		margin-bottom: 0 !important;
	}
}
</style>
