import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import { CreateTreatmentRequestSchema } from "../schemas";

export class TreatmentsController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const treatments = await prisma.treatments.findMany({
        include: { appointment: true },
      });
      if (treatments.length === 0) {
        throw new HttpError(200, "No treatments found");
      } else {
        res.status(200).json(treatments);
      }
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const treatment = await prisma.treatments.findUnique({
        where: { id: Number(req.params.id) },
        include: {
          appointment: {
            include: {
              doctor: { select: { name: true, specialization: true } },
              patient: { select: { name: true, phone: true, gender: true } },
            },
          },
        },
      });

      if (!treatment) throw new HttpError(404, "Treatment not found");

      res.status(200).json(treatment);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = CreateTreatmentRequestSchema.parse(req.body);
      const newTreatment = await prisma.treatments.create({
        data: {
          pills: body.pills,
          description: body.description,
          appointment: { connect: { id: body.appointment_id } },
        },
      });

      res.status(201).json(newTreatment);
    } catch (error) {
      next(error);
    }
  };
}
