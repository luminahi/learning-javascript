import { io } from "socket.io-client";

const form = document.querySelector("form");
const field = document.getElementById("msg");

const socket = io("http://localhost:3000");

form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const formData = new FormData(form);
    const message = formData.get("msg");

    socket.emit("message", message, Math.random() * 100);
    field.value = "";
});
