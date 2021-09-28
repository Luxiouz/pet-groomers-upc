import { createStore } from 'vuex'

export default createStore({
  state: {
    deliveryAmount: 5,
    cart: [],
    services:[],
    selectedService: {}
  },
  mutations: {
    setServices(state, services){
      state.services = services;
    },
    add(state, service){
      state.cart.push(service);
    },
    remove(state, index){
      state.cart.splice(index, 1);
    },
    selectService(state, service){
      state.selectedService = service;
    },
    cleanSelectedService(state){
      state.selectedService = {};
    },
    cleanServices(state){
      state.services = [];
    },
    cleanCart(state){
      state.cart = [];
    }
  },
  actions: {
    setServices(context, services){
      context.commit('setServices', services);
    },
    addService(context, service){
      context.commit('add', service);
    },
    removeService(context, index){
      context.commit('remove', index);
    },
    selectService(context, service){
      context.commit('selectService', service);
    },
    cleanSelectedService(context){
      context.commit('cleanSelectedService');
    },
    cleanCart(context){
      context.commit('cleanCart');
    },
  },
  getters:{
    totalAmount(state){
      return state.cart.reduce((acum, curr)=> acum+Number(curr.price)+Number(state.deliveryAmount), 0);
    }
  }
})
