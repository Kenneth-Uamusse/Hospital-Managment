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

export { CreatePatientRequestSchema, UpdatePatientRequestSchema };
