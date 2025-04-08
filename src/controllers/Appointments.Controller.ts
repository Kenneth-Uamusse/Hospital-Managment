import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import {
  CreateAppointmentRequestSchema,
  UpdateAppointmentRequestSchema,
} from "../schemas";
import { Prisma } from "@prisma/client";

export class AppointmentsController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const appointments = await prisma.appointments.findMany({
        include: {
          doctor: { select: { name: true } },
          patient: { select: { name: true } },
        },
      });
      
      if (appointments.length === 0) {
        throw new HttpError(404, "No appointments found");
      } else {
        res.status(200).json(appointments);
      }
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const appointment = await prisma.appointments.findUnique({
        where: { id: +req.params.id },
        include: { doctor: true, patient: true },
      });

      if (!appointment) throw new HttpError(404, "Appointment not found");

      res.status(200).json(appointment);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = CreateAppointmentRequestSchema.parse(req.body);
      const appointment = await prisma.appointments.create({
        data: {
          type: body.type,
          observation: body.observation,
          date: body.date,
          patient: { connect: { id: body.patient_id } },
          doctor: { connect: { id: body.doctor_id } },
        },
      });

      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = UpdateAppointmentRequestSchema.parse(req.body);
      const appointment = await prisma.appointments.update({
        where: { id: +req.params.id },
        data: body,
      });

      res.status(200).json(appointment);
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
}
