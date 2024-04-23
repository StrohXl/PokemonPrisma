import { NextFunction } from "express";
import { validationResult } from "express-validator";
const validateResult = (req: any, res: any, next: NextFunction) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(403);
    res.send({ errors: error });
  }
};
export default validateResult;
