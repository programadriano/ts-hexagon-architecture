import express from "express";
import { UserController } from "./userController";

const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const app = express();
app.get('/users/:id', userController.getUserById.bind(userController));
app.listen(3000, () => console.log('Server is listening on port 3000'));