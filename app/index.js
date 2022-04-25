import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const url_socket = "http://localhost:3000";

const APP_VUE = {
  beforeMount() {
    this.socket = io(url_socket);
    //Falta añadir validacion para que no pase sin ingresar nada.
    const initName = prompt("Ingrese su nombre por favor.");
    const initMail = prompt("Ingrese su correo electronico por favor.");

    const user = {
      nombre: initName,
      correo: initMail,
      cerrado: false,
      turno: this.tareas.length + 1,
    };

    this.socket.emit("agregar-turno", user);

    this.socket.on("bienvenido", (data) => {

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
    incrementarContador() {
      this.contador++;
    },

    agregarTarea() {
      const turno = {
        nombre: this.nombreTarea,
        correo: (this.nombreTarea += "@gmail.com"),
        cerrado: false,
        turno: this.tareas.length + 1,
      };
      this.socket.emit("agregar-turno", turno);

      this.nombreTarea = "";
      this.incrementarContador();
    },
  },
};

Vue.createApp(APP_VUE).mount("#app");
