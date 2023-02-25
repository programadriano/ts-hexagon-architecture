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