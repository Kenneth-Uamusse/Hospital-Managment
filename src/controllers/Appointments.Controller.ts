import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import { CreateAppointmentRequestSchema } from "../schemas";

export class AppointmentsController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const appointments = await prisma.appointments.findMany();
      if (appointments.length === 0) {
        throw new HttpError(404, "No appointments found");
      } else {
        res.status(200).json(appointments);
      }
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
}
