<template>
	<div class="middle-sidebar-bottom">
		<div class="middle-sidebar-left pe-0">
			<div class="row">
				<div class="col-xl-12">
					<div class="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
						<div class="card-body d-flex align-items-center p-0">
							<h2 class="fw-700 mb-0 mt-0 font-md text-grey-900">
								My Follow List
							</h2>
						</div>
					</div>

					<div class="row ps-2 pe-1">
						<div
							v-for="(follow, index) in followings"
							:key="follow._id"
							class="col-md-4 col-sm-6 pe-2 ps-2"
						>
							<div
								class="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3"
							>
								<div class="card-body d-block w-100 p-4 text-center">
									<router-link
										:to="{
											name: 'Profile',
											params: { userName: follow.userTo.userName },
										}"
									>
										<figure
											class="avatar ms-auto me-auto mb-0 position-relative w90 z-index-1"
										>
											<img
												:src="follow.userTo.profilePicture"
												alt="image"
												class="float-right p-1 bg-white rounded-circle w-100"
											/>
										</figure>
										<div class="clearfix"></div>
										<h4 class="fw-700 font-xss mt-3 mb-0">
											{{ follow.userTo.userName }}
										</h4>
										<p class="fw-500 font-xssss text-grey-500 mt-0 mb-3">
											{{ follow.userTo.email }}
										</p>
									</router-link>
									<ul
										class="d-flex align-items-center justify-content-center mt-1"
									>
										<li class="m-2">
											<h4 class="fw-700 font-sm">
												{{ follow.userTo.postsCount }}
												<span
													class="font-xsssss fw-500 mt-1 text-grey-500 d-block"
													>Post</span
												>
											</h4>
										</li>
										<li class="m-2">
											<h4 class="fw-700 font-sm">
												{{ follow.userTo.followersCount }}
												<span
													class="font-xsssss fw-500 mt-1 text-grey-500 d-block"
													>Follower</span
												>
											</h4>
										</li>
										<li class="m-2">
											<h4 class="fw-700 font-sm">
												{{ follow.userTo.followsCount }}
												<span
													class="font-xsssss fw-500 mt-1 text-grey-500 d-block"
													>Followings</span
												>
											</h4>
										</li>
									</ul>
									<a
										@click="followOrUnfollow(follow.userTo._id, index)"
										class="salam mt-4 p-0 btn p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-primary-gradiant font-xsssss fw-700 ls-lg text-white"
										>{{ follow.isFollowing ? "UNFOLLOW" : "FOLLOW" }}</a
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import globalservice from "../services/globalservice";
export default {
	data: () => ({
		followings: null,
	}),
	methods: {},
	created() {
		globalservice
			.getUserIdByUsername(this.$route.params.userName)
			.then((idRes) => {
				globalservice.getFollowing(idRes.data.id).then((res) => {
					this.followings = res.data.follows;
				});
			})
			.catch(() => {});
	},
};
</script>

<style lang="scss" scoped>
.salam {
	background-color: #1e74fd !important;
}
</style>
