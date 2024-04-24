import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    },
    {
      id: "qwe123",
      name: "Cindy",
      job: "Zookeeper"
    }
  ]
};

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function addUser(user) {
    const newUser = {...user, id: generateId()};
    users.users_list.push(newUser);
    return newUser;
}

app.get("/users", (req, res) => {
    const { name, job } = req.query;
    let results = users.users_list;
  
    if (name) {
      results = results.filter(user => user.name.toLowerCase() === name.toLowerCase());
    }
    if (job) {
      results = results.filter(user => user.job.toLowerCase() === job.toLowerCase());
    }
  
    res.json({ users_list: results });
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.users_list.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send("User not found.");
    }
});

app.post("/users", (req, res) => {
    const newUser = addUser(req.body);
    res.status(201).json(newUser);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const initialLength = users.users_list.length;
    users.users_list = users.users_list.filter(user => user.id !== id);
    const currentLength = users.users_list.length;
    if (initialLength > currentLength) {
        res.status(200).send(`User with id ${id} has been deleted.`);
    } else {
        res.status(404).send("User not found.");
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
