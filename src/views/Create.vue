<template>
	<form @submit.prevent="create()">
		<input
			v-model="data.content"
			class="m-5 style2-input ps-5 form-control text-grey-900 font-xss ls-3"
		/>
		<v-file-input 
			@change="changeType"
			v-model="data.image"
			type="file">
		</v-file-input>
		<button type="submit">create</button>
	</form>
</template>

<script>
import globalservice from "../services/globalservice";
export default {
	data: () => ({
		data: {
			content: '',
			type: "photo",
			image: null,
		}
	}),
	methods: {
		create() {
			let data = new FormData();
			data.append("content", this.data.content);
			data.append("type", this.data.type);
			data.append("image", this.data.image);
			globalservice
				.createPost(data)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>
