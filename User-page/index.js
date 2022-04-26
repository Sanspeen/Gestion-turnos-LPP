import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const url_socket = "http://localhost:3000";

const APP_VUE = {
  beforeMount() {
    this.socket = io(url_socket);

    this.socket.on("data-turnos", (data) => {
      this.tareas = data;
    });
  },

  // DATA: Estado de la información
  data() {
    return {
      titulo: "GESTION DE TURNOS",
      contador: 0,
      tareas: [],
      nombreTarea: "",
      socket: null,
    };
  },

  // Metodos de la aplicación
  methods: {
    reiniciar(){
        let arregloVacio = [];
        this.socket.emit("reiniciar", arregloVacio);
    },
    eliminarTurno(turno){
        console.log(turno.id);
        this.socket.emit("eliminar-turno", turno);
    },
    agregarTurno() {
      const turno = {
        nombre: this.nombreTarea,
        correo: (this.nombreTarea += "@gmail.com"),
        cerrado: false,
        turno: Math.floor(Math.random() * (999 - 100)) + 100,
        id: Math.floor(Math.random() * (999 - 100)) + 100,
      };
      this.socket.emit("agregar-turno", turno);

      this.nombreTarea = "";
    },
  },
};

Vue.createApp(APP_VUE).mount("#app");
