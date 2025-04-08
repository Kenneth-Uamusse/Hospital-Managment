import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";

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
}
