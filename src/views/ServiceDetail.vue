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
    </header>

    <section v-if="loaded" class="px-3">
      <div class="mb-3 p-0" style="max-width: 540px">
        <div class="row">
          <div class="p-0 m-0">
            <img
              :src="selectedService.photoUrl"
              class="img-thumbnail p-0 m-0"
              style="background-size: cover !important"
              alt="groomer picture"
            />
          </div>
          <div class="row m-0">
            <div class="mt-3 p-0 text-start">
              <h5 class="card-title">{{ selectedService.name }}</h5>
            </div>
            <div class="mt-3 p-0 text-start">
              <p class="card-text mb-1">
                {{ selectedService.description }}
              </p>
            </div>
            <div class="mt-3 p-0 text-start">
              <p class="card-text mb-1">
                <b>S/.{{ selectedService.price }}.00</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="row my-3 mx-0 justify-content-end">
      <button
        type="button"
        class="col-4 me-2 btn btn-secondary"
        @click="back()"
      >
        Atrás
      </button>
      <button
        type="button"
        class="col-6 me-3 btn btn-success"
        @click="addToCart()"
      >
        Agregar
      </button>
    </footer>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import swal from "sweetalert2";

export default {
  name: "ServiceDetail",
  mounted() {
    console.log(this.selectedService);
  },
  methods: {
    ...mapActions(['addService']),
    back() {
      this.$router.push('services');
    },
    addToCart() {
      swal
        .fire({
          title: "Agregar",
          text: "Se agregará este servicio al carrito",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Agregar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.addService(this.selectedService);
            swal
              .fire({
                title: "Agregado",
                text: "Se agregó este servicio al carrito",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cerrar",
                confirmButtonText: "Ver Carrito",
              })
              .then((result) => {
                if (result.isConfirmed) {
                  this.$router.push("/purchase-detail");
                }
              });
          }
        });
    },
  },
  created() {
    this.loaded = true;
  },
  computed: mapState([
    // map this.count to store.state.count
    "selectedService",
  ]),
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

.loading {
  animation-name: loading;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

img {
  border-radius: 10px;
}
</style>