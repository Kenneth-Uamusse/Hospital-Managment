import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";

export class TreatmentsController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const treatments = await prisma.treatments.findMany();
      if (treatments.length === 0) {
        throw new HttpError(200, "No treatments found");
      } else {
        res.status(200).json(treatments);
      }
    } catch (error) {
      next(error);
    }
  };
}
