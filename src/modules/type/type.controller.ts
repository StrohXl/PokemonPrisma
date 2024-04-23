import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const typeRouter = Router();
const prisma = new PrismaClient();
typeRouter.get("/", async (req, res) => {
  res.send(await prisma.type.findMany({ include: { pokemon: true } }));
});
typeRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const type = await prisma.type.findUnique({ where: { id } });
  if (!type) return res.status(404).json({ error: "Type not found" });
  return type;
});
typeRouter.post("/", async (req, res) => {
  const body = req.body;
  const type = await prisma.type.findFirst({ where: { name: req.body.name } });
  if (type) {
    return res.status(400).json({ error: "Ya existe un tipo con ese nombre" });
  }
  return res.send(await prisma.type.create({ data: body }));
});
export default typeRouter;
