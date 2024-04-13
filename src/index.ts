import app from "./app";

const port = process.env.API_PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}!`);
});