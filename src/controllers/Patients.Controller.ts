import { Request, Response, NextFunction } from "express";
import { prisma } from "../database";

export class PatientsController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patients = await prisma.patients.findMany();
      res.status(200).json(patients);
    } catch (error) {
      next(error);
    }
  };
}

