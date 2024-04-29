const express = require("express");
const app = express();
const { guardarPost, getPosts, like } = require("./consultas");

app.use(express.json());


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/post", async (req, res) => {
  try {
    const post = req.body;
    const result = await guardarPost(post);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/post", async (req, res) => {
  try {
    let { id } = req.query;
    const posts = await like(id);
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`)
});
