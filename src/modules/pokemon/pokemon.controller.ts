import { NextFunction, Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { PokemonService } from "./pokemon.service";
import validatePokemon from "../../validators/createPokemonValidator";
import validateResult from "../../helpers/validateHelper";
import { validationResult } from "express-validator";
const prisma = new PrismaClient();
const pokemonService = prisma.pokemon;
const service = new PokemonService();

const routerPokemon = Router();

routerPokemon.get("/", async (req, res) => {
  const query = req.query;
  if (query.include === "types") {
    return res.send(await pokemonService.findMany({ include: { type: true } }));
  }
  if (query.include === "generation") {
    return res.send(
      await pokemonService.findMany({ include: { Generation: true } })
    );
  }
  if (query.include === "all") {
    return res.send(
      await pokemonService.findMany({
        include: { Generation: true, type: true },
      })
    );
  }
  return res.send(await pokemonService.findMany());
});

routerPokemon.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const pokemon = await pokemonService.findUnique({
    where: { id },
    include: { Generation: true, type: true },
  });
  if (!pokemon) {
    return res.status(404).send({ error: "Not found" });
  }
  return res.send(pokemon);
});

routerPokemon.post(
  "/",
  validatePokemon,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ erros: errors.array() });
    }
    return await service.createPokemon(res, req.body);
  }
);

routerPokemon.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const pokemon = await pokemonService.findUnique({ where: { id } });
  if (!pokemon) {
    return res.status(404).send("Pokemon not found");
  }
  return res.send(await pokemonService.delete({ where: { id } }));
});

routerPokemon.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, number }: { name: string; number: number } = req.body;
  const pokemon = await pokemonService.findUnique({ where: { id } });
  if (!pokemon) {
    return res.status(404).send("Pokemon not found");
  }
  if (number) {
    const pokemonNumber = await pokemonService.findFirst({ where: { number } });
    if (pokemonNumber) {
      return res.status(400).send("Ya existe un pokemon con ese numero");
    }
  }
  if (name) {
    const pokemonName = await pokemonService.findFirst({ where: { name } });
    if (pokemonName) {
      return res.status(400).send("Ya existe un pokemon con ese nombre");
    }
  }
  return res.send(
    await pokemonService.update({ where: { id }, data: { name, number } })
  );
});

export default routerPokemon;
