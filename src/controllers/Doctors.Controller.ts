import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import {
  CreateDoctorRequestSchema,
  UpdateDoctorRequestSchema,
} from "../schemas";
import { Prisma } from "@prisma/client";

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

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = UpdateDoctorRequestSchema.parse(req.body);
      const doctor = await prisma.doctors.update({
        where: { id: +req.params.id },
        data: body,
      });

      res.status(200).json(doctor);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return next(new HttpError(404, "Doctor not found"));
      }
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.doctors.delete({ where: { id: +req.params.id } });
      res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return next(new HttpError(404, "Doctor not found"));
      }
      next(error);
    }
  };

  showAppointments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const doctor = await prisma.doctors.findFirst({
        where: {
          name: { contains: req.query.name as string, mode: "insensitive" },
        },
        include: {
          appointments: { select: { observation: true, patient: true } },
        },
      });

      if (!doctor) throw new HttpError(404, "Doctor not found");

      res.status(200).json(doctor);
    } catch (error) {
      next(error);
    }
  };
}
