import z from "zod";

const CreatePatientRequestSchema = z.object({
  name: z.string(),
  birthday: z.string(),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string(),
});

const UpdatePatientRequestSchema = z.object({
  name: z.string().optional(),
  birthday: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  phone: z.string().optional(),
});

const CreateDoctorRequestSchema = z.object({
  name: z.string(),
  phone: z.string(),
  specializaton: z.string(),
});

const UpdateDoctorRequestSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  specializaton: z.string().optional(),
});

export {
  CreatePatientRequestSchema,
  UpdatePatientRequestSchema,
  CreateDoctorRequestSchema,
  UpdateDoctorRequestSchema,
};
