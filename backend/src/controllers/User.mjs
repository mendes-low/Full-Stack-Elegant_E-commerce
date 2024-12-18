import UserRepository from "../repositories/User.mjs";

class UserController {
    async getUsers(req, res) {
        const users = await UserRepository.getUsers();
        res.status(200).send(users);
    }

    async getUserById(req, res) {
        const user = await UserRepository.getUserById(req.params.id);
        res.status(200).send(user);
    }

    async getUserByEmail(req, res) {
        const user = await UserRepository.getUserByEmail(req.params.email);
        res.status(200).send(user);
    }

    async addUser(req, res) {
        const user = await UserRepository.addUser(req.body);
        res.status(201).send(user);
    }

    async updateUserField(req, res) {
        const userId = req.params.id;
        const { field, value } = req.body;

        if (!['password', 'fullname', 'username', 'email'].includes(field)) {
            return res.status(400).send({ message: "Invalid field" });
        }

        const user = await UserRepository.getUserById(userId);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        user[field] = value;
        await user.save();

        res.status(200).send(user);
    }

    async deleteUser(req, res) {
        const user = await UserRepository.deleteUser(req.params.id);
        res.status(200).send(user);
    }
}

export default UserController;