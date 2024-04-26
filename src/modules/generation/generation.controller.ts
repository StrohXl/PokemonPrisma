import { Request, Response, Router } from "express";
import { PrismaClient, Generation } from "@prisma/client";
import createGeneration from "../../validators/createGenerationValidator";
const generationRouter = Router();
const prisma = new PrismaClient();
const Generation = prisma.generation;

generationRouter.get("/", async (req, res) => {
  const query = req.query;
  if (query.include === "pokemon") {
    return res.send(await Generation.findMany({ include: { pokemon: true } }));
  }

  return res.send(await Generation.findMany());
});

generationRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const generation = await Generation.findUnique({ where: { id } });
  if (!generation)
    return res.status(404).json({ error: "Generation not found" });
  return res.send(generation);
});

generationRouter.post(
  "/",
  createGeneration,
  async (req: Request, res: Response) => {
    const body: { name: string } = req.body;
    const generation: Generation | null = await Generation.findUnique({
      where: { name: body.name },
    });
    if (generation) {
      return res
        .status(400)
        .json({ error: "Ya existe una generacion con ese nombre" });
    }
    return res.send(await Generation.create({ data: body }));
  }
);

generationRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const generation = await Generation.findUnique({ where: { id } });
  if (!generation) {
    return res.status(404).send({ error: "Generation not found" });
  }
  return res.send(await Generation.delete({ where: { id } }));
});

generationRouter.put(
  "/:id",
  createGeneration,
  async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const data: { name: string } = req.body;
    const generation: Generation | null = await Generation.findUnique({
      where: { name: data.name },
    });
    if (generation) {
      return res
        .status(400)
        .json({ error: "Ya existe una generacion con ese nombre" });
    }

    return res.send(await Generation.update({ where: { id }, data }));
  }
);

export default generationRouter;
