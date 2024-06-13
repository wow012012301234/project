import { io } from 'socket.io-client';
L
// "undefined" means the URwill be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

export const socket = io(URL);