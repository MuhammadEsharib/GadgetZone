import { ProductModel } from "../models/Product.js";

export const initialProductCatalog = [
  {
    id: 1,
    name: "Wireless Pro Earbuds",
    category: "Earbuds",
    rating: 4.8,
    price: 7999,
    oldPrice: 9999,
    discount: 20,
    image: "/assets/p1.jpg",
    gallery: ["/assets/p1.jpg", "/assets/c1.jpg", "/assets/p8.jpg"],
    description:
      "True wireless earbuds with active noise cancellation, crystal-clear calls and up to 30 hours of playtime with the charging case.",
    inStock: true,
    stockCount: 50,
    featured: true,
  },
  {
    id: 2,
    name: "Smart Watch Series 9",
    category: "Smart Watches",
    rating: 4.7,
    price: 12499,
    oldPrice: 15999,
    discount: 22,
    image: "/assets/p2.jpg",
    gallery: ["/assets/p2.jpg", "/assets/c2.jpg", "/assets/p7.jpg"],
    description:
      "A bright always-on display, heart-rate and sleep tracking, plus smart notifications right on your wrist.",
    inStock: true,
    stockCount: 40,
    featured: true,
  },
  {
    id: 3,
    name: "Premium Bluetooth Speaker",
    category: "Speakers",
    rating: 4.6,
    price: 8499,
    oldPrice: 10999,
    discount: 23,
    image: "/assets/p3.jpg",
    gallery: ["/assets/p3.jpg", "/assets/c4.jpg", "/assets/p8.jpg"],
    description:
      "Room-filling 360° sound with deep bass, water resistance and 20 hours of battery for every gathering.",
    inStock: true,
    stockCount: 35,
    featured: true,
  },
  {
    id: 4,
    name: "Wireless Gaming Headset",
    category: "Headphones",
    rating: 4.9,
    price: 13999,
    oldPrice: 17999,
    discount: 22,
    image: "/assets/p4.jpg",
    gallery: ["/assets/p4.jpg", "/assets/c3.jpg", "/assets/p3.jpg"],
    description:
      "Low-latency wireless audio, memory-foam ear cushions and a noise-cancelling boom mic built for long sessions.",
    inStock: true,
    stockCount: 30,
    featured: true,
  },
  {
    id: 5,
    name: "Fast USB-C Charger",
    category: "Mobile Accessories",
    rating: 4.5,
    price: 2499,
    oldPrice: 3200,
    discount: 22,
    image: "/assets/p5.jpg",
    gallery: ["/assets/p5.jpg", "/assets/c6.jpg", "/assets/p6.jpg"],
    description:
      "Compact 65W GaN charger that powers your phone, tablet and laptop at full speed with built-in safety protection.",
    inStock: true,
    stockCount: 80,
    featured: true,
  },
  {
    id: 6,
    name: "Magnetic Power Bank",
    category: "Power Banks",
    rating: 4.6,
    price: 5999,
    oldPrice: 7499,
    discount: 20,
    image: "/assets/p6.jpg",
    gallery: ["/assets/p6.jpg", "/assets/c5.jpg", "/assets/p5.jpg"],
    description:
      "Slim 10,000mAh magnetic power bank that snaps onto your phone and charges wirelessly on the go.",
    inStock: true,
    stockCount: 45,
    featured: true,
  },
  {
    id: 7,
    name: "Smart Fitness Watch",
    category: "Smart Watches",
    rating: 4.4,
    price: 6499,
    oldPrice: 8499,
    discount: 24,
    image: "/assets/p7.jpg",
    gallery: ["/assets/p7.jpg", "/assets/c2.jpg", "/assets/p2.jpg"],
    description:
      "Track workouts, steps, SpO2 and sleep with a lightweight design and 10-day battery life.",
    inStock: true,
    stockCount: 60,
    featured: true,
  },
  {
    id: 8,
    name: "Portable Mini Speaker",
    category: "Speakers",
    rating: 4.3,
    price: 3499,
    oldPrice: 4499,
    discount: 22,
    image: "/assets/p8.jpg",
    gallery: ["/assets/p8.jpg", "/assets/c4.jpg", "/assets/p3.jpg"],
    description:
      "Pocket-sized speaker with surprisingly big sound, built-in mic and all-day battery for travel.",
    inStock: true,
    stockCount: 70,
    featured: true,
  },
];

export async function seedProducts() {
  try {
    const count = await ProductModel.countDocuments();
    if (count === 0) {
      await ProductModel.insertMany(initialProductCatalog);
      console.log(`🌱 [DB Seeder] Seeded ${initialProductCatalog.length} products to MongoDB Atlas.`);
      return { seeded: true, count: initialProductCatalog.length };
    }
    return { seeded: false, count };
  } catch (err) {
    console.error("❌ [DB Seeder] Error seeding products:", err);
    return { seeded: false, count: 0, error: (err as Error).message };
  }
}
