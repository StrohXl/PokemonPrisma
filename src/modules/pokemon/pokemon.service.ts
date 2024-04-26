import { PrismaClient } from "@prisma/client";
import { Response } from "express";
const prisma = new PrismaClient();
export class PokemonService {
  async createPokemon(
    res: Response,
    body: {
      name: string;
      number: number;
      types: { id: number }[];
      generation: number;
    }
  ) {
    const { generation, name, number, types } = body;
    const pokemonName = await prisma.pokemon.findFirst({
      where: { name },
    });
    const pokemonNumber = await prisma.pokemon.findFirst({
      where: { number },
    });

    if (pokemonNumber) {
      return res
        .status(400)
        .send({ error: "Ya existe un pokemon con el numero " + number });
    } else if (pokemonName) {
      return res
        .status(400)
        .send({ error: "Ya existe un pokemon con el nombre " + name });
    }

    return res.send(
      await prisma.pokemon.create({
        data: {
          name,
          number,
          type: { connect: types },
          Generation: { connect: { id: generation } },
        },
      })
    );
  }
}
