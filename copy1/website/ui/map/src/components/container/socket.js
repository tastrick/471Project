import io from "socket.io-client";
import React from "react";

export const socket = io.connect("http://localhost:3001");
console.log('in socket')
//export const socketRef = React.createRef();
