import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
const createGeneration = [
  check("name").notEmpty().withMessage("El nombre es requerido"),
  check("name").isString().withMessage("El nombre debe de ser de tipo string"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const checkErrors = errors.array().map((error) => error.msg);
      res.status(400).json({ msg: checkErrors });
      return;
    }
    next();
  },
];
export default createGeneration;
