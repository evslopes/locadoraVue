<template>
  <div id="app">
    <h1>Bem vindo a {{ title}} </h1>
    <p v-if="horas > 9 && horas < 18">Aberto!</p>
    <p v-else>Fechado!</p>
   </div>
</template>

<script>

export default {
  name: 'App',
  data: function() {
    return {
      title: "Locadora de Filmes",
      horas: new Date().getHours()
    }
  }  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
