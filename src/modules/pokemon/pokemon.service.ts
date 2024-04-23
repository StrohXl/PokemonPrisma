import { PrismaClient } from "@prisma/client";
import { Response } from "express";
const prisma = new PrismaClient();
export class PokemonService {
  async createPokemon(res: Response, body: any) {
    const pokemonName = await prisma.pokemon.findFirst({
      where: { name: body.name },
    });
    const pokemonNumber = await prisma.pokemon.findFirst({
      where: { number: body.number },
    });

    if (pokemonNumber) {
      return res
        .status(400)
        .send({ error: "Ya existe un pokemon con el numero " + body.number });
    } else if (pokemonName) {
      return res
        .status(400)
        .send({ error: "Ya existe un pokemon con el nombre " + body.name });
    }
    const types: { id: number }[] = body.types;

    return res.send(
      await prisma.pokemon.create({
        data: {
          name: body.name,
          number: body.number,
          type: { connect: types },
        },
      })
    );
  }
}
