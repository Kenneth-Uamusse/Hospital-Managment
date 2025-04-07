import z from "zod";

const CreatePatientRequestSchema = {
  name: z.string(),
  birthDate: z.string(),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string(),
};

export default CreatePatientRequestSchema;
