import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";
import c1 from "@/assets/c1.jpg";
import c2 from "@/assets/c2.jpg";
import c3 from "@/assets/c3.jpg";
import c4 from "@/assets/c4.jpg";
import c5 from "@/assets/c5.jpg";
import c6 from "@/assets/c6.jpg";

export type Product = {
  id: number;
  name: string;
  category: string;
  rating: number;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  gallery: string[];
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Pro Earbuds",
    category: "Earbuds",
    rating: 4.8,
    price: 7999,
    oldPrice: 9999,
    discount: 20,
    image: p1,
    gallery: [p1, c1, p8],
    description:
      "True wireless earbuds with active noise cancellation, crystal-clear calls and up to 30 hours of playtime with the charging case.",
  },
  {
    id: 2,
    name: "Smart Watch Series 9",
    category: "Smart Watches",
    rating: 4.7,
    price: 12499,
    oldPrice: 15999,
    discount: 22,
    image: p2,
    gallery: [p2, c2, p7],
    description:
      "A bright always-on display, heart-rate and sleep tracking, plus smart notifications right on your wrist.",
  },
  {
    id: 3,
    name: "Premium Bluetooth Speaker",
    category: "Speakers",
    rating: 4.6,
    price: 8499,
    oldPrice: 10999,
    discount: 23,
    image: p3,
    gallery: [p3, c4, p8],
    description:
      "Room-filling 360° sound with deep bass, water resistance and 20 hours of battery for every gathering.",
  },
  {
    id: 4,
    name: "Wireless Gaming Headset",
    category: "Headphones",
    rating: 4.9,
    price: 13999,
    oldPrice: 17999,
    discount: 22,
    image: p4,
    gallery: [p4, c3, p3],
    description:
      "Low-latency wireless audio, memory-foam ear cushions and a noise-cancelling boom mic built for long sessions.",
  },
  {
    id: 5,
    name: "Fast USB-C Charger",
    category: "Mobile Accessories",
    rating: 4.5,
    price: 2499,
    image: p5,
    gallery: [p5, c6, p6],
    description:
      "Compact 65W GaN charger that powers your phone, tablet and laptop at full speed with built-in safety protection.",
  },
  {
    id: 6,
    name: "Magnetic Power Bank",
    category: "Power Banks",
    rating: 4.6,
    price: 5999,
    oldPrice: 7499,
    discount: 20,
    image: p6,
    gallery: [p6, c5, p5],
    description:
      "Slim 10,000mAh magnetic power bank that snaps onto your phone and charges wirelessly on the go.",
  },
  {
    id: 7,
    name: "Smart Fitness Watch",
    category: "Smart Watches",
    rating: 4.4,
    price: 6499,
    oldPrice: 8499,
    discount: 24,
    image: p7,
    gallery: [p7, c2, p2],
    description:
      "Track workouts, steps, SpO2 and sleep with a lightweight design and 10-day battery life.",
  },
  {
    id: 8,
    name: "Portable Mini Speaker",
    category: "Speakers",
    rating: 4.3,
    price: 3499,
    oldPrice: 4499,
    discount: 22,
    image: p8,
    gallery: [p8, c4, p3],
    description:
      "Pocket-sized speaker with surprisingly big sound, built-in mic and all-day battery for travel.",
  },

  {
    id: 9,
    name: "Ultra HD 4K TV",
    category: "TVs",
    rating: 4.7,
    price: 54999,
    oldPrice: 59999,
    discount: 8,
    image: p1,
    gallery: [p1, c1, p8],
    description: "Stunning 55-inch 4K Ultra HD TV with vibrant colors and smart features.",
  },
  {
    id: 10,
    name: "Gaming Laptop Pro",
    category: "Laptops",
    rating: 4.8,
    price: 129999,
    oldPrice: 149999,
    discount: 13,
    image: p2,
    gallery: [p2, c2, p7],
    description: "High-performance gaming laptop with RTX graphics and fast SSD.",
  },
  {
    id: 11,
    name: "Wireless Charger Pad",
    category: "Mobile Accessories",
    rating: 4.5,
    price: 1999,
    image: p5,
    gallery: [p5, c6, p6],
    description: "Sleek wireless charging pad compatible with all Qi devices.",
  },
  {
    id: 12,
    name: "Bluetooth Noise Cancelling Earbuds",
    category: "Earbuds",
    rating: 4.9,
    price: 8999,
    oldPrice: 10999,
    discount: 18,
    image: p3,
    gallery: [p3, c4, p8],
    description: "Compact earbuds with active noise cancellation and long battery life.",
  },
];

export const categories = [
  { name: "Earbuds", image: c1, count: "24 products" },
  { name: "Smart Watches", image: c2, count: "18 products" },
  { name: "Headphones", image: c3, count: "21 products" },
  { name: "Speakers", image: c4, count: "16 products" },
  { name: "Power Banks", image: c5, count: "12 products" },
  { name: "Mobile Accessories", image: c6, count: "40 products" },
];

export const formatPrice = (value: number) => `Rs. ${value.toLocaleString("en-US")}`;
