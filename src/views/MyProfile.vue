<template>
	<div>
        <div v-for="post in posts" :key="post" class="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
            <div class="card-body p-0 d-flex">
                <figure class="avatar me-3">
                    <img
                        :src="post.postedUser[0].profilePicture"
                        alt="image"
                        class="shadow-sm rounded-circle w45"
                    />
                </figure>
                <h4 class="fw-700 text-grey-900 font-xssss mt-1">
                    {{myUser.userName}}
                    <span class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{{post.createdAt}}</span>
                </h4>
                <!-- <h1>{{post._id}}</h1> -->
                <router-link class="ms-auto" :to="{ name: 'Update', params: { id: post._id} }">
                    <v-btn class="ms-auto mr-3">Yenile</v-btn>
                </router-link>
                <v-btn @click="deletePost(post._id)">Sil</v-btn>
                <!-- <a class="ms-auto" id="dropdownMenu5" data-bs-toggle="dropdown" aria-expanded="false"><i class="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a> -->
            </div>
            
            <div class="card-body p-0 me-lg-5">
                <p class="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                    {{ post.content }}
                </p>
            </div>
            <div v-if="post.type !== 'text'" class="card-body d-block p-0 mb-3">
                <div class="row ps-2 pe-2">
                    <div class="col-sm-12 p-1">
                        <img :src="post.postContent" class="rounded-3 w-100" alt="image" />
                    </div>
                </div>
            </div>
            
            <div class="card-body d-flex p-0">
				<a
					class="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
				>
					<i
						class="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"
					></i>
					<!-- <i class="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i> -->

					<v-btn @click="likeOrUnlike(post._id)" mr-2 color="red">{{
						(post.likesFrom.indexOf(userId) != -1 ? "unlike " : "like ") +
							post.likesFrom.length
					}}</v-btn>
				</a>
				<a
					class="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
				>
					<i
						class="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"
					></i>
					<span class="d-none-xss">{{ post.commentCount }} Comment</span>
				</a>
			</div>
        </div>
    </div>    
</template>

<script>
import globalservice from '../services/globalservice'
import { mapGetters } from 'vuex'
export default {
    data: () => ({
        posts: [],
        myUser: null
    }),
    computed: {
      ...mapGetters(["userId"])
    },
    methods: {
        deletePost(id){
            globalservice.deletePost(id)
                .then(() => {
                    this.snackbarText = "Post Ugurla Silindi"
                    console.log("silindi");
                    // this.snackbar = true
                    const index = this.posts.findIndex(post => post._id === id);
                    // this.posts[index].content = 'deyishdirildi';
                    console.log(this.posts[index].content);
                })
                .catch(() => {
                    console.log("salam");
                    const index = this.posts.findIndex(post => post._id === id);

                    this.posts[index] = null;
                    console.log(this.posts);
                    // this.snackbarText = "Bu mailde account movcud deyil"
                    // this.snackbar = true
                })
        },
        likeOrUnlike(id) {
			globalservice
				.likeOrUnlike(id)
				.then(() => {
                    const index = this.posts.findIndex(post => post._id === id);
                    if (this.posts[index].likesFrom.indexOf(this.userId) === -1) {
                        this.posts[index].likesFrom.push(this.userId)
                    }else{
                        console.log(this.posts[index].postedUser[0]._id);
                        this.posts[index].likesFrom = this.posts[index].likesFrom.filter((postedId) => postedId !== this.userId)
                    }
				})
				.catch(() => {
					// this.snackbarText = "Bu mailde account movcud deyil"
					// this.snackbar = true
				});
		},
    },
    created(){
        globalservice.getOwnPosts()
            .then((res) => {
                this.posts = res.data.posts
            })
            .catch(() => {
                //err
            })

        globalservice.getOwnUser()
            .then((res) => {
                this.myUser = res.data.user
            })
            .catch(() => {
                //err
            })
    }
}
</script>
