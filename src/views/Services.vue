<template>
  <main
    class="
      container
      col-12 col-md-6 col-lg-4
      mx-auto
      px-0
      vh-100
      d-flex
      flex-column
      justify-content-between
    "
  >
    <header class="w-100 p-3">
      <div class="header-banner row align-items-center">
        <div class="col-sm-8">Servicios</div>
        <button @click="logAuth" type="button" class="btn col-sm-4">
          Salir
        </button>
      </div>
     
      <form  v-if="loaded && false" class="d-flex" :onsubmit="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Ingrese servicio"
          aria-label="Search"
          v-model.trim="searchTxt"
          :oninput="search"
        />
        <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>
    </header>
    <small v-if="String(searchTxt).trim().length>1" class="mb-2">Resultados encontrados: {{services.length}}</small>
   
    <section v-if="loaded" class="px-3">
      <div v-if="services.length === 0">
        <h3 class="mt-5">No se encontraron resultados</h3>
        <img class="img-fluid" src="@/assets/what.gif" alt="firulais-running-gif">
      </div>
      <div v-else>
        <div v-for="(value, key, index) in services" :key="index" >
          <Service :service="value"/>
        </div>
      </div>
    </section>
     <section v-else class="px-3">
       <div>
        <h3 class="mt-5 loading">Esperando a Firulais...</h3>
        <img class="img-fluid" src="@/assets/dog-running-dog.gif" alt="firulais-running-gif">
      </div>
    </section>
    <footer class="row w-100 mx-auto mt-3 justify-content-start mb-3">
      <button type="button" class="ms-3 col-4 btn btn-secondary" @click="back()">Regresar</button>
    </footer>
  </main>
</template>

<script>
import Service from "@/components/Service.vue";
import {
  signOut,
  auth,
} from "@/utils/firebase";
import swal from "sweetalert2";
import { mapActions } from 'vuex';

export default {
  name: 'Services',
  data: function () {
    return {
      services: [],
      searchTxt: '',
      loaded: false,
    };
  },
  components: {
    Service,
  },
  created() {
    this.originalServices = this.$store.state.services;
    this.services = [...this.originalServices];
    this.loaded = true;
  },
  watch:{
    searchTxt(value){
      if(value === "" || !value){
        this.services = [...this.originalServices];
      }
    }
  },
  methods: {
    ...mapActions(['selectService']),
    search(){
      this.services = this.originalServices.filter(g => {
        return String(g.name).toLowerCase().includes(this.searchTxt.toLowerCase()) || g.services.filter(s=>String(s.name).toLowerCase().includes(this.searchTxt.toLowerCase())).length>0
      })
    },
    back(){
      this.$router.push('/stores');
    },
    logAuth() {
      swal
        .fire("Cerrar Sesión", "Estas seguro que quieres salir?", "warning")
        .then((r) => {
          if (r.isConfirmed) signOut(auth);
        });
    },
  },
};
</script>

<style scoped>
section {
  height: calc(100vh - 120px);
  overflow: auto;
}

.header-banner {
  background-color: #00ccff;
  color: white;
  padding: 12px;
  margin: 0;
  font-weight: bold;
  margin-bottom: 10px;
  border-radius: 8px;
}

.container {
  border: 1px gray solid;
}

.loading{
  animation-name: loading;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

img{
  border-radius: 10px
}

@keyframes loading {
  0%{
    transform: translate(0,-5px) scale(0.9);
    color: green;
  }
  25%{
    transform: translate(0,0px) scale(1);
  }
  50%{
    transform: translate(0,5px) scale(1.1);
  }
  75%{
    transform: translate(0,0px) scale(1);
  }
  100%{
    transform: translate(0,-5px) scale(0.9);
    color: indigo;
  }
}
</style>