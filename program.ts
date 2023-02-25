// Domain Layer

interface UserRepository {
  getUserById(id: string): Promise<User>;
}

interface User {
  id: string;
  name: string;
  email: string;
}

class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: string): Promise<User> {
    return this.userRepository.getUserById(id);
  }
}

// Adapter Layer

import express, { Request, Response } from 'express';

class UserController {
  constructor(private readonly userService: UserService) {}

  async getUserById(req: Request, res: Response) {
    const id = req.params.id;
    const user = await this.userService.getUserById(id);
    res.status(200).json(user);
  }
}

// Infrastructure Layer

class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' },
  ];

  async getUserById(id: string): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }
}

// Application Layer

const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const app = express();
app.get('/users/:id', userController.getUserById.bind(userController));
app.listen(3000, () => console.log('Server is listening on port 3000'));
