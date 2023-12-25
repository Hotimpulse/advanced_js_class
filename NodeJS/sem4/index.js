const express = require('express');
const Joi = require('joi');
const fs = require('fs/promises');

const userSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    age: Joi.number().min(0).required(),
    city: Joi.string().min(2),
});

const app = express();

app.use(express.json());

const USERS_FILE_PATH = './users.json';

let users = [];
let uId = 0;

async function loadUsers() {
    try {
        const data = await fs.readFile(USERS_FILE_PATH, 'utf-8');
        users = JSON.parse(data);

        uId = users.reduce((maxId, user) => (user.id > maxId ? user.id : maxId), 0);
    } catch (error) {
        console.error('Error loading users:', error.message);
    }
}

async function saveUsers() {
    try {
        await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error saving users:', error.message);
    }
}

function checkIfUserExists(req, res, next) {
    const userId = +req.params.id;
    const user = users.find((user) => user.id === userId);

    if (!user) {
        res.status(404).send({ user: null });
    } else {
        req.user = user;
        next();
    }
}

app.get('/users', (req, res) => {
    res.send({ users });
});

app.get('/users/:id', checkIfUserExists, (req, res) => {
    res.send({ user: req.user });
});


app.post('/users', (req, res) => {
    const result = userSchema.validate(req.body);

    if (result.error) {
        return res.status(500).send({ error: result.error.details });
    }

    uId += 1;

    const newUser = {
        id: uId,
        ...req.body
    };

    users.push(newUser);
    saveUsers();

    res.send({ id: uId });
});

app.put('/users/:id', checkIfUserExists, (req, res) => {
    const result = userSchema.validate(req.body);

    if (result.error) {
        return res.status(500).send({ error: result.error.details });
    }

    req.user.firstName = req.body.firstName;
    req.user.lastName = req.body.lastName;
    req.user.age = req.body.age;
    req.user.city = req.body.city;

    saveUsers();

    res.send({ user: req.user });
});

app.delete('/users/:id', checkIfUserExists, (req, res) => {
    const userIndex = users.indexOf(req.user);

    users.splice(userIndex, 1);

    saveUsers();

    res.send({ user: req.user });
});

app.get('/', (req, res) => {
    const userList = users.map(user => `<li>${user.firstName} ${user.lastName}</li>`)
    const html = `<h1>Hello!</h1>
    <h3>Here is the User List:</h3>
    <ul>${userList}</ul>
    `
    res.send(html);
})

async function startServer() {
    await loadUsers();
    app.listen(3000, () => {
        console.log(`Server is running on port 3000`);
    });
}

startServer();