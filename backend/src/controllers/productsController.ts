import { Request, Response } from "express";
import { ProductModel } from "../models/Product.js";
import { seedProducts } from "../utils/seeder.js";

/**
 * GET /api/products - Get all products (with auto-seeding)
 */
export async function getProducts(_req: Request, res: Response): Promise<void> {
  try {
    let products = await ProductModel.find().sort({ id: 1 }).lean();

    if (!products || products.length === 0) {
      await seedProducts();
      products = await ProductModel.find().sort({ id: 1 }).lean();
    }

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("❌ [Get Products Error]:", error);
    res.status(500).json({ error: "Failed to retrieve products." });
  }
}

/**
 * POST /api/products - Add a new product (Admin)
 */
export async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    const {
      name,
      category,
      price,
      oldPrice,
      description,
      image,
      gallery,
      stockCount = 50,
      inStock = true,
      featured = true,
      isDeal = false,
      isDealOfTheDay = false,
      dealTag,
      dealExpiry,
      adminPasscode,
    } = req.body;

    if (adminPasscode && adminPasscode !== "admin123" && adminPasscode !== "gadget2026" && adminPasscode !== "03420024369") {
      res.status(401).json({ error: "Unauthorized. Invalid admin passcode." });
      return;
    }

    if (!name || !price || !category) {
      res.status(400).json({ error: "Product name, category, and price are required." });
      return;
    }

    const highest = await ProductModel.findOne().sort({ id: -1 }).lean();
    const nextId = (highest?.id || 12) + 1;

    const discount =
      oldPrice && Number(oldPrice) > Number(price)
        ? Math.round(((Number(oldPrice) - Number(price)) / Number(oldPrice)) * 100)
        : undefined;

    const primaryImage = image?.trim() || (Array.isArray(gallery) && gallery[0]) || "/assets/p1.jpg";
    const productGallery = Array.isArray(gallery) && gallery.length > 0 ? gallery : [primaryImage];

    // If marked as Deal of the Day, unset previous Deal of the Day
    if (isDealOfTheDay) {
      await ProductModel.updateMany({}, { $set: { isDealOfTheDay: false } });
    }

    const newProduct = await ProductModel.create({
      id: nextId,
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      discount,
      description: description?.trim() || "Authentic high-grade gadget with 7-day checking warranty.",
      image: primaryImage,
      gallery: productGallery,
      stockCount: Number(stockCount) || 50,
      inStock: Boolean(inStock !== undefined ? inStock : true),
      rating: 5.0,
      featured: Boolean(featured !== undefined ? featured : true),
      isDeal: Boolean(isDeal || (discount && discount > 0)),
      isDealOfTheDay: Boolean(isDealOfTheDay),
      dealTag: dealTag ? dealTag.trim() : undefined,
      dealExpiry: dealExpiry ? dealExpiry.trim() : undefined,
    });

    res.status(201).json({
      success: true,
      product: newProduct,
      message: `Product "${name}" added with ID #${nextId}.`,
    });
  } catch (error) {
    console.error("❌ [Create Product Error]:", error);
    res.status(500).json({ error: "Failed to create product." });
  }
}

/**
 * DELETE /api/products/:id - Remove product by ID (Admin)
 */
export async function deleteProduct(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const numericId = Number(id);
    const isMongoId = typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

    const deleted = await ProductModel.findOneAndDelete({
      $or: [{ id: numericId }, { _id: isMongoId ? id : null }],
    });

    if (!deleted) {
      res.status(404).json({ error: "Product not found." });
      return;
    }

    res.json({
      success: true,
      message: `Product #${id} removed from catalog.`,
      product: deleted,
    });
  } catch (error) {
    console.error("❌ [Delete Product Error]:", error);
    res.status(500).json({ error: "Failed to delete product." });
  }
}

/**
 * PATCH /api/products/:id - Update product by ID (Admin)
 */
export async function updateProduct(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const numericId = Number(id);
    const isMongoId = typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);
    const {
      name,
      category,
      price,
      oldPrice,
      description,
      image,
      gallery,
      stockCount,
      inStock,
      featured,
      rating,
      isDeal,
      isDealOfTheDay,
      dealTag,
      dealExpiry,
      adminPasscode,
    } = req.body;

    if (adminPasscode && adminPasscode !== "admin123" && adminPasscode !== "gadget2026" && adminPasscode !== "03420024369") {
      res.status(401).json({ error: "Unauthorized. Invalid admin passcode." });
      return;
    }

    const updateFields: any = {};
    if (name !== undefined) updateFields.name = name.trim();
    if (category !== undefined) updateFields.category = category.trim();
    if (price !== undefined) updateFields.price = Number(price);
    if (oldPrice !== undefined) {
      const p = price !== undefined ? Number(price) : undefined;
      updateFields.oldPrice = oldPrice ? Number(oldPrice) : undefined;
      if (p && oldPrice && Number(oldPrice) > p) {
        updateFields.discount = Math.round(((Number(oldPrice) - p) / Number(oldPrice)) * 100);
      } else {
        updateFields.discount = undefined;
      }
    }
    if (description !== undefined) updateFields.description = description.trim();
    if (image !== undefined && image.trim()) updateFields.image = image.trim();
    if (gallery !== undefined && Array.isArray(gallery) && gallery.length > 0) updateFields.gallery = gallery;
    if (stockCount !== undefined) updateFields.stockCount = Number(stockCount);
    if (inStock !== undefined) updateFields.inStock = Boolean(inStock);
    if (featured !== undefined) updateFields.featured = Boolean(featured);
    if (rating !== undefined) updateFields.rating = Number(rating);
    if (isDeal !== undefined) updateFields.isDeal = Boolean(isDeal);
    if (dealTag !== undefined) updateFields.dealTag = dealTag ? dealTag.trim() : undefined;
    if (dealExpiry !== undefined) updateFields.dealExpiry = dealExpiry ? dealExpiry.trim() : undefined;

    if (isDealOfTheDay !== undefined) {
      updateFields.isDealOfTheDay = Boolean(isDealOfTheDay);
      if (isDealOfTheDay) {
        // Unset other products from being Deal of the Day
        await ProductModel.updateMany(
          { id: { $ne: numericId } },
          { $set: { isDealOfTheDay: false } }
        );
        updateFields.isDeal = true;
      }
    }

    const updated = await ProductModel.findOneAndUpdate(
      { $or: [{ id: numericId }, { _id: isMongoId ? id : null }] },
      { $set: updateFields },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ error: "Product not found." });
      return;
    }

    res.json({
      success: true,
      product: updated,
      message: `Product "${updated.name}" updated successfully.`,
    });
  } catch (error) {
    console.error("❌ [Update Product Error]:", error);
    res.status(500).json({ error: "Failed to update product." });
  }
}

/**
 * POST /api/products/seed - Trigger database re-seed
 */
export async function triggerSeed(_req: Request, res: Response): Promise<void> {
  try {
    const result = await seedProducts();
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ error: "Seed operation failed." });
  }
}
