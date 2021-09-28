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
        <div class="col-sm-8">Pet Groomers</div>
        <button @click="logAuth" type="button" class="btn col-sm-4">
          Salir
        </button>
      </div>
      <form  v-if="loaded" class="d-flex" :onsubmit="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Groomer o Servicio"
          aria-label="Search"
          v-model.trim="searchTxt"
          :oninput="search"
        />
        <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>
    </header>
    <small v-if="String(searchTxt).trim().length>1" class="mb-2">Resultados encontrados: {{groomers.length}}</small>
   
    <section v-if="loaded" class="px-3">
      <div v-if="groomers.length === 0">
        <h3 class="mt-5">No se encontraron resultados</h3>
        <img class="img-fluid" src="@/assets/what.gif" alt="firulais-running-gif">
      </div>
      <div v-else>
        <div v-for="(value, key, index) in groomers" :key="index" >
          <Groomer :uid="value.id" :groomer="value.data()"/>
        </div>
      </div>
    </section>
     <section v-else class="px-3">
       <div>
        <h3 class="mt-5 loading">Esperando a Firulais...</h3>
        <img class="img-fluid" src="@/assets/dog-running-dog.gif" alt="firulais-running-gif">
      </div>
    </section>
    <footer class="prow w-100 mx-auto mt-3">
      <button type="button" class="col-6 btn btn-secondary" @click="goToGroomers()">Groomers</button>
      <button type="button" class="col-6 btn btn-light" @click="goCart()">Carrito</button>
    </footer>
  </main>
</template>

<script>
import Groomer from "@/components/Groomer.vue";
import {
  db,
  storesRefName,
  query,
  where,
  collection,
  signOut,
  auth,
  orderBy,
  getDocs,
} from "@/utils/firebase";
import swal from "sweetalert2";

export default {
  name:'Stores',
  data: function () {
    return {
      groomers: [],
      originalGroomers: [],
      searchTxt: '',
      loaded: false,
    };
  },
  components: {
    Groomer,
  },
  created() {
    this.getStores();
  },
  watch:{
    searchTxt(value){
      if(value === "" || !value){
        this.groomers = [...this.originalGroomers];
      }
    }
  },
  methods: {
    goCart(){
      this.$router.push('/purchase-detail')
    },
    goToGroomers(){
      this.$router.push('/stores');
    },
    search(){
      this.groomers = this.originalGroomers.filter(g => {
        return String(g.data().name).toLowerCase().includes(this.searchTxt.toLowerCase()) || g.data().services.filter(s=>String(s.name).toLowerCase().includes(this.searchTxt.toLowerCase())).length>0
      })
    },
    logAuth() {
      swal
        .fire("Cerrar Sesión", "Estas seguro que quieres salir?", "warning")
        .then((r) => {
          if (r.isConfirmed) signOut(auth);
        });
    },
    getStores() {
      (async () => {
        const q = query(
          collection(db, storesRefName),
          where("enabled", "==", true),
          orderBy("name")
        );

        this.groomers = [];
        this.originalGroomers=[];

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.groomers.push(doc);
          this.originalGroomers.push(doc);
        });
        this.loaded = true;
      })();
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
  background-color: #a031e3;
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

footer .btn {
  border-radius: 0px;
}

footer .btn:first-child {
  border-right: 0.1px solid #bbb;
}

footer .btn:last-child {
  border-left: 0.1px solid #bbb;
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