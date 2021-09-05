import Vue from "vue";
import VueRouter from "vue-router";
import Main from "./components/Main";
import Form from "./components/Form";
import Filme from "./components/Filme";
import EditarFilme from "./components/EditarFilme";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes : [
        {
            path: '/', // Rota para Home
            name: 'main',
            component: Main
        },
        {
            path: '/form', // Rota para o formulário
            name: 'form',
            component: Form
        },
        {
            path: "/filme/:id", // Rotas dinamicas
            name: 'filme',
            component: Filme,
            children: [  // Adicionando rotas filhas
                {
                    path: 'edit', // Direcionada para o ID do filho
                    name: 'editar-filme',
                    component: EditarFilme
                }
            ]
        }
    ]
});