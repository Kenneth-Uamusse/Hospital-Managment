import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import { CreateDoctorRequestSchema } from "../schemas";

export class DoctorsController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctors = await prisma.doctors.findMany();

      if (doctors.length === 0) {
        res.status(404).json({ message: "No doctors found" });
      } else {
        res.status(200).json(doctors);
      }
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctor = await prisma.doctors.findUnique({
        where: { id: +req.params.id },
      });

      if (!doctor) throw new HttpError(404, "Doctor not found");

      res.status(200).json(doctor);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = CreateDoctorRequestSchema.parse(req.body);
      const newDoctor = await prisma.doctors.create({ data: body });

      res.status(201).json(newDoctor);
    } catch (error) {
      next(error);
    }
  };
}
