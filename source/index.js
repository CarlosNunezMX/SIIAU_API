import {Server} from "./server.js";
const App = new Server();
console.log("=== CURRENT ENVIROMENT ===")
console.log("NodeJS Version: ", process.version)
console.log("==========================")
App.listen();