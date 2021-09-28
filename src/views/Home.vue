<template>
  <div class="container mt-5">
    <div class="row mx-auto">
      <div class="col-12 col-md-6 col-lg-4 mx-auto">
        <div class="mb-5">
          <img class="img-fluid" alt="Vue logo" src="@/assets/logo.png" />
        </div>
        <form class="text-start" :onsubmit="login">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Correo electrónico</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model.trim="username"
              required
            />
            <div id="emailHelp" class="form-text">
              No compartiremos tu correo con nadie.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Contraseña</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model.trim="password"
              required
            />
          </div>
          <div class="d-grid gap-2 mb-3">
            <button type="submit" class="btn btn-primary">
              Iniciar Sesión
            </button>
            <button
              type="submit"
              class="
                btn btn-secondary
                d-flex
                justify-content-center
                align-items-center
              "
            >
              <span>Ingresar con Google</span>
              <img
                class="ms-3"
                style="height: 20px"
                src="@/assets/logo_google.png"
                alt="Google"
              />
            </button>
          </div>
        </form>
        <hr />
        <div>
          <p>
            ¿No tienes una cuenta?
            <router-link to="/register"
              ><button type="button" class="btn btn-link">
                Regístrate
              </button></router-link
            >
          </p>
        </div>
      </div>
    </div>
    <footer>
      <small class="text-center">Grupo 2 - Taller Proyectos I - UPC 2021</small>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth, signInWithEmailAndPassword } from "@/utils/firebase";
import swal from "sweetalert2";

export default {
  name: "Home",
  components: {},
  data: function () {
    return {
      username: "",
      password: "",
      submitted: false,
    };
  },
  methods: {
    login(e) {
      console.log(e.username);
      e.preventDefault();
      this.submitted = true;
      signInWithEmailAndPassword(auth, this.username, this.password)
        .then((r) => {if(r.user){
           //swal.fire("Bienvenido", "Usuario: "+r.user.email, "success");
           this.$router.push('/stores')
        }})
        .catch((e) => {
          this.submitted = false;
          var errorCode = e.code;
          var errorMessage = e.message;

          switch (errorCode) {
            case "auth/invalid-email":
              swal.fire(
                "Error",
                "El correo electrónico es incorrecto",
                "error"
              );
              break;

            case "auth/wrong-password":
              swal.fire("Error", "Contraseña incorrecta", "error");
              break;
            case "auth/user-not-found":
              swal.fire("Error", "Usuario no registrado", "error");

              break;
              case "auth/user-disabled":
              swal.fire("Error", "Usuario deshabilitado por administrador", "error");

              break;

            default:
              swal.fire("Error", errorCode + "<br>" + errorMessage, "error");
          }
        });
    },
  },
};
</script>

<style scoped>
  footer{
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 5px;
    margin-bottom: 10px;
    width: 100%;
    font-size: 0.85rem;
    background: rgba(255, 255, 255, 0.45);
  }
</style>
