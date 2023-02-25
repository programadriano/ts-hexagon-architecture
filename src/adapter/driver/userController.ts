import express, { Request, Response } from 'express';

export class UserController {
    constructor(private readonly userService: UserService) { }

    async getUserById(req: Request, res: Response) {
        const id = req.params.id;
        const user = await this.userService.getUserById(id);
        res.status(200).json(user);
    }
}
