<template>
  <router-view/>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
  auth,
  onAuthStateChanged
} from "@/utils/firebase";
export default {

beforeCreate(){
  onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("logueado")
    localStorage.setItem("user", JSON.stringify(user))
    this.$router.push("/stores")
  } else {
    console.log("deslogueado")
    localStorage.removeItem("user")
    this.$router.push("/")
  }
});
}
  
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
