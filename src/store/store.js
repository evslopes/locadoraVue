import Vue from 'vue';
import Vuex from 'vuex';
import filmes from "./modules/filmes";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        filmes
    }
});

