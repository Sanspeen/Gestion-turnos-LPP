import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const url_socket = "http://localhost:3000";


const APP_VUE = {

    beforeMount(){

        this.socket = io(url_socket);
        
        this.socket.on("bienvenido", (data) => {
            //Falta añadir validacion para que no pase sin ingresar nada.
            const initName = prompt("Ingrese su nombre por favor.");
            const initMail = prompt("Ingrese su correo electronico por favor.") 
            
            const user = {
                nombre: initName,
                correo: initMail,
                turno: this.tareas.length + 1
            }

            this.tareas.push(user);
        });
    },

  // DATA: Estado de la información
  data() {
    return {
      titulo: "GESTION DE TURNOS",
      contador: 0,
      tareas: [],
      nombreTarea: "",
      socket:null
    };
  },

  // Metodos de la aplicación
  methods: {
    incrementarContador() {
      this.contador++;
    },

    agregarTarea() {
      this.tareas.push(this.nombreTarea);
      this.nombreTarea = "";
      this.incrementarContador();
    },
  },
};

Vue.createApp(APP_VUE).mount("#app");
