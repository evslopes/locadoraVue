<template>
  <div id="app" class="container">
    <div class="row" v-if="mostrarFilmes">
      <Main />
    </div>
    <div class="row" v-else>
      <Form />
    </div>
      <div class="col-12">
        <pre>
          Primeiro nome: {{ pedido.primeiroNome }}
          Último nome: {{ pedido.ultimoNome }}
          Endereço: {{ pedido.endereco }}
          Cidade: {{ pedido.cidade }}
          Estado: {{ pedido.estado }}
          CEP: {{ pedido.cep }}
          Pago na entrega?: {{ pedido.pagoNaEntrega }}
          Entrega: {{ pedido.entrega }}
        </pre>
      </div>
    </div>
</template>

<script>
import Main from './components/Main';
import Form from "./components/Form";

export default {
  name: "app",
  components: {
    Main,
    Form
  },
  data: function() {
    return {
      mostrarFilmes: true,
    };
  },
  methods: {
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