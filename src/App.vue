<template>
  <div id="app" class="container">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "app",
  components: {

  },
  data: function() {
    return {
      mostrarFilmes: true
    };
  },
  methods: {
    submitFormulario() {
      alert('Pedido finalizado');
    },
    mostrarCarrinho() {
      this.mostrarFilmes = this.mostrarFilmes ? false : true;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>