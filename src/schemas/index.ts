import z from "zod";

const AppointmentType = z.enum(["Plano_de_Saude", "Particular"]);

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
  specialization: z.string(),
});

const UpdateDoctorRequestSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  specialization: z.string().optional(),
});

const CreateAppointmentRequestSchema = z.object({
  type: AppointmentType,
  observation: z.string(),
  date: z.coerce.date(),
  patient_id: z.number(),
  doctor_id: z.number(),
});

const UpdateAppointmentRequestSchema = z.object({
  type: AppointmentType.optional(),
  observation: z.string().optional(),
  date: z.coerce.date().optional(),
  patient_id: z.number().optional(),
  doctor_id: z.number().optional(),
});

const CreateTreatmentRequestSchema = z.object({
  pills: z.string(),
  description: z.string(),
  appointment_id: z.number(),
});

const UpdateTreatmentRequestSchema = z.object({
  pills: z.string().optional(),
  description: z.string().optional(),
  appointment_id: z.number().optional(),
});

export {
  CreatePatientRequestSchema,
  UpdatePatientRequestSchema,
  CreateDoctorRequestSchema,
  UpdateDoctorRequestSchema,
  CreateAppointmentRequestSchema,
  UpdateAppointmentRequestSchema,
  CreateTreatmentRequestSchema,
  UpdateTreatmentRequestSchema,
};
