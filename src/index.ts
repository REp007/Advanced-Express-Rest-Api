import mongoose from "mongoose"
import express from "express"
import User from "./User"
import type { User as userShema } from "../types/interfaces"

const app = express()
app.use(express.json())



app.get("/", async (req, res) => {
    try {
        const users: Array<userShema> = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'no users found' })
    }
});


app.get("/users/:id",
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'no user found' })
        }
    }
);


app.post('/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const newUser = await user.save();
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ message: 'user not created' })
    }
});


app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            const updatedUser = await user.save();
            res.json(updatedUser);
        }
    } catch (err) {
        res.status(500).json({ message: 'user not updated' })
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {

            await user.remove();
            res.json({ message: 'user removed' });
        }
    } catch (err) {
        res.status(500).json({ message: 'user not removed' })
    }
}
);



const port = process.env.PORT || 3000
const host = process.env.HOST

app.listen(port, () => {
    console.log(`Server is running on ${host}:${port}`)
})