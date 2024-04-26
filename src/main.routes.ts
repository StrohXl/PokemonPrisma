import { Express } from "express";
import routerPokemon from "./modules/pokemon/pokemon.controller";
import typeRouter from "./modules/type/type.controller";
import generationRouter from "./modules/generation/generation.controller";
export default function Routes(app: Express) {
  app.use("/pokemon", routerPokemon);

  app.use("/type", typeRouter);

  app.use("/generation", generationRouter);
}
