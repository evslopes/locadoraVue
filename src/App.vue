<template>
    <div id="app" class="container">
    <h1>Bem vindo a {{ title}} </h1>
    <h3 v-if="horas > 9 && horas < 17" id="aberta">ABERTO</h3>
    <h3 v-else-if="horas >= 17 && horas < 18" id="proxima-fechar">PRÓXIMA DE FECHAR</h3>
    <h3 v-else id="fechada">FECHADA</h3>

      <div class="row">
        <div class="col">
          <h2>Filmes encontrados</h2>
          <button type="button" class="btn btn-primary btn-lg"
              @click="mostrarCarrinho">
            Carrinho: {{quantidadeNoCarrinho}} filmes
          </button>
        </div>
      </div>

      <div class="row" v-if="mostrarFilmes">

        <div class="col-3" v-bind:key="filme.id" v-for="filme in filmes">
          <div class="card">
            <img :src="filme.imagem" class="card-img-top" alt="imagem do filme">
            <div class="card-body">
              <h5 class="card-title">{{ filme.titulo }}</h5>
              <p class="card-text" v-html="filme.descricao"></p>
              <span class="mensagem-estoque"
                    v-if="filme.estoqueDisponivel - quantidadeNoCarrinhoPorFilme(filme) === 0">
                      Indisponível
              </span>
              <span class="mensagem-estoque"
                    v-else-if="filme.estoqueDisponivel - quantidadeNoCarrinhoPorFilme(filme) < 5">
                      Apenas {{ filme.estoqueDisponivel - quantidadeNoCarrinhoPorFilme(filme)}} itens no estoque
              </span>
              <span class="mensagem-estoque"
                    v-else>
                      Alugue agora!
              </span>
              <p class="card-text">{{ filme.valor | formatarPreco("R$")}}</p>
              <a href="#"
                 @click="adicionarAoCarrinho(filme)"
                 v-if="validarPermissaoParaAdicionarNoCarrinho(filme)"
                 class="btn btn-primary">ALUGAR</a>
              <a href="#" v-else class="btn btn-primary disabled">ALUGAR</a>
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-else>
        <h2>Carrinho</h2>

        <div class="col-12">
          <form>
            <div class="form-group">
              <label for="primeiroNome">Primeiro nome</label>
              <input
              type="text"
              class="form-control"
              id="primeiroNome"
              placeholder="Digita o primeiro nome"
              v-model.trim.lazy="pedido.primeiroNome"
              >
            </div>
            <div class="form-group">
              <label for="ultimoNome">Último nome</label>
              <input
              type="text"
              class="form-control"
              id="ultimoNome"
              placeholder="Digita o último nome"
              v-model.trim.lazy="pedido.ultimoNome"
              >
            </div>
            <div class="form-group">
              <label for="endereco">Endereço</label>
              <input
                  type="text"
                  class="form-control"
                  id="endereco"
                  placeholder="Digita o endereco"
                  v-model.trim.lazy="pedido.endereco"
              >
            </div>
            <div class="form-group">
              <label for="cidade">Cidade</label>
              <input
                  type="text"
                  class="form-control"
                  id="cidade"
                  placeholder="Digita a cidade"
                  v-model.trim.lazy="pedido.cidade"
              >
            </div>
            <div class="form-group">
              <label for="estado">Estado</label>
              <select class="form-control" id="estado" v-model="pedido.estado">
                <option disabled value>Escolha um estado</option>
                  <option
                    v-for="(estado, key) in estados"
                    v-bind:value="estado"
                    v-bind:key="key">
                    {{ key }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="cep">CEP</label>
              <input
                  type="number"
                  class="form-control"
                  id="cep"
                  placeholder="Digita o CEP"
                  v-model.number="pedido.cep"
              >
            </div>

            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="pagoNaEntrega"
                value="true"
                v-bind:true-value="pedido.simNaEntrega"
                v-bind:false-value="pedido.naoNaEntrega"
                v-model="pedido.pagoNaEntrega"
              >
              <label class="form-check-label" for="pagoNaEntrega">Pago na entrega?</label>
            </div>

            <div class="form-group form-check-inline">
              <input
                type="radio"
                class="form-check-input"
                id="manha"
                value="Manhã"
                v-model="pedido.entrega"
              >
              <label class="form-check-label" for="manha">Manhã</label>
            </div>

            <div class="form-group form-check-inline">
              <input
                  type="radio"
                  class="form-check-input"
                  id="tarde"
                  value="Tarde"
                  v-model="pedido.entrega"
              >
              <label class="form-check-label" for="tarde">Tarde</label>
            </div>
            <div class="form-group form-check-inline">
              <input
                  type="radio"
                  class="form-check-input"
                  id="noite"
                  value="Noite"
                  v-model="pedido.entrega"
              >
              <label class="form-check-label" for="noite">Noite</label>
            </div>

            <div class="form-group">
              <button type="submit" class="btn btn-primary" v-on:click="submitFormulario">
                Finalizar pedido
              </button>
            </div>
          </form>
        </div>

        <div class="col-12">
        <pre>
          Primeiro nome: {{ pedido.primeiroNome}}
          Último nome: {{ pedido.ultimoNome}}
          Endereço: {{pedido.endereco}}
          Cidade: {{pedido.cidade}}
          Estado: {{pedido.estado}}
          CEP: {{pedido.cep}}
          Pago na entrega?: {{pedido.pagoNaEntrega}}
          Entrega: {{pedido.entrega}}
        </pre>
      </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'App',
  data: function() {
    return {
      mostrarFilmes: true,
      title: "Locadora de Filmes",
      horas: new Date().getHours(),
      pedido: {
        primeiroNome: '',
        ultimoNome: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        pagoNaEntrega: "Não",
        simNaEntrega: "Sim",
        naoNaEntrega: "Não",
        entrega: "Manhã"
      },
      filmes: [
        { id: 1, titulo: "Vingadores", descricao: "Um <b>filme</b> de heróis", valor: 25, imagem: "assets/logo.png",estoqueDisponivel: 3 },
        { id: 2, titulo: "Pantera Negra", descricao: "Um filme de panteras", valor: 35, imagem: "assets/logo.png", estoqueDisponivel: 6 },
        { id: 3, titulo: "Homem-Formiga", descricao: "Um filme de formigas", valor: 20, imagem: "assets/logo.png", estoqueDisponivel: 2 },
        { id: 4, titulo: "Capitã Marvel", descricao: "Um filme de capitãs", valor: 40, imagem: "assets/logo.png", estoqueDisponivel: 8},
        { id: 5, titulo: "Hulk", descricao: "Um filme de força", valor: 10, imagem: "assets/logo.png", estoqueDisponivel: 7}
      ],
      carrinho: [],
      estados: {
        RJ: 'Rio de Janeiro',
        MG: 'Minhas Gerias',
        SP: 'São Paulo',
        ES: 'Espírito Santo'
      }
    }
  },
  methods: {
    mostrarCarrinho() {
      this.mostrarFilmes = this.mostrarFilmes ? false : true;
    },
    adicionarAoCarrinho: function (filme){
      this.carrinho.push(filme.id)
    },
    quantidadeNoCarrinhoPorFilme: function (filme) {
      let quantidade = 0;
      for (var i = 0; i < this.carrinho.length; i++){
        if(filme.id == this.carrinho[i]){
          quantidade++;
        }
      }
      return quantidade;
    },
    validarPermissaoParaAdicionarNoCarrinho: function (filme) {
      return filme.estoqueDisponivel > this.quantidadeNoCarrinhoPorFilme(filme)
    },
    submitFormulario(){
      alert('Pedido finalizado')
    }
  },
  computed: {
    quantidadeNoCarrinho: function (){
      return this.carrinho.length;
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

.mensagem-estoque{
  font-weight: bold;
}
</style>
