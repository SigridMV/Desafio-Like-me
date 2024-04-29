const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgres",
  database: "likeme",
  port: 5432,
});

const guardarPost = async (post) => {
  const values = Object.values(post);
  const consulta = {
    text: "INSERT INTO posts (usuario, url, descripcion, likes) VALUES ($1, $2, $3, 0)",
    values: values
  };
  try {
    const result = await pool.query(consulta);
    return result;
  } catch (error) {
    console.log;
    return error;
  }
};

const getPosts = async (id) => {
  const result = await pool.query(
    `UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows;
};

const like = async (id) => {
  const result = await pool.query(`SELECT * FROM posts WHERE id = $1`, [id]);
  return result.rows;
};

module.exports = { guardarPost, getPosts, like };
