import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";

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
}
