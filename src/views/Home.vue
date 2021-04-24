<template>
    <dir>
        <h1>Home Page</h1>
        <v-btn @click="logout">Logout</v-btn>
    </dir>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data: () => ({

    }),
    computed: {
      ...mapGetters(["userInfo"])
    },
    methods: {
        logout(){
            return new Promise((resolve, reject) => {
                this.$store.dispatch("logout", this.$router)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
            });
        }
    }
}
</script>

<style lang="scss">

</style>