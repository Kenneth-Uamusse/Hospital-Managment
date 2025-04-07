import z from "zod";

const CreatePatientRequestSchema = z.object({
  name: z.string(),
  birthday: z.string(),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string(),
});

export default CreatePatientRequestSchema;
