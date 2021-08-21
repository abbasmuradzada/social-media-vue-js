<template>
	<div class="middle-sidebar-left">
		<div class="middle-wrap">
			<div class="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
				<div class="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
					<router-link
						:to="{
							name: 'Settings',
						}"
					>
						<a class="cursor-pointer pr-2 text-center menu-icon chat-active-btn"
							><i class="feather-arrow-left font-xl text-white"></i
						></a>
					</router-link>
					<h4 class="font-xs text-white fw-600 ms-4 mb-0 mt-1">
						Change Password
					</h4>
				</div>
				<div class="card-body p-lg-5 p-4 w-100 border-0">
					<form action="#">
						<div class="row">
							<div class="col-lg-12 mb-3">
								<div class="form-gorup">
									<label class="mont-font fw-600 font-xssss"
										>Current Password</label
									>
									<input
										v-model="prevPass"
										type="text"
										name="comment-name"
										class="form-control"
									/>
								</div>
							</div>

							<div class="col-lg-12 mb-3">
								<div class="form-gorup">
									<label class="mont-font fw-600 font-xssss"
										>Change Password</label
									>
									<input
										v-model="newPass"
										type="text"
										name="comment-name"
										class="form-control"
									/>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-lg-12 mb-3">
								<div class="form-gorup">
									<label class="mont-font fw-600 font-xssss"
										>Confirm Change Password</label
									>
									<input
										v-model="newPassCopy"
										type="text"
										name="comment-name"
										class="form-control"
									/>
								</div>
							</div>
						</div>
                        <div v-if="errMsg" class="row mb-2">
                            <h2 class="text-red">{{errMsg}} </h2>
                        </div>
						<div class="row">
							<div class="col-lg-12 mb-0">
								<a
									@click="changePassword()"
									class="cursor-pointer bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
									>Save</a
								>
							</div>
						</div>
					</form>
				</div>
			</div>
			<!-- <div class="card w-100 border-0 p-2"></div> -->
		</div>
	</div>
</template>

<script>
import globalservice from "../services/globalservice";
export default {
	data: () => ({
		prevPass: "",
		newPass: "",
		newPassCopy: "",
		errMsg: null,
	}),
	methods: {
		changePassword() {
			if (this.newPass === this.newPassCopy) {
				globalservice
					.changePassword({
						prevPassword: this.prevPass,
						newPassword: this.newPass,
					})
					.then((res) => {
						console.log(res);
						this.errMsg = null;
					})
					.catch(() => (this.errMsg = "Previous password is not correct"));
			} else {
				this.errMsg = "Password and confirmation password are not same";
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.bg-current {
	background-color: #05f !important;
}
</style>
