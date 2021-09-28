<template>
  <div
  class="cursorBtn"
    @click="setService()"
  >
    <div class="card mb-3" style="max-width: 540px">
      <div class="row g-0">
        <div class="card-body">
          <div class="row">
            <div class="col-4 col-md-2 p-0">
              <img
                :src="service.photoUrl"
                class="img-thumbnail rounded-start p-0"
                style="background-size: cover !important"
                alt="groomer picture"
              />
            </div>
            <div class="col-8 col-md-10 p-0 px-2 mb-0">
              <h5 class="card-title">{{ service.name }}</h5>
              <p class="card-text text-justify desc mb-1 text-muted">
                {{ service.description }}
              </p>
              <p class="card-text mb-1">S/.{{ service.price }}.00</p>
            </div>
          </div>
          <div v-if="false" class="row mt-1">
            <p class="card-text text-left mb-0" style="text-align: left">
              {{ service.description }}
            </p>
            <div class="row justify-content-end">
              <button class="col-md-4 mt-3 btn btn-success">Agregar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "Service",
  mounted() {
    console.log(this.service);
  },
  props: {
    service: {},
  },
  methods: {
    ...mapActions(['selectService']),
    setService(){
      this.selectService(this.service);
      this.$router.push('/services-detail')
    }
  },
};
</script>

<style scoped>
.cursorBtn {
  cursor: pointer;
}
.desc {
  font-size: 0.85rem;
  text-align: justify;
}
</style>