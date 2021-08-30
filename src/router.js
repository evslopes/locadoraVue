import Vue from "vue";
import VueRouter from "vue-router";
import Main from "./components/Main";
import Form from "./components/Form";

Vue.use(VueRouter);

export default new VueRouter({
    routes : [
        {
            path: '/',
            name: 'main',
            component: Main
        },
        {
            path: '/form',
            name: 'form',
            component: Form
        }
    ]
});