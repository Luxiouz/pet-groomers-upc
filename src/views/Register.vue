<template>
  <div class="container mt-5">
    <div class="row mx-auto">
      <div class="col-12 col-md-6 col-lg-4 mx-auto">
        <div v-show="false" class="mb-5">
          <img class="img-fluid" alt="Vue logo" src="@/assets/logo.png" />
        </div>
        <div class="mb-5">
          <h3>Registro de usuario <i class="bi bi-person-plus-fill"></i></h3>
        </div>
        <form class="text-start" :onsubmit="submitRegister">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Correo electrónico</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              maxlength="50"
              v-model.trim="username"
              required
            />
            <div id="emailHelp" class="form-text">
              No compartiremos tu correo con nadie.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputName" class="form-label">Nombres</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputFirstName"
              maxlength="100"
              v-model.trim="firstName"
              pattern="^[A-Za-z\s]+"
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputLastName" class="form-label"
              >Apellidos</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleInputLastName"
              maxlength="100"
              v-model.trim="lastName"
              pattern="^[A-Za-z\s]+"
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputDni" class="form-label">DNI</label>
            <input
              type="number"
              class="form-control"
              id="exampleInputDni"
              v-model.trim="dni"
              maxlength="8"
              :oninput="
                (e) => {
                  checkDni();
                }
              "
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputAddress" class="form-label"
              >Dirección</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleInputAddress"
              v-model.trim="address"
              maxlength="200"
              pattern="^.+"
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPhone" class="form-label">Celular</label>
            <input
              type="number"
              class="form-control"
              id="exampleInputPhone"
              v-model.trim="phone"
              maxlength="9"
              required
              :oninput="
                (e) => {
                  checkPhone();
                }
              "
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputAddress" class="form-label"
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
          <div class="mb-3">
            <label for="exampleInputPassword2" class="form-label"
              >Confirma tu contraseña</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword2"
              v-model.trim="passwordCheck"
              required
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              v-model.trim="termsAndConditions"
              required
            />
            <label class="form-check-label text-start" for="exampleCheck1"
              >Acepto <a href="#">términos y condiciones</a></label
            >
          </div>
          <div class="d-grid gap-2 mb-3">
            <button type="submit" class="btn btn-primary" :disabled="valid">
              Registrar
            </button>
            <hr />
            <button
              type="submit"
              class="
                btn btn-secondary
                d-flex
                justify-content-center
                align-items-center
              "
            >
              <span>Registrar con Google</span>
              <img
                class="ms-3"
                style="height: 20px"
                src="@/assets/logo_google.png"
                alt="Google"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  auth,
  createUserWithEmailAndPassword,
  userRefName,
  setDoc,
  db,
  doc,
} from "@/utils/firebase";
import swal from "sweetalert2";

export default {
  name: "Home",
  components: {},
  data: function () {
    return {
      username: "",
      password: "",
      passwordCheck: "",
      termsAndConditions: false,
      firstName: "",
      lastName: "",
      dni: "",
      address: "",
      phone: "",
      valid: false,
    };
  },
  methods: {
    checkDni() {
      const length = String(this.dni).length;
      if (length > 8) {
        this.dni = String(this.dni).slice(0, 8);
      }
    },
    checkPhone() {
      const length = String(this.phone).length;
      if (length > 9) {
        this.phone = String(this.phone).slice(0, 9);
      }
    },
    submitRegister(e) {
      e.preventDefault();
      if (this.password !== this.passwordCheck) {
        swal.fire("Oops!", "Las contraseñas deben ser iguales", "warning");
        return;
      } else if (String(this.dni).length !== 8) {
        swal.fire("Oops!", "DNI debe tener 8 caracteres", "warning");
        return;
      } else if (String(this.phone).length !== 9) {
        swal.fire("Oops!", "Celular debe tener 9 caracteres", "warning");
        return;
      }

      this.valid = true;
      this.createUser(this.username, this.password);
    },
    createUser(email, password) {
      // eslint-disable-next-line no-undef

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);

          (async () => {
            const userRef = doc(db, userRefName, user.uid);
            await setDoc(
              userRef,
              {
                name: this.firstName,
                lastName: this.lastName,
                email: this.username,
                dni: this.dni,
                address: this.address,
                phone: this.phone,
              },
              { merge: true }
            );

            swal
              .fire({
                title: "Bienvenido",
                text: this.firstName + " " + this.lastName,
                icon: "success",
                allowOutsideClick: false,
                allowEscapeKey: false,
              })
              .then((r) => {
                if (r.isConfirmed) {
                  this.$router.push("/");
                }
              });
          })();

          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          this.valid = false;
          switch (errorCode) {
            case "auth/email-already-in-use":
              swal.fire(
                "Error",
                "El correo electrónico ya ha sido registrado",
                "error"
              );
              break;

            case "auth/weak-password":
              swal.fire(
                "Contraseña débil",
                "Intente con una contraseña más fuerte",
                "error"
              );
              break;

            default:
              swal.fire("Error", errorCode + "<br>" + errorMessage, "error");
          }

          console.log("Error", errorCode + "<br>" + errorMessage, "error");
        });
    },
    resetForm() {
      this.username = "";
      this.password = "";
      this.passwordCheck = "";
      this.termsAndConditions = false;
    },
  },
};
</script>
