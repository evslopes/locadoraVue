<template>
    <div id="app" class="container">
    <h1>Bem vindo a {{ title}} </h1>
    <h3 v-if="horas > 9 && horas < 17" id="aberta">ABERTO</h3>
    <h3 v-else-if="horas >= 17 && horas < 18" id="proxima-fechar">PRÓXIMA DE FECHAR</h3>
    <h3 v-else id="fechada">FECHADA</h3>

      <div class="row">
        <div class="col">
          <h2>Filmes encontrados</h2>
        </div>
      </div>

      <div class="row">

        <div class="col-3" v-bind:key="filme.id" v-for="filme in filmes">
          <div class="card">
            <img :src="filme.imagem" class="card-img-top" alt="imagem do filme">
            <div class="card-body">
              <h5 class="card-title">{{ filme.titulo }}</h5>
              <p class="card-text" v-html="filme.descricao"></p>
              <p class="card-text">{{ filme.valor | formatarPreco("R$")}}</p>
              <a href="#" class="btn btn-primary">ALUGAR</a>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>

export default {
  name: 'App',
  data: function() {
    return {
      title: "Locadora de Filmes",
      horas: new Date().getHours(),
      filmes: [
        { id: 1, titulo: "Vingadores", descricao: "Um <b>filme</b> de heróis", valor: 25, imagem: "assets/logo.png" },
        { id: 2, titulo: "Pantera Negra", descricao: "Um filme de panteras", valor: 35, imagem: "assets/logo.png" },
        { id: 3, titulo: "Homem-Formiga", descricao: "Um filme de formigas", valor: 20, imagem: "assets/logo.png" },
        { id: 4, titulo: "Capitã Marvel", descricao: "Um filme de capitãs", valor: 40, imagem: "assets/logo.png" },
        { id: 5, titulo: "Hulk", descricao: "Um filme de força", valor: 10, imagem: "assets/logo.png" }
      ]
    }
  }
};
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

#aberta {
  color: blue;
}

#proxima-fechar {
  color: orange
}

#fechada {
  color: red
}
</style>
