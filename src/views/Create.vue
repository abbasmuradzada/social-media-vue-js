<template>
	<form @submit.prevent="create({ content, type, previewImage })">
		<input
			v-model="data.content"
			class="m-5 style2-input ps-5 form-control text-grey-900 font-xss ls-3"
		/>
		<v-file-input 
			v-model="data.previewImage"
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
			content: "",
			type: "photo",
			previewImage: null,
		}
	}),
	methods: {
		create() {
			let data = new FormData();
			data.append("content", this.data.content);
			data.append("type", this.data.type);
			data.append("previewImage", this.data.previewImage);
			data.forEach(element => {
				console.log(element);
			});
			globalservice
				.createPost(data)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.log(err);
				});

			// console.log(this.content);
			// console.log(this.type);
			// console.log(this.previewImage);
		},
		// uploadImage(e) {
        //     const image = e.target.files[0];

        //     // let data = new FormData();
        //     // data.append('name', 'my-picture');
        //     // data.append('file', event.target.files[0]);
		// 	const reader = new FileReader();
        //     reader.onload = e =>{
        //         // var arrB = e.target.result;
        //         this.previewImage = e.target.result;
        //             // console.log(this.previewImage);
        //         };
		// 	reader.readAsArrayBuffer(image);

		// 	// reader.onload = (e) => {
		// 	// this.previewImage = data;
		// 	// };
		// },
	},
};
</script>
