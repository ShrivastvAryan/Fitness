const { schema, products } = require('../models/schema'); // Corrected import
const { createProductSchema } = require('../validators/productValidators');
const { eq, sql } = require('drizzle-orm');

const createProduct = async (req, res, next) => {
    try {
        const data = createProductSchema.parse(req.body);

        const insertResult = await schema.insert(products).values({
            product_name: data.product_name,
            size: data.size,
            color: data.color,
            offer_price: data.offer_price ?? null,
            original_price: data.original_price,
            description: data.description,
            isAvailable: data.isAvailable ?? true,
        }).returning();

        return res.status(201).json({ data: insertResult[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const rows = await schema.select().from(products).orderBy(products.createdAt.desc());
        res.status(200).json({ data: rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createProduct, getAllProducts };
