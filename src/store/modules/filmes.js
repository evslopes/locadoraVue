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
    INICIALIZAR_STORE: ({ commit }) => {
        axios.get('static/filmes.json')
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