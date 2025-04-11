import { Request, Response, NextFunction } from "express";
import { prisma } from "../database";
import {
  CreatePatientRequestSchema,
  UpdatePatientRequestSchema,
} from "../schemas";
import { HttpError } from "../errors/HttpError";
import { Prisma } from "@prisma/client";

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

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = UpdatePatientRequestSchema.parse(req.body);

      const patient = await prisma.patients.update({
        where: { id: +req.params.id },
        data: body,
      });

      res.status(200).json(patient);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return next(new HttpError(404, "Patient not found"));
      }

      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.patients.delete({ where: { id: +req.params.id } });

      res.status(200).json({ message: "Patient deleted succesfully!" });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return next(new HttpError(404, "Patient not found"));
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
      const patient = await prisma.patients.findUnique({
        where: { id: +req.params.id },
        include: { appointments: { include: { doctor: true } } },
      });

      if (!patient) throw new HttpError(404, "Patient not found!!");

      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  };

  showAppointmentsByDoctorSpecialization = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const patient = await prisma.patients.findUnique({
        where: { id: +req.params.id },
        include: {
          appointments: {
            include: { doctor: true, patient: { select: { name: true } } },
          },
        },
      });

      if (!patient) throw new HttpError(404, "Patient not found!!");

      const appointments = patient.appointments.filter(
        (appointment) =>
          appointment.doctor.specialization === req.query.specialization
      );

      if (appointments.length === 0) {
        throw new HttpError(
          404,
          "No appointments found for this doctors's specialization"
        );
      }

      res.status(200).json(appointments);
    } catch (error) {
      next(error);
    }
  };
}
