import axios from 'axios';

const state = {
    filmes: {}
};

const getters = {
    filmes: state => state.filmes
};

const mutations = {
    SET_STORE: (state, filmes) => {
        state.filmes = filmes;
    }
};

const actions = {
    INICIALIZAR_STORE: async ({ commit }) => {
        await axios.get('http://www.mocky.io/v2/5d52306b2e00004f0081d831')
            .then((response) => {
                console.log(response.data.filmes);
                commit('SET_STORE', response.data.filmes);
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};