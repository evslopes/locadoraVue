import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        filmes: {} //os filmes que serão exibidos na tela Main
    },
    mutations: {
        SET_STORE: (state, filmes) => { // preencher os filmes assim que forem carregados
            state.filmes = filmes
        }
    },
    actions: {
        INICIALIZAR_STORE: ({ commit }) => { // realiza a chamada ao JSON /API
            axios.get('static/filmes.json')
                .then((response) => {
                console.log(response.data.filmes);
                commit('SET_STORE',  response.data.filmes);
            });
        }
    },
    getters: {
        filmes: state => state.filmes
    }
});

