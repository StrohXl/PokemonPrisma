import { check, body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
const validatePokemon = [
  check("name").notEmpty().withMessage("El nombre es requerido"),
  check("name").isString().withMessage("El nombre tiene que ser un string"),
  check("number").notEmpty().withMessage("El numero es requerido"),
  check("number")
    .isNumeric()
    .withMessage("El numero tiene que ser un valor numerico"),
  check("types").notEmpty().withMessage("Types es requerido"),
  check("types").isArray().withMessage("Types es de tipo array"),
  check("types")
    .isArray({ min: 1, max: 2 })
    .withMessage("Debe de tener minimo 1 tipo y maximo 2"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const checkError = errors.array().map((error) => error.msg);
      res.status(400).json({ msg: checkError });
      return;
    }
    next();
  },
];
export default validatePokemon;
