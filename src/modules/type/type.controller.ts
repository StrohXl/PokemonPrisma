import { Request, Response, Router } from "express";
import { PrismaClient, Type } from "@prisma/client";
import createType from "../../validators/createTypeValidator";
const typeRouter = Router();
const prisma = new PrismaClient();
const typeService = prisma.type;

typeRouter.get("/", async (req, res) => {
  const query = req.query;
  if (query.include === "pokemon") {
    return res.send(await typeService.findMany({ include: { pokemon: true } }));
  }

  return res.send(await prisma.type.findMany());
});

typeRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const type = await prisma.type.findUnique({ where: { id } });
  if (!type) return res.status(404).json({ error: "Type not found" });
  return res.send(type);
});

typeRouter.post("/", createType, async (req: Request, res: Response) => {
  const body = req.body;
  const type = await prisma.type.findFirst({ where: { name: req.body.name } });
  if (type) {
    return res.status(400).json({ error: "Ya existe un tipo con ese nombre" });
  }
  return res.send(await prisma.type.create({ data: body }));
});

typeRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const type = await typeService.findUnique({ where: { id } });
  if (!type) {
    return res.status(404).send({ error: "Type not found" });
  }
  return res.send(await typeService.delete({ where: { id } }));
});
typeRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const data: { name: string } = req.body;
  const type: Type | null = await typeService.findUnique({
    where: { name: data.name },
  });
  if (type) {
    return res.status(400).json({ error: "Ya existe un tipo con ese nombre" });
  }

  return res.send(await typeService.update({ where: { id }, data }));
});
export default typeRouter;
