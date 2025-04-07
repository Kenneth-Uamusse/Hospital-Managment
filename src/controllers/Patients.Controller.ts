import { Request, Response, NextFunction } from "express";
import { prisma } from "../database";
import CreatePatientRequestSchema from "../schemas";
import { HttpError } from "../errors/HttpError";

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

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patient = await prisma.patients.findUnique({
        where: { id: +req.params.id },
      });

      if (!patient) throw new HttpError(404, "Patient not found");

      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  };
}
