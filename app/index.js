const APP_VUE ={

    // DATA: Estado de la información
    data(){
        return {
            titulo:"GESTION DE TURNOS",
            contador:0,
            tareas:[],
            nombreTarea:""
        }
    },

    // Metodos de la aplicación
    methods:{

        incrementarContador(){
            this.contador++
        },

        agregarTarea(){
            this.tareas.push(this.nombreTarea)
            this.nombreTarea=""
            this.incrementarContador()
        }
    }
}

Vue.createApp(APP_VUE).mount("#app")