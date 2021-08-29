<template>
  <div class="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
    <div class="card-body p-lg-5 p-4 w-100 border-0">
      <div class="row justify-content-center">
        <div
          class="
            col-lg-4
            text-center
            mb-5
            justify-content-center
            align-items-center
          "
        >
          <figure class="avatar ms-auto me-auto mb-2 mt-2 w100">
            <img
              :src="profilePicture"
              alt="image"
              class="shadow-sm rounded-3 w-100"
            />
          </figure>

          <!-- <a href="#" class="p-3 alert-primary text-primary font-xsss fw-500 mt-2 rounded-3">Upload New Photo</a> -->
        </div>
        <div class="col-lg-12 d-flex justify-content-evenly mb-3">
          <!-- <v-btn
            @click="uploadProfilePicture"
            class="my-2 text-white badge-warning"
            >Click to change profile image</v-btn
          > -->
          <v-file-input
            type="file"
            v-model="profilePicture"
            @change="changeProfilePicture"
            class="my-2 text-white badge-warning"
            placeholder="Upload image"
          />
          <v-btn
            @click="deleteUserProfilePicture"
            class="my-2 text-white badge-danger"
          >
            Click to delete profile image
          </v-btn>
        </div>
      </div>

      <form action="#">
        <div class="row">
          <div class="col-lg-6 mb-3">
            <div class="form-group">
              <label class="mont-font fw-600 font-xsss">Username</label>
              <input type="text" class="form-control" v-model="userName" />
            </div>
          </div>
          <div class="col-lg-6 mb-3">
            <div class="form-group">
              <label class="mont-font fw-600 font-xsss">Email</label>
              <input type="text" class="form-control" v-model="email" />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12 mb-3">
            <div class="card mt-3 border-0">
              <div
                class="
                  card-body
                  d-flex
                  justify-content-between
                  align-items-end
                  p-0
                "
              >
                <div class="form-group mb-0 w-100">
                  <v-file-input
                    type="file"
                    name="file"
                    id="file"
                    class="input-file"
                    v-model="backgroundImage"
                    @change="changeBackround"
                  ></v-file-input>
                  <img
                    v-if="backgroundImage"
                    :src="backgroundImage"
                    alt="backgroundImage"
                  />
                  <label
                    for="file"
                    class="
                      rounded-3
                      text-center
                      bg-white
                      btn-tertiary
                      js-labelFile
                      p-4
                      w-100
                      border-dashed
                    "
                  >
                    <i class="ti-cloud-down large-icon me-3 d-block"></i>
                    <span class="js-fileName"
                      >Drag and drop or click to replace background image</span
                    >
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-12 mb-3">
            <label class="mont-font fw-600 font-xsss">Bio</label>
            <textarea
              class="form-control mb-0 p-3 h100 bg-greylight lh-16"
              rows="5"
              placeholder="Write your message..."
              spellcheck="false"
            ></textarea>
          </div>

          <div class="col-lg-12 d-flex justify-content-center">
            <v-btn
              @click="updateUser"
              class="col-lg-6 d-flex badge-primary text-white"
              >Save
            </v-btn>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import globalservice from "../services/globalservice";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    user: {},
    userName: "",
    email: "",
    profilePicture: "",
    backgroundImage: null,
  }),
  components: {},
  computed: {
    ...mapGetters(["userId"]),
  },
  methods: {
    getUser() {
      globalservice.getOwnUser().then((res) => {
        this.user = res.data.user;
        this.userName = this.user.userName;
        this.email = this.user.email;
        this.backgroundImage = this.user.backgroundImage;
      });
    },

    changeBackround(e) {
      this.backgroundImage = e;
    },
    updateUser() {
      const data = new FormData();
      //   const user = {
      //     userName: this.userName,
      //     email: this.email,
      //     _id: this.userId,
      //   };
      console.log(this.profilePicture);
      data.append("user", this.profilePicture);

      console.log(...data.entries(), ...data.keys());
      if (data) {
        globalservice
          .uploadProfilePicture(...data.keys(), ...data.values())
          .then(() => {
            this.getUser();
          })
          .catch((err) => console.log(err));
      }

      //   globalservice.updateUser(user).then(() => {
      //     this.getUser();
      //   });
    },
    // uploadProfilePicture() {
    //     this.$refs.profilePicRef.click();
    //   this.$refs.profilePicRef.$refs.input.click();
    // },
    changeProfilePicture() {
      console.log(this.profilePicture);
    },
    deleteUserProfilePicture() {
      globalservice
        .deleteProfilePicture()
        .then(() => {
          this.getUser();
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getUser();
  },
};
</script>
