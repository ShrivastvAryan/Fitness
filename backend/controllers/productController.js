const { product } = require('../models/schema'); // Corrected import
const {db} =require('../models/db')
const { createProductSchema } = require('../validators/productValidators');
const { eq, sql } = require('drizzle-orm');

const createProduct = async (req, res, next) => {
    try {
        const data = createProductSchema.parse(req.body);

        const insertResult = await db.insert(product).values({
            product_name: data.product_name,
            size: data.size,
            color: data.color,
            gender:data.gender,
            category:data.category,
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
        const rows = await db.select().from(product);
        res.status(200).json({ data: rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getProductById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const rows = await db
            .select()
            .from(product)
            .where(eq(product.id, Number(id))); 

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ data: rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getProductByGender=async(req,res,next)=>{
    const {gender}=req.params

    try {
        const rows=await db.
        select().
        from(product).
        where(eq(product.gender, gender));

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ data: rows });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getProductByCategory=async(req,res,next)=>{
    const {category}=req.params

    try {
        const rows=await db.
        select().
        from(product).
        where(eq(product.category, category));

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ data: rows });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteProductById = async (req, res, next) => {
    const { id } = req.params;
    const productId = Number(id);

    if (isNaN(productId)) {
        return res.status(400).json({ error: "Invalid product id" });
    }

    try {
       
        const deleted = await db
            .delete(product)
            .where(eq(product.id, productId))
            .returning();

        if (deleted.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", data: deleted[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createProduct, getAllProducts,getProductById,getProductByGender,getProductByCategory,deleteProductById };
