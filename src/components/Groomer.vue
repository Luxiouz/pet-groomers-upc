import { mapState } from 'vuex';
<template>
  <div class="card mb-3" style="max-width: 540px">
    <div class="row g-0">
      <div class="card-body">
        <div class="row">
          <div class="col-4 p-0">
            <img
              :src="groomer.photoUrl"
              class="img-thumbnail rounded-start p-0"
              style="background-size: cover !important"
              alt="groomer picture"
            />
          </div>
          <div class="col-8 p-0 mb-0">
            <h5 class="card-title">{{ groomer.name }}</h5>
            <p class="card-text mb-1">
              <span
                v-for="(star, index) in getStars(groomer.stars).floor"
                :key="index"
              >
                <i class="bi bi-star-fill"></i>
              </span>
              <i v-if="getStars(groomer.stars).half" class="bi bi-star"></i>
              <span
                v-for="(star, index) in getStars(groomer.stars).remain"
                :key="index"
              >
                <i class="bi bi-star-half"></i>
              </span>
            </p>
          </div>
        </div>
        <div class="row mt-1">
          <p class="card-text text-left mb-0" style="text-align: left">
            <span
              v-for="(service, index) in groomer.services"
              :key="index"
              class="pr-0"
            >
              {{ service.name.trim() }}
              <span v-if="index < groomer.services.length - 1">, </span>
            </span>
          </p>
          <p class="card-text">
            <small class="text-muted"
              >{{ groomer.address }}<br />
              <a href="tel">{{ groomer.phone }}</a></small
            >
          </p>
        </div>
      </div>
      <div class="row justify-content-end">
        <button class="col-sm-6 btn btn-warning btn-sm" @click="openServices()">Ver Servicios</button>
      </div>
      <div class="row mt-3"></div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex' 

export default {
  name: "Groomer",
  mounted() {
    console.log(this.groomer);
  },
  props: {
    uid: null,
    groomer: {},
  },
  methods: {
    ...mapActions(['setServices']),
    getStars(stars) {
      const floor = Math.floor(stars);
      return { floor, half: stars - floor > 0, remain: 5 - Math.ceil(stars) };
    },
    openServices() {
      this.setServices(this.groomer.services);
      this.$router.push('/services');
    },
  },
};
</script>