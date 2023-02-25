interface UserRepository {
    getUserById(id: string): Promise<User>;
}