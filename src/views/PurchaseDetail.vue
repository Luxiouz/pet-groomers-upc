import { mapState } from 'vuex';
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
        <div>Detalle del Servicio</div>
      </div>
    </header>

    <section v-if="loaded" class="px-3">
      <div class="mb-3 p-0" style="max-width: 540px">
        <div class="row">
          <div class="px-3">
            <div class="mt-3"></div>
            <div v-if="cart.length !== 0">
              <div
                class="row purchase-block py-3 m-0 text-start mb-3"
                v-for="(serviceItem, index) in cart"
                :key="index"
              >
                <div>
                  <p>
                    <b>{{ serviceItem.groomer }}</b>
                  </p>
                  <div class="row">
                    <p class="col-md-8">
                      {{ serviceItem.name }}
                    </p>
                    <p class="col-md-4 text-end">
                      S/.{{ serviceItem.price }}.00
                    </p>
                  </div>
                  <div class="row">
                    <p class="col-md-8">Delivery</p>
                    <p class="col-md-4 text-end">S/.{{ deliveryAmount }}.00</p>
                  </div>
                  <div class="row justify-content-end px-2">
                    <button
                      class="btn btn-danger col-md-3"
                      @click="removeFromCart(index)"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <p class="col-md-8"><b>Total:</b></p>
                <p class="col-md-4 text-end">S/.{{ totalAmount }}.00</p>
              </div>
            </div>
            <div v-else>
              <h5 class="mb-3">No hay servicios para solicitar</h5>
              <img
                class="img-fluid"
                src="@/assets/empty-cart.gif"
                alt="firulais-running-gif"
              />
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
        Ver Groomers
      </button>
      <button
        type="button"
        class="col-6 me-3 btn btn-success"
        @click="pay()"
        v-if="cart.length !== 0"
      >
        <b>Pagar y Solicitar</b>
      </button>
      <button type="button" class="col-6 me-3 btn btn-success" disabled v-else>
        <b>Pagar y Solicitar</b>
      </button>
    </footer>
  </main>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import swal from "sweetalert2";

export default {
  name: "ServiceDetail",
  mounted() {
    console.log(this.service);
  },
  data: function () {
    return {
      serviceItem: {},
    };
  },
  props: {
    service: {},
  },
  methods: {
    ...mapActions(["removeService", 'cleanCart']),
    removeFromCart(index) {
      this.removeService(index);
    },
    back() {
      this.$router.push("/stores");
    },
    pay() {
      let timerInterval;
      swal
        .fire({
          title: "Procesando Pago",
          html: '<img class="img-fluid" style="border-radius: 20px; margin-bottom:10px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F4c%2F9c%2F7e%2F4c9c7e15c40780a711d0a738187d2fb8.gif&f=1&nofb=1"/><p id="text-container">Se está utilizando su tarjeta 4457 **** **** 6067<br><br>Espere...</p>',
          timer: 7000,
          timerProgressBar: true,
          didOpen: () => {
            setTimeout(() => {
              swal.showLoading();
              const b = swal.getHtmlContainer().querySelector("#text-container");
              timerInterval = setInterval(() => {
                b.textContent =
                  "Pago realizado con éxito.\n\nRedireccionando en " +
                  swal.getTimerLeft() / 1000 +
                  " segundos";
              }, 100);
            }, 3500);

            setTimeout(() => {
              this.cleanCart();
              this.$router.push('/stores')
            }, 7000);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        })
        .then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
    },
  },
  computed: {
    ...mapState(["cart", "deliveryAmount"]),
    ...mapGetters(["totalAmount"]),
  },
  created() {
    console.log(typeof this.service == "string");
    if (typeof this.service == "string") {
      this.serviceItem = JSON.parse(this.service);
    } else {
      this.serviceItem = { ...this.service };
    }
    console.log(
      "services --->",
      this.serviceItem instanceof Object,
      this.serviceItem
    );

    this.loaded = true;
  },
};
</script>

<style scoped>
section {
  height: calc(100vh - 120px);
  overflow: auto;
}

.header-banner {
  background-color: #333;
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

.purchase-block {
  background: #eee;
  border-radius: 10px;
}

img {
  border-radius: 10px;
}
</style>