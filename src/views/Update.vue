<template>
	<div>
		<form @submit.prevent="update()">
			<input
				v-model="updatedPost.content"
				class="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
			/>
			<!-- <v-file-input @change="changeType" v-model="data.image" type="file"> -->
			<!-- </v-file-input> -->
			<div class="card-body d-block p-0 mb-3">
                <div class="row ps-2 pe-2">
                    <div class="col-sm-12 p-1">
                        <img :src="updatedPost.postContent" class="rounded-3 w-100" alt="image" />
                    </div>
                </div>
            </div>
			<v-btn type="submit">Update</v-btn>
		</form>
	</div>
</template>

<script>
import globalservice from "../services/globalservice";
export default {
	data: () => ({
		updatedPost : null,
	}),
	methods: {
		update(){
			globalservice.updatePost({id:this.$route.params.id, content:this.updatedPost.content})
				.then(() => {
					this.$router.push("/myprofile");
				})
				.catch(() => {
					//err
				})
		}
	},
	created(){
		globalservice.getSinglePost(this.$route.params.id)
			.then((res) => {
				this.updatedPost = res.data
			})
			.catch(() => {
				//err);
			})
	}
};
</script>
