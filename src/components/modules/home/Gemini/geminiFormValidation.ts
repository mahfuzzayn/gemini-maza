import z from "zod";

export const geminiFormValidationSchema = z.object({
    question: z.string().min(1, "Question cannot be empty"),
});
