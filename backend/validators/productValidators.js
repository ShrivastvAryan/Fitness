const z = require('zod');

const createProductSchema = z.object({
    product_name: z.string().min(1),
    gender:z.string(),
    category:z.string(),
    size: z.array(z.string()),
    color: z.array(z.object()),
    offer_price: z.number().int().nonnegative().optional(),
    original_price: z.number().int().nonnegative(),
    description: z.string(),
    isAvailable: z.boolean().optional(),
    image:z.string()
});

const updateSchema = createProductSchema.partial().extend({
    id: z.number().int(),
});

// Export both schemas
module.exports = { createProductSchema, updateSchema };
