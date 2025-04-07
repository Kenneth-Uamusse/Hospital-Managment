import { Request, Response, NextFunction } from "express";
import { prisma } from "../database";
import CreatePatientRequestSchema from "../schemas";

export class PatientsController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patients = await prisma.patients.findMany();
      res.status(200).json(patients);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = CreatePatientRequestSchema.parse(req.body);
      const newPatient = await prisma.patients.create({ data: body });

      res.status(201).json(newPatient);
    } catch (error) {
      next(error);
    }
  };
}
