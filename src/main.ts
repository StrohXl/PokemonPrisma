import Express, { json } from "express";
import Routes from "./main.routes";
const app = Express();
const port = 8000;
app.use(json())
Routes(app);
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () =>
  console.log("Servidor corriendo en http://localhost:" + port)
);
