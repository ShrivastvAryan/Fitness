const { z } = require("zod");

const userSchema = z.object({
  id: z.number().int().optional(), // serial auto-incremented
  created_at: z.string().datetime().optional(), // handled by DB
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z
    .number()
    .int()
    .refine((val) => val.toString().length === 10, "Phone number must be 10 digits"),
  address: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  pincode: z.number().int().optional(),
  location: z.string().optional(),
});

module.exports = userSchema;
