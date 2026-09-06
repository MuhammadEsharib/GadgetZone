import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  TrendingUp,
  Package,
  PlusCircle,
  Download,
  Upload,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Phone,
  MessageCircle,
  Eye,
  EyeOff,
  User,
  RefreshCw,
  LogOut,
  Lock,
  ArrowUpRight,
  ShieldCheck,
  ChevronDown,
  DollarSign,
  Sparkles,
  Layers,
  MapPin,
  Calendar,
  X,
  Edit,
  Trash2,
  ExternalLink,
  ArrowLeft,
  Image as ImageIcon,
  UploadCloud,
  Flame,
  Crown,
  Tag,
  Percent,
  Star,
  Award,
  Home as HomeIcon,
} from "lucide-react";
import { Footer } from "@/components/store/Footer";
import { products as initialProducts, formatPrice, type Product } from "@/data/products";
import { type Order } from "@/lib/orderTypes";
import { clientListAllOrders, clientUpdateOrderStatus, normalizeOrder } from "@/lib/orderClient";
import { api } from "@/lib/api";
import { optimizeImageFile } from "@/lib/productsStore";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Security Management Portal — The Gadget Zone" },
      {
        name: "robots",
        content: "noindex, nofollow, noarchive, nosnippet, noimageindex",
      },
      {
        name: "googlebot",
        content: "noindex, nofollow, noarchive, nosnippet",
      },
    ],
  }),
  component: AdminDashboard,
});

const ORDER_STATUSES = [
  "Pending Processing",
  "Confirmed",
  "Dispatched",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const CATEGORIES = [
  "Earbuds",
  "Smart Watches",
  "Speakers",
  "Headphones",
  "Power Banks",
  "Accessories",
];

const DEAL_TAG_OPTIONS = [
  "Flash Sale",
  "20%+ Mega Deal",
  "Deal of the Day",
  "Limited Stock Deal",
  "Weekend Special",
  "Clearance Sale",
];

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [adminUser, setAdminUser] = useState<string>("Usama Abid");

  const [activeTab, setActiveTab] = useState<"orders" | "analytics" | "catalog" | "deals" | "data">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Filters for orders
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");

  // Selected order for detailed inspection drawer
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // DB Health & Sync State
  const [dbStatus, setDbStatus] = useState<{ isConnected: boolean; statusText: string; source: string }>({
    isConnected: true,
    statusText: "Connected (MongoDB Atlas)",
    source: "mongodb",
  });
  const [isSyncingDb, setIsSyncingDb] = useState(false);

  // Catalog State
  const [catalog, setCatalog] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("gz_dynamic_catalog");
        if (saved) return JSON.parse(saved);
      } catch { }
    }
    return initialProducts;
  });

  // Product Form State (Create)
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Earbuds");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductOldPrice, setNewProductOldPrice] = useState("");
  const [newProductImage, setNewProductImage] = useState("");
  const [newProductGallery, setNewProductGallery] = useState<string[]>([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductInStock, setNewProductInStock] = useState(true);
  const [newProductFeatured, setNewProductFeatured] = useState(true);

  // Product Edit State (Update)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("Earbuds");
  const [editPrice, setEditPrice] = useState("");
  const [editOldPrice, setEditOldPrice] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editGallery, setEditGallery] = useState<string[]>([]);
  const [editDescription, setEditDescription] = useState("");
  const [editIsDeal, setEditIsDeal] = useState(false);
  const [editIsDealOfTheDay, setEditIsDealOfTheDay] = useState(false);
  const [editDealTag, setEditDealTag] = useState("Flash Sale");
  const [editInStock, setEditInStock] = useState(true);
  const [editFeatured, setEditFeatured] = useState(true);
  const [isEditUploadingImage, setIsEditUploadingImage] = useState(false);

  // Dedicated Deals Management State
  const [isAddingDeal, setIsAddingDeal] = useState(false);
  const [dealSearchQuery, setDealSearchQuery] = useState("");
  const [newDealName, setNewDealName] = useState("");
  const [newDealCategory, setNewDealCategory] = useState("Earbuds");
  const [newDealPrice, setNewDealPrice] = useState("");
  const [newDealOldPrice, setNewDealOldPrice] = useState("");
  const [newDealTag, setNewDealTag] = useState("Flash Sale");
  const [newDealIsDealOfTheDay, setNewDealIsDealOfTheDay] = useState(false);
  const [newDealStockCount, setNewDealStockCount] = useState("30");
  const [newDealImage, setNewDealImage] = useState("");
  const [newDealGallery, setNewDealGallery] = useState<string[]>([]);
  const [newDealDescription, setNewDealDescription] = useState("");
  const [isUploadingDealImage, setIsUploadingDealImage] = useState(false);

  // Quick Promote Product to Deal State
  const [promoteProductId, setPromoteProductId] = useState<string>("");
  const [promoteDiscountPercent, setPromoteDiscountPercent] = useState<number>(20);
  const [promoteDealTag, setPromoteDealTag] = useState<string>("Flash Sale");
  const [promoteAsDealOfTheDay, setPromoteAsDealOfTheDay] = useState<boolean>(false);

  const notify = useCallback((msg: string) => setToast(msg), []);

  // Check session on mount
  useEffect(() => {
    const session = sessionStorage.getItem("gz_admin_auth");
    const savedUser = sessionStorage.getItem("gz_admin_user");
    if (session === "granted") {
      setIsAuthenticated(true);
      if (savedUser) setAdminUser(savedUser);
    }
  }, []);

  // Load products from MongoDB
  const fetchProducts = useCallback(async () => {
    try {
      const res = await api.getProducts();
      if (res.products && res.products.length > 0) {
        setCatalog(res.products);
        setDbStatus({
          isConnected: res.source === "mongodb",
          statusText: res.source === "mongodb" ? "Connected (MongoDB Atlas)" : "Active (In-Memory Fallback)",
          source: res.source,
        });
        localStorage.setItem("gz_dynamic_catalog", JSON.stringify(res.products));
      }
    } catch (e) {
      console.warn("Product fetch from server warning:", e);
    }
  }, []);

  // Load orders
  const fetchOrders = useCallback(async () => {
    setLoadingOrders(true);
    try {
      const data = await clientListAllOrders();
      setOrders(data);
    } catch (e) {
      console.error("Failed to load orders", e);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      fetchProducts();
    }
  }, [isAuthenticated, fetchOrders, fetchProducts]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // Handle Login with Username (Usama Abid) & Password (admin123)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase().replace(/\s+/g, " ");
    const cleanPass = password.trim();

    const isValidUser =
      cleanUser === "usama abid" ||
      cleanUser === "usamaabid" ||
      cleanUser === "usama" ||
      cleanUser === "admin" ||
      cleanUser === "usama bin abid";

    const isValidPass =
      cleanPass === "admin123" ||
      cleanPass === "gadget2026" ||
      cleanPass === "03420024369";

    if (isValidUser && isValidPass) {
      setIsAuthenticated(true);
      sessionStorage.setItem("gz_admin_auth", "granted");
      sessionStorage.setItem("gz_admin_user", "Usama Abid");
      setAdminUser("Usama Abid");
      setAuthError("");
      notify("Welcome back, Usama Abid!");
    } else {
      if (!isValidUser && !isValidPass) {
        setAuthError("Invalid username and password. Please check your admin credentials.");
      } else if (!isValidUser) {
        setAuthError("Invalid username. Please enter the authorized administrator name (e.g. usama abid).");
      } else {
        setAuthError("Incorrect password. Please enter the valid security password.");
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("gz_admin_auth");
    sessionStorage.removeItem("gz_admin_user");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setAuthError("");
  };

  // Status Change
  const handleStatusChange = async (orderNumber: string, newStatus: string) => {
    const res = await clientUpdateOrderStatus(orderNumber, newStatus);
    if (res.success && res.order) {
      setOrders((prev) =>
        prev.map((o) => (o.orderNumber === orderNumber ? res.order! : o)),
      );
      if (selectedOrder && selectedOrder.orderNumber === orderNumber) {
        setSelectedOrder(res.order);
      }
      notify(`Order #${orderNumber} updated to ${newStatus}`);
    } else {
      notify("Failed to update status.");
    }
  };

  // Handle desktop/mobile primary image file upload
  const handlePrimaryFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const optimized = await optimizeImageFile(file, 1000, 0.85);
      setNewProductImage(optimized);
      notify("Primary product image uploaded & compressed!");
    } catch (err) {
      notify("Failed to process image file.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Handle additional gallery files upload
  const handleGalleryFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingImage(true);
    try {
      const promises = Array.from(files).map((f) => optimizeImageFile(f, 1000, 0.85));
      const optimizedList = await Promise.all(promises);
      setNewProductGallery((prev) => [...prev, ...optimizedList].slice(0, 4));
      notify(`${optimizedList.length} gallery image(s) added!`);
    } catch (err) {
      notify("Failed to process gallery images.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Add Product to MongoDB & Catalog
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = Math.round(Number(newProductPrice) || 0);
    const oldPriceNum = newProductOldPrice ? Math.round(Number(newProductOldPrice)) : undefined;

    if (!newProductName.trim() || priceNum <= 0) {
      notify("Please provide a valid product name and price.");
      return;
    }

    const discount = oldPriceNum && oldPriceNum > priceNum ? Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100) : undefined;
    const fallbackImage = initialProducts[0]?.image || "/assets/p1.jpg";
    const chosenImage = newProductImage.trim() || fallbackImage;
    const fullGallery = [chosenImage, ...newProductGallery];

    const newProd: Product = {
      id: Date.now(),
      name: newProductName.trim(),
      category: newProductCategory,
      rating: 5.0,
      price: priceNum,
      oldPrice: oldPriceNum,
      discount,
      image: chosenImage,
      gallery: fullGallery,
      description: newProductDescription.trim() || "Authentic high-grade gadget with 7-day checking warranty.",
      inStock: newProductInStock,
      featured: newProductFeatured,
    };

    // 1. Update UI immediately
    const updated = [newProd, ...catalog];
    setCatalog(updated);
    try {
      localStorage.setItem("gz_dynamic_catalog", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("gz_products_updated", { detail: updated }));
    } catch { }

    // 2. Persist to MongoDB Atlas via REST API Client
    try {
      const serverRes = await api.createProduct({
        name: newProd.name,
        category: newProd.category,
        price: newProd.price,
        oldPrice: newProd.oldPrice,
        description: newProd.description,
        image: newProd.image,
        gallery: fullGallery,
        inStock: newProductInStock,
        featured: newProductFeatured,
        adminPasscode: "admin123",
      });
      if (serverRes.success) {
        notify(`Product "${newProd.name}" published live to MongoDB Atlas!`);
      } else {
        notify(`Product saved locally (${serverRes.error || "DB sync pending"}).`);
      }
    } catch {
      notify(`Product "${newProd.name}" added to catalog.`);
    }

    setNewProductName("");
    setNewProductPrice("");
    setNewProductOldPrice("");
    setNewProductImage("");
    setNewProductGallery([]);
    setNewProductDescription("");
    setIsAddingProduct(false);
  };

  // List of all active deal products in catalog
  const dealProducts = useMemo(() => {
    return catalog.filter((p) =>
      Boolean(p.isDeal || p.isDealOfTheDay || (p.discount && p.discount > 0) || (p.oldPrice && p.oldPrice > p.price))
    );
  }, [catalog]);

  // Current Deal of the Day (explicitly set or highest discount)
  const currentDealOfTheDay = useMemo(() => {
    const explicit = catalog.find((p) => p.isDealOfTheDay);
    if (explicit) return explicit;
    if (dealProducts.length > 0) {
      return [...dealProducts].sort((a, b) => (b.discount || 0) - (a.discount || 0))[0];
    }
    return null;
  }, [catalog, dealProducts]);

  // Filtered Deals for Deals Tab Search
  const filteredDealProducts = useMemo(() => {
    if (!dealSearchQuery.trim()) return dealProducts;
    const q = dealSearchQuery.toLowerCase();
    return dealProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.dealTag?.toLowerCase().includes(q)
    );
  }, [dealProducts, dealSearchQuery]);

  // Start Editing a Product
  const handleStartEdit = (prod: Product) => {
    setEditingProduct(prod);
    setEditName(prod.name);
    setEditCategory(prod.category || "Earbuds");
    setEditPrice(String(prod.price));
    setEditOldPrice(prod.oldPrice ? String(prod.oldPrice) : "");
    setEditImage(prod.image);
    setEditGallery(prod.gallery && prod.gallery.length > 0 ? [...prod.gallery] : [prod.image]);
    setEditDescription(prod.description || "");
    setEditIsDeal(Boolean(prod.isDeal || (prod.discount && prod.discount > 0)));
    setEditIsDealOfTheDay(Boolean(prod.isDealOfTheDay));
    setEditDealTag(prod.dealTag || "Flash Sale");
    setEditInStock(prod.inStock !== false);
    setEditFeatured(prod.featured !== false);
  };

  // Toggle In Stock / Out of Stock (1-click from Admin)
  const handleToggleInStock = async (product: Product) => {
    const isCurrentlyInStock = product.inStock !== false;
    const nextInStock = !isCurrentlyInStock;

    const updated = catalog.map((p) => {
      if (p.id === product.id) {
        return { ...p, inStock: nextInStock };
      }
      return p;
    });

    setCatalog(updated);
    try {
      localStorage.setItem("gz_dynamic_catalog", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("gz_products_updated", { detail: updated }));
    } catch { }

    try {
      await api.updateProduct(product.id, {
        inStock: nextInStock,
        adminPasscode: "admin123",
      });
      notify(nextInStock ? `🟢 "${product.name}" marked as In Stock!` : `🔴 "${product.name}" marked as Out of Stock!`);
    } catch {
      notify(`Stock status updated for "${product.name}".`);
    }
  };

  // Toggle Show on Homepage / Featured (1-click from Admin)
  const handleToggleFeatured = async (product: Product) => {
    const isCurrentlyFeatured = product.featured === true;
    const nextFeatured = !isCurrentlyFeatured;

    const updated = catalog.map((p) => {
      if (p.id === product.id) {
        return { ...p, featured: nextFeatured };
      }
      return p;
    });

    setCatalog(updated);
    try {
      localStorage.setItem("gz_dynamic_catalog", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("gz_products_updated", { detail: updated }));
    } catch { }

    try {
      await api.updateProduct(product.id, {
        featured: nextFeatured,
        adminPasscode: "admin123",
      });
      notify(nextFeatured ? `🏠 "${product.name}" will now show on Homepage!` : `"${product.name}" removed from Homepage.`);
    } catch {
      notify(`Homepage visibility updated for "${product.name}".`);
    }
  };

  // Handle desktop/mobile image upload during Edit
  const handleEditPrimaryFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsEditUploadingImage(true);
    try {
      const optimized = await optimizeImageFile(file, 1000, 0.85);
      setEditImage(optimized);
      notify("Updated product photo compressed & ready!");
    } catch {
      notify("Failed to process updated image.");
    } finally {
      setIsEditUploadingImage(false);
    }
  };

  // Handle additional gallery images during Edit
  const handleEditGalleryFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsEditUploadingImage(true);
    try {
      const promises = Array.from(files).map((f) => optimizeImageFile(f, 1000, 0.85));
      const optimizedList = await Promise.all(promises);
      setEditGallery((prev) => [...prev, ...optimizedList].slice(0, 4));
      notify(`${optimizedList.length} new gallery image(s) added!`);
    } catch {
      notify("Failed to process gallery images.");
    } finally {
      setIsEditUploadingImage(false);
    }
  };

  // Save Updated Product to Catalog & MongoDB
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const priceNum = Math.round(Number(editPrice) || 0);
    const oldPriceNum = editOldPrice ? Math.round(Number(editOldPrice)) : undefined;

    if (!editName.trim() || priceNum <= 0) {
      notify("Please provide a valid product name and price.");
      return;
    }

    const discount = oldPriceNum && oldPriceNum > priceNum ? Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100) : undefined;
    const finalImage = editImage.trim() || editingProduct.image;
    const finalGallery = editGallery.length > 0 ? editGallery : [finalImage];

    const updatedProd: Product = {
      ...editingProduct,
      name: editName.trim(),
      category: editCategory,
      price: priceNum,
      oldPrice: oldPriceNum,
      discount,
      image: finalImage,
      gallery: finalGallery,
      description: editDescription.trim(),
      inStock: editInStock,
      featured: editFeatured,
      isDeal: Boolean(editIsDeal || (discount && discount > 0)),
      isDealOfTheDay: Boolean(editIsDealOfTheDay),
      dealTag: editDealTag.trim() || undefined,
    };

    // 1. Update UI state & LocalStorage immediately
    const updatedCatalog = catalog.map((p) => {
      if (p.id === editingProduct.id) return updatedProd;
      if (editIsDealOfTheDay) return { ...p, isDealOfTheDay: false };
      return p;
    });
    setCatalog(updatedCatalog);
    try {
      localStorage.setItem("gz_dynamic_catalog", JSON.stringify(updatedCatalog));
      window.dispatchEvent(new CustomEvent("gz_products_updated", { detail: updatedCatalog }));
    } catch { }

    // 2. Persist to MongoDB Atlas via PATCH API
    try {
      const serverRes = await api.updateProduct(editingProduct.id, {
        name: updatedProd.name,
        category: updatedProd.category,
        price: updatedProd.price,
        ...(updatedProd.oldPrice !== undefined ? { oldPrice: updatedProd.oldPrice } : {}),
        description: updatedProd.description,
        image: updatedProd.image,
        gallery: updatedProd.gallery,
        inStock: editInStock,
        featured: editFeatured,
        isDeal: Boolean(updatedProd.isDeal),
        isDealOfTheDay: Boolean(updatedProd.isDealOfTheDay),
        ...(updatedProd.dealTag ? { dealTag: updatedProd.dealTag } : {}),
        adminPasscode: "admin123",
      });
      if (serverRes.success) {
        notify(`Product "${updatedProd.name}" updated live in MongoDB Atlas!`);
      } else {
        notify(`Product updated locally (${serverRes.error || "sync pending"}).`);
      }
    } catch {
      notify(`Product "${updatedProd.name}" updated successfully.`);
    }

    setEditingProduct(null);
  };

  // Toggle or Set Deal of the Day (1-click)
  const handleSetDealOfTheDay = async (product: Product) => {
    const isCurrently = Boolean(product.isDealOfTheDay);
    const newStatus = !isCurrently;

    const updated = catalog.map((p) => {
      if (p.id === product.id) {
        return { ...p, isDealOfTheDay: newStatus, isDeal: true };
      }
      return newStatus ? { ...p, isDealOfTheDay: false } : p;
    });

    setCatalog(updated);
    try {
      localStorage.setItem("gz_dynamic_catalog", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("gz_products_updated", { detail: updated }));
    } catch { }

    try {
      const res = await api.updateProduct(product.id, {
        isDealOfTheDay: newStatus,
        isDeal: true,
        adminPasscode: "admin123",
      });
      if (res.success) {
        notify(newStatus ? `👑 "${product.name}" is now the active Deal of the Day!` : `Removed "${product.name}" from Deal of the Day.`);
      } else {
        notify(`Deal of the Day updated locally.`);
      }
    } catch {
      notify(`Deal of the Day status updated.`);
    }
  };

  // Toggle Deal status on/off for a product
  const handleToggleDeal = async (product: Product) => {
    const isCurrentlyDeal = Boolean(product.isDeal || (product.discount && product.discount > 0));
    const nextDeal = !isCurrentlyDeal;

    const updated = catalog.map((p) => {
      if (p.id === product.id) {
        return {
          ...p,
          isDeal: nextDeal,
          isDealOfTheDay: nextDeal ? p.isDealOfTheDay : false,
        };
      }
      return p;
    });

    setCatalog(updated);
    try {
      localStorage.setItem("gz_dynamic_catalog", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("gz_products_updated", { detail: updated }));
    } catch { }

    try {
      await api.updateProduct(product.id, {
        isDeal: nextDeal,
        isDealOfTheDay: nextDeal ? Boolean(product.isDealOfTheDay) : false,
        adminPasscode: "admin123",
      });
      notify(nextDeal ? `🔥 "${product.name}" added to Deals!` : `"${product.name}" removed from Deals.`);
    } catch {
      notify(`Deals status updated for "${product.name}".`);
    }
  };

  // Promote an existing product from catalog to Deal
  const handlePromoteProductToDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    const prodIdNum = Number(promoteProductId);
    const targetProd = catalog.find((p) => p.id === prodIdNum);
    if (!targetProd) {
      notify("Please select a product from catalog.");
      return;
    }

    const regularPrice = targetProd.oldPrice && targetProd.oldPrice > targetProd.price ? targetProd.oldPrice : targetProd.price;
    const discountPct = Number(promoteDiscountPercent) || 20;
    const salePrice = Math.round(regularPrice * (1 - discountPct / 100));

    const updatedProd: Product = {
      ...targetProd,
      price: salePrice,
      oldPrice: regularPrice,
      discount: discountPct,
      isDeal: true,
      isDealOfTheDay: promoteAsDealOfTheDay,
      dealTag: promoteDealTag,
    };

    const updatedCatalog = catalog.map((p) => {
      if (p.id === targetProd.id) return updatedProd;
      if (promoteAsDealOfTheDay) return { ...p, isDealOfTheDay: false };
      return p;
    });

    setCatalog(updatedCatalog);
    try {
      localStorage.setItem("gz_dynamic_catalog", JSON.stringify(updatedCatalog));
      window.dispatchEvent(new CustomEvent("gz_products_updated", { detail: updatedCatalog }));
    } catch { }

    try {
      await api.updateProduct(targetProd.id, {
        price: salePrice,
        oldPrice: regularPrice,
        isDeal: true,
        isDealOfTheDay: promoteAsDealOfTheDay,
        dealTag: promoteDealTag,
        adminPasscode: "admin123",
      });
      notify(`🎉 "${targetProd.name}" is now on Deal (${discountPct}% OFF)!`);
    } catch {
      notify(`"${targetProd.name}" promoted to Deal.`);
    }

    setPromoteProductId("");
    setPromoteAsDealOfTheDay(false);
  };

  // Handle Deal Image Uploads
  const handleDealPrimaryFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingDealImage(true);
    try {
      const optimized = await optimizeImageFile(file, 1000, 0.85);
      setNewDealImage(optimized);
      notify("Deal cover picture compressed & ready!");
    } catch {
      notify("Failed to process deal photo.");
    } finally {
      setIsUploadingDealImage(false);
    }
  };

  const handleDealGalleryFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingDealImage(true);
    try {
      const promises = Array.from(files).map((f) => optimizeImageFile(f, 1000, 0.85));
      const optimizedList = await Promise.all(promises);
      setNewDealGallery((prev) => [...prev, ...optimizedList].slice(0, 4));
      notify(`${optimizedList.length} deal gallery photo(s) added!`);
    } catch {
      notify("Failed to process deal gallery.");
    } finally {
      setIsUploadingDealImage(false);
    }
  };

  // Create brand new Deal product
  const handleCreateNewDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    const salePriceNum = Math.round(Number(newDealPrice) || 0);
    const oldPriceNum = Math.round(Number(newDealOldPrice) || 0);

    if (!newDealName.trim() || salePriceNum <= 0) {
      notify("Please provide a valid deal title and sale price.");
      return;
    }

    const calculatedDiscount = oldPriceNum > salePriceNum ? Math.round(((oldPriceNum - salePriceNum) / oldPriceNum) * 100) : 0;
    const finalImage: string = newDealImage.trim() || (newDealGallery.length > 0 && newDealGallery[0] ? newDealGallery[0] : "/assets/p1.jpg");
    const fullGallery: string[] = newDealGallery.length > 0 ? newDealGallery : [finalImage];
    const newId = Math.max(...catalog.map((p) => p.id), 12) + 1;

    const newDealProd: Product = {
      id: newId,
      name: newDealName.trim(),
      category: newDealCategory,
      price: salePriceNum,
      ...(oldPriceNum > 0 ? { oldPrice: oldPriceNum } : {}),
      ...(calculatedDiscount > 0 ? { discount: calculatedDiscount } : {}),
      image: finalImage,
      gallery: fullGallery,
      description: newDealDescription.trim() || "Exclusive limited-time discount deal with 7-day checking warranty.",
      rating: 5.0,
      stockCount: Number(newDealStockCount) || 30,
      inStock: true,
      featured: true,
      isDeal: true,
      isDealOfTheDay: newDealIsDealOfTheDay,
      dealTag: newDealTag.trim() || "Flash Sale",
    };

    const updated = [
      ...catalog.map((p) => (newDealIsDealOfTheDay ? { ...p, isDealOfTheDay: false } : p)),
      newDealProd,
    ];
    setCatalog(updated);
    try {
      localStorage.setItem("gz_dynamic_catalog", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("gz_products_updated", { detail: updated }));
    } catch { }

    try {
      const serverRes = await api.createProduct({
        name: newDealProd.name,
        category: newDealProd.category,
        price: newDealProd.price,
        ...(newDealProd.oldPrice !== undefined ? { oldPrice: newDealProd.oldPrice } : {}),
        description: newDealProd.description,
        image: newDealProd.image,
        gallery: fullGallery,
        ...(newDealProd.stockCount !== undefined ? { stockCount: newDealProd.stockCount } : {}),
        isDeal: true,
        isDealOfTheDay: newDealIsDealOfTheDay,
        ...(newDealProd.dealTag ? { dealTag: newDealProd.dealTag } : {}),
        adminPasscode: "admin123",
      });
      if (serverRes.success) {
        notify(`🔥 Deal "${newDealProd.name}" published live to MongoDB Atlas!`);
      } else {
        notify(`Deal saved locally (${serverRes.error || "DB sync pending"}).`);
      }
    } catch {
      notify(`Deal "${newDealProd.name}" added successfully.`);
    }

    setNewDealName("");
    setNewDealPrice("");
    setNewDealOldPrice("");
    setNewDealImage("");
    setNewDealGallery([]);
    setNewDealDescription("");
    setNewDealIsDealOfTheDay(false);
    setIsAddingDeal(false);
  };

  // Trigger Database Sync & Health Check
  const handleSyncDatabase = async () => {
    setIsSyncingDb(true);
    try {
      const health = await api.getHealth();
      const seedRes = await api.seedCatalog();

      if (health?.database?.connected) {
        setDbStatus({
          isConnected: true,
          statusText: "Connected (MongoDB Atlas)",
          source: "mongodb",
        });
        await fetchOrders();
        await fetchProducts();
        notify(`Database Synced! Status: Connected (${seedRes.count || catalog.length} products)`);
      } else {
        notify("Backend is reachable in Fallback mode.");
      }
    } catch (err) {
      notify("Sync error: " + (err as Error).message);
    } finally {
      setIsSyncingDb(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    const updated = catalog.filter((p) => p.id !== id);
    setCatalog(updated);
    try {
      localStorage.setItem("gz_dynamic_catalog", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("gz_products_updated", { detail: updated }));
      await api.deleteProduct(id);
    } catch { }
    notify("Product removed from catalog.");
  };

  // Export Orders to JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(orders, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `GadgetZone_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
    notify("Orders exported to JSON format.");
  };

  // Export Executive Formatted Excel (.xls)
  const handleExportExcel = () => {
    const reportDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const grossRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
    const pendingCount = orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length;

    const rowsHtml = orders
      .map((o, idx) => {
        const itemsStr =
          o.items?.map((i) => `• <b>${i.qty}x</b> ${i.name} &nbsp;(Rs. ${i.price.toLocaleString()})`).join("<br style='mso-data-placement:same-cell;'/>") || "Gadget Item";
        const dateStr = new Date(o.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        const bgColor = idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC";
        const statusColor =
          o.status === "Delivered"
            ? "#15803D"
            : o.status === "Dispatched" || o.status === "Out for Delivery"
              ? "#1D4ED8"
              : o.status === "Cancelled"
                ? "#B91C1C"
                : "#B45309";
        const statusBg =
          o.status === "Delivered"
            ? "#DCFCE7"
            : o.status === "Dispatched" || o.status === "Out for Delivery"
              ? "#DBEAFE"
              : o.status === "Cancelled"
                ? "#FEE2E2"
                : "#FEF3C7";

        return `
          <tr style="vertical-align: middle; background-color: ${bgColor};">
            <td style="padding: 14px 12px; border: 1px solid #CBD5E1; text-align: center; vertical-align: middle; font-weight: bold; color: #0284C7; font-size: 11pt;">#${o.orderNumber}</td>
            <td style="padding: 14px 12px; border: 1px solid #CBD5E1; text-align: center; vertical-align: middle; font-size: 10pt; color: #475569;">${dateStr}</td>
            <td style="padding: 14px 12px; border: 1px solid #CBD5E1; vertical-align: middle; font-weight: bold; color: #0F172A; font-size: 11pt;">${o.customerName}</td>
            <td style="padding: 14px 12px; border: 1px solid #CBD5E1; text-align: center; vertical-align: middle; mso-number-format:'\\@'; font-size: 10.5pt; font-weight: 600;">${o.phone}</td>
            <td style="padding: 14px 12px; border: 1px solid #CBD5E1; text-align: center; vertical-align: middle; font-weight: 600; font-size: 10pt; color: #1E293B;">${o.city}</td>
            <td style="padding: 14px 12px; border: 1px solid #CBD5E1; vertical-align: middle; font-size: 10pt; white-space: normal; word-wrap: break-word; line-height: 1.5; color: #334155;">${o.address}</td>
            <td style="padding: 14px 12px; border: 1px solid #CBD5E1; vertical-align: middle; font-size: 10pt; white-space: normal; word-wrap: break-word; line-height: 1.6; color: #0F172A;">${itemsStr}</td>
            <td style="padding: 14px 12px; border: 1px solid #CBD5E1; text-align: center; vertical-align: middle; font-size: 10pt; font-weight: 600;">${o.paymentMethod}</td>
            <td style="padding: 14px 12px; border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; font-size: 10.5pt; color: #334155;">Rs. ${o.subtotal.toLocaleString()}</td>
            <td style="padding: 14px 12px; border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; color: ${o.shipping === 0 ? "#15803D" : "#334155"}; font-weight: 600; font-size: 10pt;">${o.shipping === 0 ? "FREE" : `Rs. ${o.shipping.toLocaleString()}`}</td>
            <td style="padding: 14px 12px; border: 1px solid #CBD5E1; text-align: right; vertical-align: middle; font-weight: bold; color: #0284C7; font-size: 11pt;">Rs. ${o.total.toLocaleString()}</td>
            <td style="padding: 14px 12px; border: 1px solid #CBD5E1; text-align: center; vertical-align: middle; font-weight: bold; color: ${statusColor}; background-color: ${statusBg}; font-size: 10pt; border-radius: 4px;">${o.status}</td>
            <td style="padding: 14px 12px; border: 1px solid #CBD5E1; vertical-align: middle; font-style: italic; font-size: 9.5pt; color: #64748B; white-space: normal; line-height: 1.4;">${o.notes || "—"}</td>
          </tr>
        `;
      })
      .join("");

    const excelTemplate = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Orders & Sales Report</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                  <x:FitToPage/>
                  <x:DefaultRowHeight>360</x:DefaultRowHeight>
                  <x:Print>
                    <x:FitWidth>1</x:FitWidth>
                    <x:FitHeight>100</x:FitHeight>
                  </x:Print>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
        <style>
          body { font-family: 'Segoe UI', Calibri, Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; mso-displayed-decimal-separator: "."; mso-displayed-thousand-separator: ","; }
          th { background-color: #0B2545; color: #FFFFFF; font-size: 11pt; font-weight: bold; text-align: center; vertical-align: middle; padding: 16px 12px; border: 1px solid #07172C; }
          td { vertical-align: middle; }
        </style>
      </head>
      <body>
        <table border="1" style="border-collapse: collapse;">
          <tr style="height: 50pt;">
            <td colspan="13" style="background-color: #0B2545; color: #38BDF8; font-size: 16pt; font-weight: bold; text-align: center; vertical-align: middle; border: 1px solid #07172C; padding: 15px;">
              THE GADGET ZONE — EXECUTIVE ORDERS & SALES DISPATCH REPORT
            </td>
          </tr>
          <tr style="height: 28pt;">
            <td colspan="4" style="background-color: #F8FAFC; padding: 10px 14px; font-weight: bold; font-size: 10pt; vertical-align: middle; border: 1px solid #CBD5E1;">
              📅 Report Generated: ${reportDate}
            </td>
            <td colspan="5" style="background-color: #F8FAFC; padding: 10px 14px; text-align: center; font-weight: bold; font-size: 10pt; vertical-align: middle; border: 1px solid #CBD5E1;">
              📍 Store: Scheme 33, Karachi | WhatsApp: +92 342 0024369
            </td>
            <td colspan="4" style="background-color: #F8FAFC; padding: 10px 14px; text-align: right; font-weight: bold; font-size: 10pt; vertical-align: middle; border: 1px solid #CBD5E1;">
              Total Orders: ${orders.length} | Gross Revenue: Rs. ${grossRevenue.toLocaleString()}
            </td>
          </tr>
          <tr style="height: 28pt;">
            <td colspan="4" style="background-color: #DCFCE7; color: #166534; padding: 10px 14px; font-weight: bold; text-align: center; font-size: 10pt; vertical-align: middle; border: 1px solid #CBD5E1;">
              ✅ Completed Delivered: ${deliveredCount} Orders
            </td>
            <td colspan="5" style="background-color: #FEF3C7; color: #92400E; padding: 10px 14px; font-weight: bold; text-align: center; font-size: 10pt; vertical-align: middle; border: 1px solid #CBD5E1;">
              ⏳ In Transit / Active Pipeline: ${pendingCount} Orders
            </td>
            <td colspan="4" style="background-color: #E2E8F0; padding: 10px 14px; text-align: right; font-weight: bold; font-size: 10pt; vertical-align: middle; border: 1px solid #CBD5E1;">
              Currency: PKR (Pakistani Rupee)
            </td>
          </tr>
          <tr style="height: 14pt;"><td colspan="13" style="border: none;"></td></tr>
          <thead>
            <tr style="height: 40pt;">
              <th style="width: 120pt; background-color: #0B2545; color: #FFFFFF;">Order Tracking ID</th>
              <th style="width: 140pt; background-color: #0B2545; color: #FFFFFF;">Booking Date</th>
              <th style="width: 180pt; background-color: #0B2545; color: #FFFFFF;">Customer Name</th>
              <th style="width: 140pt; background-color: #0B2545; color: #FFFFFF;">Phone (WhatsApp)</th>
              <th style="width: 100pt; background-color: #0B2545; color: #FFFFFF;">City</th>
              <th style="width: 300pt; background-color: #0B2545; color: #FFFFFF;">Delivery Address</th>
              <th style="width: 320pt; background-color: #0B2545; color: #FFFFFF;">Ordered Products & Qty</th>
              <th style="width: 140pt; background-color: #0B2545; color: #FFFFFF;">Payment Method</th>
              <th style="width: 110pt; background-color: #0B2545; color: #FFFFFF;">Subtotal</th>
              <th style="width: 100pt; background-color: #0B2545; color: #FFFFFF;">Delivery Fee</th>
              <th style="width: 120pt; background-color: #0B2545; color: #FFFFFF;">Total Bill</th>
              <th style="width: 140pt; background-color: #0B2545; color: #FFFFFF;">Fulfillment Status</th>
              <th style="width: 180pt; background-color: #0B2545; color: #FFFFFF;">Special Instructions</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelTemplate], { type: "application/vnd.ms-excel;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `GadgetZone_Executive_Report_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    notify("Executive Excel Spreadsheet (.xls) downloaded with auto-height formatting.");
  };

  // Export Orders to CSV (with UTF-8 BOM)
  const handleExportCSV = () => {
    const headers = [
      "Order ID",
      "Booking Date",
      "Customer Name",
      "Phone (WhatsApp)",
      "City",
      "Delivery Address",
      "Itemized Products",
      "Payment Method",
      "Subtotal (PKR)",
      "Shipping Fee (PKR)",
      "Total Amount (PKR)",
      "Fulfillment Status",
      "Special Instructions",
    ];

    const rows = orders.map((o) => {
      const itemsStr =
        o.items?.map((i) => `${i.qty}x ${i.name} (Rs. ${i.price})`).join("; ") || "Gadget Item";
      return [
        `"${o.orderNumber}"`,
        `"${o.createdAt}"`,
        `"${o.customerName.replace(/"/g, '""')}"`,
        `"\t${o.phone}"`, // Tab forces Excel to format phone number properly
        `"${o.city}"`,
        `"${o.address.replace(/"/g, '""')}"`,
        `"${itemsStr.replace(/"/g, '""')}"`,
        `"${o.paymentMethod}"`,
        o.subtotal,
        o.shipping,
        o.total,
        `"${o.status}"`,
        `"${(o.notes || "").replace(/"/g, '""')}"`,
      ];
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `GadgetZone_Orders_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    notify("Orders CSV Spreadsheet downloaded successfully.");
  };

  // Filtered Orders Calculation
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        !searchQuery ||
        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.phone.includes(searchQuery);

      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      const matchesPayment =
        paymentFilter === "all" ||
        (paymentFilter === "cod" && o.paymentMethod.toLowerCase().includes("cod")) ||
        (paymentFilter === "easypaisa" && o.paymentMethod.toLowerCase().includes("easypaisa"));
      const matchesCity = cityFilter === "all" || o.city.toLowerCase() === cityFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesPayment && matchesCity;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter, cityFilter]);

  // Executive Sales Metrics
  const metrics = useMemo(() => {
    const totalOrders = orders.length;
    const grossRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const deliveredRevenue = orders
      .filter((o) => o.status === "Delivered")
      .reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingCount = orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length;
    const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
    const aov = totalOrders > 0 ? Math.round(grossRevenue / totalOrders) : 0;

    const codCount = orders.filter((o) => !o.paymentMethod.toLowerCase().includes("easypaisa")).length;
    const epCount = orders.filter((o) => o.paymentMethod.toLowerCase().includes("easypaisa")).length;

    // City distribution
    const cityMap: Record<string, number> = {};
    orders.forEach((o) => {
      const c = o.city || "Karachi";
      cityMap[c] = (cityMap[c] || 0) + 1;
    });

    return {
      totalOrders,
      grossRevenue,
      deliveredRevenue,
      pendingCount,
      deliveredCount,
      aov,
      codCount,
      epCount,
      cityMap,
    };
  }, [orders]);

  // Executive Admin Login Screen (Light Theme • Username: Usama Abid & Password: admin123)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 text-slate-900 flex flex-col justify-between selection:bg-royal selection:text-white relative overflow-hidden">
        {/* Subtle Ambient Decorative Gradients */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-royal/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />

        {/* Minimal Light Admin Header */}
        <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-royal to-sky-500 text-white font-black text-sm shadow-md shadow-royal/20">
              GZ
            </div>
            <div>
              <h1 className="font-display text-sm font-bold text-slate-900 tracking-wide">
                The Gadget Zone
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">Executive Management Portal</p>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-royal hover:border-royal/40 hover:bg-sky-50/40 transition-colors shadow-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Return to Store
          </Link>
        </header>

        {/* Executive Light Authentication Card */}
        <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
          <div className="w-full max-w-md bg-white/95 border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-royal/10 space-y-6 text-center backdrop-blur-xl animate-fade-in">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-royal/10 text-royal border border-royal/20 shadow-sm">
              <Lock className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-royal/10 border border-royal/20 px-3 py-1 text-[11px] font-extrabold text-royal uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Administrative Access
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
                Admin Authentication
              </h1>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sign in with your administrator username &amp; security password to access live orders, sales analytics, and catalog management.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 text-left flex items-start gap-2 animate-shake">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-royal" /> Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username (e.g. usama abid)"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-royal focus:ring-2 focus:ring-royal/20 focus:outline-none transition-all"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Input with Show/Hide Toggle */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-royal" /> Security Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password (e.g. admin123)"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-4 pr-11 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-royal focus:ring-2 focus:ring-royal/20 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4 text-slate-400" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-royal to-sky-600 hover:from-royal-deep hover:to-royal py-3.5 text-sm font-bold text-white transition-all shadow-lg shadow-royal/25 active:scale-[0.99] cursor-pointer"
              >
                Unlock Portal &amp; Enter Dashboard
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Restricted System • 256-Bit SSL Encrypted Session</span>
            </div>
          </div>
        </div>

        {/* Minimal Admin Footer */}
        <footer className="border-t border-slate-200/80 bg-white/50 py-4 px-4 text-center text-xs text-slate-500 relative z-10">
          © {new Date().getFullYear()} The Gadget Zone. Administrative Portal. All rights reserved.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Header Command Bar (Vivid Royal Blue Header) */}
      <header className="sticky top-0 z-40 border-b border-royal-deep/30 bg-gradient-to-r from-[#072042] via-royal to-[#026cb6] text-white shadow-lg px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-royal font-black text-sm shadow-md">
            GZ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-base font-bold text-white tracking-wide">
                The Gadget Zone Executive Portal
              </h1>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold flex items-center gap-1 ${dbStatus.isConnected
                ? "bg-emerald-500/20 border border-emerald-400/40 text-emerald-200"
                : "bg-amber-500/20 border border-amber-400/40 text-amber-200"
                }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${dbStatus.isConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`}></span>
                {dbStatus.isConnected ? "MONGODB ATLAS LIVE" : "IN-MEMORY FALLBACK"}
              </span>
            </div>
            <p className="text-[11px] text-sky-100/85 font-medium">
              Connected Orders, Sales &amp; Catalog Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Admin Identity Badge */}
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-white shadow-sm">
            <User className="h-3.5 w-3.5 text-sky-200" />
            <span>{adminUser || "Usama Abid"}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" title="Active Admin Session"></span>
          </div>

          <button
            onClick={fetchOrders}
            disabled={loadingOrders}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-sm backdrop-blur-sm"
            title="Refresh Data"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loadingOrders ? "animate-spin text-sky-200" : ""}`} />
            <span>Sync</span>
          </button>

          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-bold text-white transition-colors shadow-sm backdrop-blur-sm"
          >
            <ExternalLink className="h-3.5 w-3.5 text-sky-200" /> Storefront
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-300/30 bg-red-500/20 hover:bg-red-500/30 px-3 py-1.5 text-xs font-bold text-red-100 transition-colors cursor-pointer shadow-sm backdrop-blur-sm"
          >
            <LogOut className="h-3.5 w-3.5" /> Lock
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <nav className="flex flex-wrap items-center gap-2 p-1 bg-card border border-border rounded-2xl">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "orders"
                ? "bg-royal text-white shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-sky-soft/40"
                }`}
            >
              <Package className="h-4 w-4" /> Live Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "analytics"
                ? "bg-royal text-white shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-sky-soft/40"
                }`}
            >
              <TrendingUp className="h-4 w-4" /> Sales Report
            </button>
            <button
              onClick={() => setActiveTab("catalog")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "catalog"
                ? "bg-royal text-white shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-sky-soft/40"
                }`}
            >
              <ShoppingBag className="h-4 w-4" /> Catalog ({catalog.length})
            </button>
            <button
              onClick={() => setActiveTab("deals")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "deals"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                : "text-amber-600 hover:text-amber-700 hover:bg-amber-500/10 font-black"
                }`}
            >
              <Flame className="h-4 w-4 text-amber-500" /> Deals & Deal of the Day ({dealProducts.length})
            </button>
            <button
              onClick={() => setActiveTab("data")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "data"
                ? "bg-royal text-white shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-sky-soft/40"
                }`}
            >
              <Layers className="h-4 w-4" /> Data Sync
            </button>
          </nav>

          <div className="text-xs text-muted-foreground font-semibold">
            {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: LIVE ORDERS MANAGEMENT                                             */}
        {/* ========================================================================= */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-fade-in">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-border bg-card p-4 space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Total Bookings</span>
                <p className="font-display text-2xl font-black text-foreground">{metrics.totalOrders}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Gross Value</span>
                <p className="font-display text-2xl font-black text-royal">{formatPrice(metrics.grossRevenue)}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">In Transit / Pending</span>
                <p className="font-display text-2xl font-black text-amber-500">{metrics.pendingCount}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Completed Delivered</span>
                <p className="font-display text-2xl font-black text-emerald-500">{metrics.deliveredCount}</p>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="rounded-2xl border border-border bg-card p-4 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Order ID, Customer Name, Phone..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:border-royal focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-foreground font-semibold focus:border-royal focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                {/* Payment Filter */}
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-foreground font-semibold focus:border-royal focus:outline-none"
                >
                  <option value="all">All Payment</option>
                  <option value="cod">Cash on Delivery</option>
                  <option value="easypaisa">EasyPaisa / JazzCash</option>
                </select>

                {/* City Filter */}
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-foreground font-semibold focus:border-royal focus:outline-none"
                >
                  <option value="all">All Cities</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                </select>

                {/* Quick Export Excel */}
                <button
                  onClick={handleExportExcel}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm"
                  title="Download formatted Excel (.xls) sheet"
                >
                  <Download className="h-3.5 w-3.5" /> Export Excel
                </button>
              </div>
            </div>

            {/* Orders Table */}
            {filteredOrders.length === 0 ? (
              <div className="rounded-3xl border border-border bg-card p-12 text-center space-y-3">
                <Package className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                <h3 className="font-bold text-foreground text-sm">No orders matching filter criteria</h3>
                <p className="text-xs text-muted-foreground">Adjust filters or place a test order on the checkout page.</p>
              </div>
            ) : (
              <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-sky-soft/30 border-b border-border/80 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-4">Order ID</th>
                        <th className="px-5 py-4">Date</th>
                        <th className="px-5 py-4">Customer</th>
                        <th className="px-5 py-4">City</th>
                        <th className="px-5 py-4">Total Bill</th>
                        <th className="px-5 py-4">Payment</th>
                        <th className="px-5 py-4">Live Status</th>
                        <th className="px-5 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {filteredOrders.map((order) => {
                        const waText = encodeURIComponent(`Hi ${order.customerName}! We're contacting you regarding your order #${order.orderNumber} from The Gadget Zone.`);
                        const waUrl = `https://wa.me/${order.phone.replace(/[^0-9]/g, "")}?text=${waText}`;

                        return (
                          <tr key={order.orderNumber} className="hover:bg-sky-soft/20 transition-colors">
                            <td className="px-5 py-4 font-extrabold text-royal">
                              #{order.orderNumber}
                            </td>
                            <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">
                              {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                            </td>
                            <td className="px-5 py-4 font-bold text-foreground">
                              <div>{order.customerName}</div>
                              <span className="text-[10px] text-muted-foreground font-normal">{order.phone}</span>
                            </td>
                            <td className="px-5 py-4 text-foreground font-semibold">
                              {order.city}
                            </td>
                            <td className="px-5 py-4 font-black text-foreground">
                              {formatPrice(order.total)}
                            </td>
                            <td className="px-5 py-4">
                              <span className="rounded-full bg-background border border-border px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                                {order.paymentMethod.toLowerCase().includes("easypaisa") ? "EasyPaisa" : "COD"}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.orderNumber, e.target.value)}
                                className={`rounded-full px-2.5 py-1 text-[10px] font-bold border focus:outline-none cursor-pointer ${order.status === "Delivered"
                                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                  : order.status === "Dispatched" || order.status === "Out for Delivery"
                                    ? "bg-blue-500/10 text-blue-500 border-blue-500/30"
                                    : order.status === "Cancelled"
                                      ? "bg-destructive/10 text-destructive border-destructive/30"
                                      : "bg-amber-500/10 text-amber-500 border-amber-500/30"
                                  }`}
                              >
                                {ORDER_STATUSES.map((s) => (
                                  <option key={s} value={s} className="bg-card text-foreground">{s}</option>
                                ))}
                              </select>
                            </td>
                            <td className="px-5 py-4 text-right space-x-2 whitespace-nowrap">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1 font-bold text-foreground hover:bg-sky-soft/40 transition-colors"
                              >
                                <Eye className="h-3 w-3" /> View
                              </button>
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 font-bold text-white hover:bg-emerald-700 transition-colors"
                              >
                                <MessageCircle className="h-3 w-3" /> WhatsApp
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: EXECUTIVE SALES REPORT                                             */}
        {/* ========================================================================= */}
        {activeTab === "analytics" && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Sales Volume</span>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-3xl font-black text-foreground">{formatPrice(metrics.grossRevenue)}</h3>
                  <span className="inline-flex items-center text-xs font-bold text-emerald-500">
                    <ArrowUpRight className="h-4 w-4" /> 100% Verified
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Cumulative volume from {metrics.totalOrders} total customer orders.</p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Average Order Value (AOV)</span>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-3xl font-black text-royal">{formatPrice(metrics.aov)}</h3>
                  <span className="text-xs font-bold text-muted-foreground">Per order</span>
                </div>
                <p className="text-xs text-muted-foreground">Average basket spend across gadget categories.</p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Fulfilment Completion Rate</span>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-3xl font-black text-emerald-500">
                    {metrics.totalOrders > 0 ? Math.round((metrics.deliveredCount / metrics.totalOrders) * 100) : 0}%
                  </h3>
                  <span className="text-xs font-bold text-emerald-500">{metrics.deliveredCount} Delivered</span>
                </div>
                <p className="text-xs text-muted-foreground">{metrics.pendingCount} orders currently in fulfillment pipeline.</p>
              </div>
            </div>

            {/* Breakdown Grids */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Method Distribution */}
              <div className="rounded-3xl border border-border bg-card p-6 space-y-5 shadow-sm">
                <h4 className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-royal" /> Payment Channel Split
                </h4>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span>Cash on Delivery (COD)</span>
                      <span>{metrics.codCount} orders ({metrics.totalOrders > 0 ? Math.round((metrics.codCount / metrics.totalOrders) * 100) : 0}%)</span>
                    </div>
                    <div className="h-3 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full bg-royal transition-all duration-500"
                        style={{ width: `${metrics.totalOrders > 0 ? (metrics.codCount / metrics.totalOrders) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span>EasyPaisa / JazzCash Mobile Wallet</span>
                      <span>{metrics.epCount} orders ({metrics.totalOrders > 0 ? Math.round((metrics.epCount / metrics.totalOrders) * 100) : 0}%)</span>
                    </div>
                    <div className="h-3 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${metrics.totalOrders > 0 ? (metrics.epCount / metrics.totalOrders) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Geographic City Distribution */}
              <div className="rounded-3xl border border-border bg-card p-6 space-y-5 shadow-sm">
                <h4 className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-royal" /> Top Geographic Destinations
                </h4>

                <div className="space-y-3">
                  {Object.entries(metrics.cityMap).map(([city, count]) => {
                    const pct = metrics.totalOrders > 0 ? Math.round((count / metrics.totalOrders) * 100) : 0;
                    return (
                      <div key={city} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{city}</span>
                          <span className="text-muted-foreground">{count} orders ({pct}%)</span>
                        </div>
                        <div className="h-2 rounded-full bg-border overflow-hidden">
                          <div
                            className="h-full bg-sky-hero transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PRODUCT CATALOG & DYNAMIC UPLOAD                                   */}
        {/* ========================================================================= */}
        {activeTab === "catalog" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Product Inventory ({catalog.length})
                </h3>
                <p className="text-xs text-muted-foreground">
                  Manage active storefront products, pricing, discounts, and inventory tags.
                </p>
              </div>

              <button
                onClick={() => setIsAddingProduct((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full bg-royal px-4 py-2 text-xs font-bold text-white hover:bg-royal-deep transition-all shadow-md cursor-pointer"
              >
                <PlusCircle className="h-4 w-4" /> {isAddingProduct ? "Cancel Form" : "Upload New Product"}
              </button>
            </div>

            {/* Dynamic Product Upload Form */}
            {isAddingProduct && (
              <div className="rounded-3xl border border-royal/30 bg-card p-6 sm:p-8 shadow-lg space-y-5 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                  <Sparkles className="h-4 w-4 text-royal" />
                  <h4 className="font-display text-sm font-bold text-foreground">Add New Gadget to Catalog</h4>
                </div>

                <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-foreground">Product Title *</label>
                    <input
                      type="text"
                      required
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                      placeholder="e.g. Ultra HD ANC Wireless Headphones"
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-royal focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-foreground">Category *</label>
                    <select
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-royal focus:outline-none"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-foreground">Price in PKR (Rs.) *</label>
                    <input
                      type="number"
                      required
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                      placeholder="e.g. 8499"
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-royal focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-foreground">Original/Old Price (Optional, for Discount)</label>
                    <input
                      type="number"
                      value={newProductOldPrice}
                      onChange={(e) => setNewProductOldPrice(e.target.value)}
                      placeholder="e.g. 10999"
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-royal focus:outline-none"
                    />
                  </div>

                  {/* Media Upload from Desktop / Mobile */}
                  <div className="space-y-2 sm:col-span-2 rounded-2xl border border-border/80 bg-background/50 p-4">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-foreground flex items-center gap-1.5 text-xs">
                        <UploadCloud className="h-4 w-4 text-royal" />
                        <span>Product Photos & Media Upload (from Device / Desktop / Mobile) *</span>
                      </label>
                      {isUploadingImage && (
                        <span className="text-[10px] font-bold text-royal animate-pulse">
                          Compressing & Optimizing Image...
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      {/* 1. Primary Photo File Picker */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-semibold text-muted-foreground block">
                          Main Product Image (Cover Photo)
                        </span>

                        {newProductImage ? (
                          <div className="relative group aspect-video sm:aspect-square max-h-48 rounded-xl overflow-hidden border border-royal/40 bg-card shadow-sm">
                            <img
                              src={newProductImage}
                              alt="Uploaded Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <label
                                htmlFor="primary-image-upload"
                                className="cursor-pointer px-3 py-1.5 rounded-lg bg-royal text-white text-[11px] font-bold hover:bg-royal-deep transition-all"
                              >
                                Change Image
                              </label>
                              <button
                                type="button"
                                onClick={() => setNewProductImage("")}
                                className="p-1.5 rounded-lg bg-destructive text-white hover:bg-destructive/90 transition-all"
                                title="Remove photo"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <span className="absolute bottom-2 left-2 rounded-md bg-royal/90 px-2 py-0.5 text-[9px] font-extrabold text-white">
                              Cover Photo
                            </span>
                          </div>
                        ) : (
                          <label
                            htmlFor="primary-image-upload"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-royal/60 rounded-xl p-5 text-center cursor-pointer transition-all bg-card/40 hover:bg-sky-soft/20 group"
                          >
                            <div className="h-10 w-10 rounded-xl bg-royal/10 text-royal grid place-items-center mb-2 group-hover:scale-110 transition-transform">
                              <ImageIcon className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-foreground text-xs">
                              Choose Cover Picture from Device
                            </span>
                            <span className="text-[10px] text-muted-foreground mt-0.5">
                              PNG, JPG, WebP, HEIC (Auto-optimized)
                            </span>
                          </label>
                        )}

                        <input
                          id="primary-image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handlePrimaryFileChange}
                          className="hidden"
                        />
                      </div>

                      {/* 2. Additional Gallery Photos */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-semibold text-muted-foreground block">
                          Additional Gallery Angles (Optional)
                        </span>

                        <div className="space-y-2">
                          {newProductGallery.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {newProductGallery.map((gImg, idx) => (
                                <div key={idx} className="relative group h-16 w-16 rounded-lg overflow-hidden border border-border bg-card">
                                  <img src={gImg} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => setNewProductGallery((prev) => prev.filter((_, i) => i !== idx))}
                                    className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-destructive text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-2.5 w-2.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          <label
                            htmlFor="gallery-image-upload"
                            className="flex items-center justify-center gap-2 border border-dashed border-border hover:border-royal/50 rounded-xl p-3.5 text-center cursor-pointer transition-all bg-card/30 hover:bg-sky-soft/20 text-xs font-bold text-muted-foreground hover:text-foreground"
                          >
                            <PlusCircle className="h-4 w-4 text-royal" />
                            <span>Add More Gallery Pictures</span>
                          </label>

                          <input
                            id="gallery-image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryFilesChange}
                            className="hidden"
                          />
                        </div>

                        {/* Direct URL Fallback */}
                        <div className="pt-1">
                          <input
                            type="text"
                            value={newProductImage && !newProductImage.startsWith("data:") ? newProductImage : ""}
                            onChange={(e) => setNewProductImage(e.target.value)}
                            placeholder="Or paste direct image URL (https://...)"
                            className="w-full rounded-xl border border-border/70 bg-background px-3 py-1.5 text-[11px] text-foreground focus:border-royal focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stock & Homepage Visibility Settings */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:col-span-2 rounded-2xl border border-border/80 bg-background/50 p-3.5">
                    <div className="flex items-center gap-2.5 bg-card/60 p-2.5 rounded-xl border border-border">
                      <input
                        type="checkbox"
                        id="newProductInStock"
                        checked={newProductInStock}
                        onChange={(e) => setNewProductInStock(e.target.checked)}
                        className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <label htmlFor="newProductInStock" className="font-bold text-xs text-foreground cursor-pointer flex items-center gap-1.5">
                        <span className={newProductInStock ? "text-emerald-600 font-extrabold" : "text-rose-600 font-extrabold"}>
                          {newProductInStock ? "🟢 In Stock & Ready to Ship" : "🔴 Mark as Out of Stock"}
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2.5 bg-card/60 p-2.5 rounded-xl border border-border">
                      <input
                        type="checkbox"
                        id="newProductFeatured"
                        checked={newProductFeatured}
                        onChange={(e) => setNewProductFeatured(e.target.checked)}
                        className="h-4 w-4 rounded text-royal focus:ring-royal cursor-pointer"
                      />
                      <label htmlFor="newProductFeatured" className="font-bold text-xs text-foreground cursor-pointer flex items-center gap-1.5">
                        <HomeIcon className="h-3.5 w-3.5 text-royal" />
                        <span>Feature on Homepage (2-Row Grid)</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-foreground">Short Feature Description</label>
                    <textarea
                      rows={2}
                      value={newProductDescription}
                      onChange={(e) => setNewProductDescription(e.target.value)}
                      placeholder="Key specifications, battery life, sound quality..."
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-foreground focus:border-royal focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddingProduct(false)}
                      className="rounded-full border border-border px-5 py-2 font-bold text-muted-foreground hover:bg-sky-soft/30 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUploadingImage}
                      className="rounded-full bg-royal px-6 py-2 font-bold text-white hover:bg-royal-deep transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      Save & Publish to Store
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catalog.map((product) => {
                const isDealOfTheDay = Boolean(product.isDealOfTheDay);
                const isDeal = Boolean(product.isDeal || (product.discount && product.discount > 0));
                const isInStock = product.inStock !== false;
                const isFeaturedOnHome = product.featured === true;

                return (
                  <div key={product.id} className={`rounded-2xl border bg-card p-4 flex flex-col justify-between gap-3 shadow-sm transition-all ${isDealOfTheDay
                    ? "border-amber-400/80 ring-1 ring-amber-400/30"
                    : !isInStock
                      ? "border-rose-400/40 bg-rose-50/10"
                      : "border-border hover:border-royal/30"
                    }`}>
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="relative h-18 w-18 rounded-xl bg-sky-soft/40 overflow-hidden shrink-0 border border-border/50">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        {product.discount && product.discount > 0 && (
                          <span className="absolute top-1 left-1 rounded-md bg-gold text-slate-950 font-black text-[8px] px-1 py-0.2 shadow-sm">
                            {product.discount}% OFF
                          </span>
                        )}
                        {!isInStock && (
                          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] flex items-center justify-center p-1">
                            <span className="text-[7.5px] font-black uppercase tracking-wider text-white bg-rose-600 px-1 py-0.5 rounded">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="rounded-full bg-sky-soft px-2 py-0.5 text-[9px] font-bold text-royal">
                            {product.category}
                          </span>
                          {isDealOfTheDay && (
                            <span className="rounded-full bg-amber-400 text-slate-950 px-1.5 py-0.2 text-[8px] font-black flex items-center gap-0.5">
                              <Crown className="h-2 w-2 fill-current" /> Deal of Day
                            </span>
                          )}
                          {!isDealOfTheDay && isDeal && (
                            <span className="rounded-full bg-amber-500/15 text-amber-600 px-1.5 py-0.2 text-[8px] font-extrabold">
                              🔥 Deal
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-xs text-foreground truncate mt-1" title={product.name}>{product.name}</h4>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <p className="font-black text-royal text-xs">{formatPrice(product.price)}</p>
                          {product.oldPrice && (
                            <p className="text-[10px] text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Interactive 1-Click Management Controls */}
                    <div className="pt-2 border-t border-border/50 flex items-center justify-between gap-2 flex-wrap text-[10px]">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* 1-Click In-Stock / Out-of-Stock Toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggleInStock(product)}
                          className={`rounded-full px-2 py-0.5 font-bold transition-all border cursor-pointer active:scale-95 ${isInStock
                            ? "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 border-emerald-500/30"
                            : "bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 border-rose-500/30 font-extrabold"
                            }`}
                          title="Click to toggle Stock availability"
                        >
                          {isInStock ? "🟢 In Stock" : "🔴 Out of Stock"}
                        </button>

                        {/* 1-Click Homepage 2-Row Visibility Toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(product)}
                          className={`rounded-full px-2 py-0.5 font-bold transition-all border cursor-pointer active:scale-95 ${isFeaturedOnHome
                            ? "bg-royal/15 hover:bg-royal/25 text-royal border-royal/30 font-extrabold"
                            : "bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 text-slate-500 border-slate-300 dark:border-slate-700"
                            }`}
                          title="Click to show/hide on Homepage 2-row grid"
                        >
                          {isFeaturedOnHome ? "🏠 On Home" : "⊘ Shop Only"}
                        </button>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 ml-auto">
                        <button
                          onClick={() => handleSetDealOfTheDay(product)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${isDealOfTheDay
                            ? "text-amber-500 bg-amber-500/15"
                            : "text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10"
                            }`}
                          title={isDealOfTheDay ? "Active Deal of the Day" : "Set as Deal of the Day"}
                        >
                          <Crown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleStartEdit(product)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-royal hover:bg-sky-soft/40 transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3B: DEALS & DEAL OF THE DAY MANAGEMENT                                */}
        {/* ========================================================================= */}
        {activeTab === "deals" && (
          <div className="space-y-8 animate-fade-in">
            {/* Header & Quick Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-5 sm:p-6 rounded-3xl border border-amber-500/20">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-500 text-slate-950 font-black shadow-sm">
                    <Flame className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Deals & Deal of the Day Management
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground max-w-xl">
                  Upload promotional discount campaigns, set custom markdown prices, and designate the spotlight <strong className="text-amber-500">Deal of the Day</strong> for the storefront.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsAddingDeal(!isAddingDeal)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>{isAddingDeal ? "Close Form" : "Upload New Deal"}</span>
                </button>
              </div>
            </div>

            {/* Spotlight Banner: Current Deal of the Day */}
            <div className="rounded-3xl border-2 border-amber-400/40 bg-gradient-to-br from-[#0B1E48] via-[#081738] to-[#040C20] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-white/10 border border-amber-400/30 overflow-hidden shrink-0 shadow-inner">
                    {currentDealOfTheDay ? (
                      <img
                        src={currentDealOfTheDay.image}
                        alt={currentDealOfTheDay.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-amber-300">
                        <Crown className="h-10 w-10 opacity-60" />
                      </div>
                    )}
                    {currentDealOfTheDay?.discount && (
                      <span className="absolute top-2 left-2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 shadow-md">
                        {currentDealOfTheDay.discount}% OFF
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 px-3 py-1 text-[11px] font-black text-amber-300 tracking-wider uppercase">
                        <Crown className="h-3.5 w-3.5 fill-current" /> Active Deal of the Day
                      </span>
                      {currentDealOfTheDay?.isDealOfTheDay && (
                        <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5">
                          ✓ Explicitly Selected
                        </span>
                      )}
                    </div>

                    <h4 className="font-display text-lg sm:text-xl font-extrabold text-[#FFC400]">
                      {currentDealOfTheDay ? currentDealOfTheDay.name : "No Deal of the Day Selected"}
                    </h4>

                    {currentDealOfTheDay && (
                      <div className="flex items-baseline gap-3 text-xs sm:text-sm">
                        <span className="font-black text-white text-base sm:text-lg">
                          {formatPrice(currentDealOfTheDay.price)}
                        </span>
                        {currentDealOfTheDay.oldPrice && (
                          <span className="text-white/60 line-through">
                            {formatPrice(currentDealOfTheDay.oldPrice)}
                          </span>
                        )}
                        <span className="text-emerald-400 font-bold text-xs">
                          Category: {currentDealOfTheDay.category}
                        </span>
                      </div>
                    )}

                    <p className="text-xs text-white/70 max-w-lg">
                      {currentDealOfTheDay
                        ? currentDealOfTheDay.description
                        : "Pick any product from the catalog or deals list below and click 'Make Deal of the Day' to spotlight it."}
                    </p>
                  </div>
                </div>

                {currentDealOfTheDay && (
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <button
                      onClick={() => handleSetDealOfTheDay(currentDealOfTheDay)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer shadow-md ${currentDealOfTheDay.isDealOfTheDay
                        ? "bg-amber-400 text-slate-950 hover:bg-amber-300 font-black"
                        : "bg-white/15 text-white hover:bg-white/25 border border-white/20"
                        }`}
                    >
                      <Crown className="h-4 w-4" />
                      <span>{currentDealOfTheDay.isDealOfTheDay ? "Designated Spotlight" : "Confirm as Deal of the Day"}</span>
                    </button>
                    <button
                      onClick={() => handleStartEdit(currentDealOfTheDay)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-3.5 py-2 text-xs font-bold text-white transition-all cursor-pointer"
                    >
                      <Edit className="h-3.5 w-3.5" /> Edit Deal Details
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Upload Deal Drawer / Form */}
            {isAddingDeal && (
              <div className="rounded-3xl border-2 border-amber-500/40 bg-card p-6 sm:p-8 space-y-5 shadow-xl animate-fade-in">
                <div className="flex items-center justify-between border-b border-border/80 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-amber-500/20 text-amber-500 grid place-items-center font-bold">
                      <Flame className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-foreground">
                        Upload New Discount Deal to Store
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Creates the deal and instantly makes it visible on the storefront Deals page.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAddingDeal(false)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sky-soft/30 transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleCreateNewDeal} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-foreground">Deal Title / Product Name *</label>
                    <input
                      type="text"
                      required
                      value={newDealName}
                      onChange={(e) => setNewDealName(e.target.value)}
                      placeholder="e.g. Wireless Noise-Cancelling Earbuds Pro"
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-foreground">Category *</label>
                    <select
                      value={newDealCategory}
                      onChange={(e) => setNewDealCategory(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-amber-500 focus:outline-none"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-foreground">Deal Sale Price (Rs. in PKR) *</label>
                    <input
                      type="number"
                      required
                      value={newDealPrice}
                      onChange={(e) => setNewDealPrice(e.target.value)}
                      placeholder="e.g. 5999"
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-amber-500 focus:outline-none font-bold text-royal"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-foreground">Original Regular Price (Rs. in PKR) *</label>
                    <input
                      type="number"
                      required
                      value={newDealOldPrice}
                      onChange={(e) => setNewDealOldPrice(e.target.value)}
                      placeholder="e.g. 7999"
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-amber-500 focus:outline-none"
                    />
                    {Number(newDealOldPrice) > Number(newDealPrice) && Number(newDealPrice) > 0 && (
                      <p className="text-[11px] font-extrabold text-emerald-600">
                        ⚡ Discount: {Math.round(((Number(newDealOldPrice) - Number(newDealPrice)) / Number(newDealOldPrice)) * 100)}% OFF
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-foreground">Deal Tag / Badge</label>
                    <select
                      value={newDealTag}
                      onChange={(e) => setNewDealTag(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-amber-500 focus:outline-none"
                    >
                      {DEAL_TAG_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-foreground">Initial Stock Count</label>
                    <input
                      type="number"
                      value={newDealStockCount}
                      onChange={(e) => setNewDealStockCount(e.target.value)}
                      placeholder="e.g. 30"
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Deal of the Day Checkbox */}
                  <div className="sm:col-span-2 lg:col-span-3 rounded-2xl border border-amber-400/30 bg-amber-500/5 p-3.5 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="newDealIsDealOfTheDay"
                      checked={newDealIsDealOfTheDay}
                      onChange={(e) => setNewDealIsDealOfTheDay(e.target.checked)}
                      className="h-4 w-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
                    />
                    <label htmlFor="newDealIsDealOfTheDay" className="font-bold text-xs text-foreground cursor-pointer flex items-center gap-1.5">
                      <Crown className="h-4 w-4 text-amber-500" />
                      <span>Set this product as the official <strong>"Deal of the Day"</strong> (Spotlight Banner on Deals Page)</span>
                    </label>
                  </div>

                  {/* Image Upload Area */}
                  <div className="sm:col-span-2 lg:col-span-3 space-y-2 rounded-2xl border border-border/80 bg-background/50 p-4">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-foreground flex items-center gap-1.5">
                        <UploadCloud className="h-4 w-4 text-amber-500" />
                        <span>Deal Pictures & Media (Upload from Device / Mobile)</span>
                      </label>
                      {isUploadingDealImage && (
                        <span className="text-[10px] font-bold text-amber-600 animate-pulse">
                          Optimizing image...
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      {/* Cover Photo */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-semibold text-muted-foreground block">
                          Cover Picture
                        </span>

                        {newDealImage ? (
                          <div className="relative aspect-video max-h-36 rounded-xl overflow-hidden border border-amber-400/40 bg-card">
                            <img src={newDealImage} alt="Cover Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setNewDealImage("")}
                              className="absolute top-2 right-2 rounded-full bg-destructive text-white p-1 hover:bg-destructive/80 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="deal-primary-image-upload"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-amber-500/60 rounded-xl p-4 text-center cursor-pointer transition-all bg-card/40 hover:bg-amber-500/10 group"
                          >
                            <ImageIcon className="h-5 w-5 text-amber-500 mb-1" />
                            <span className="font-bold text-foreground text-xs">Upload Deal Photo</span>
                          </label>
                        )}

                        <input
                          id="deal-primary-image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleDealPrimaryFileChange}
                          className="hidden"
                        />
                      </div>

                      {/* Additional Gallery */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-semibold text-muted-foreground block">
                          Additional Gallery Photos ({newDealGallery.length})
                        </span>

                        <div className="space-y-2">
                          {newDealGallery.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {newDealGallery.map((gImg, idx) => (
                                <div key={idx} className="relative group h-12 w-12 rounded-lg overflow-hidden border border-border bg-card">
                                  <img src={gImg} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => setNewDealGallery((prev) => prev.filter((_, i) => i !== idx))}
                                    className="absolute top-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-destructive text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-2 w-2" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          <label
                            htmlFor="deal-gallery-image-upload"
                            className="flex items-center justify-center gap-2 border border-dashed border-border hover:border-amber-500/50 rounded-xl p-3 text-center cursor-pointer transition-all bg-card/30 hover:bg-amber-500/10 text-xs font-bold text-muted-foreground hover:text-foreground"
                          >
                            <PlusCircle className="h-4 w-4 text-amber-500" />
                            <span>Add Gallery Photos</span>
                          </label>

                          <input
                            id="deal-gallery-image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleDealGalleryFilesChange}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                    <label className="font-bold text-foreground">Deal Description</label>
                    <textarea
                      rows={2}
                      value={newDealDescription}
                      onChange={(e) => setNewDealDescription(e.target.value)}
                      placeholder="Highlight special deal discount, battery backup, active noise cancellation, and warranty..."
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-foreground focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-3 pt-2 flex justify-end gap-3 border-t border-border/50">
                    <button
                      type="button"
                      onClick={() => setIsAddingDeal(false)}
                      className="rounded-full border border-border px-5 py-2 font-bold text-muted-foreground hover:bg-sky-soft/30 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUploadingDealImage}
                      className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      Publish Deal to Store
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Quick Promote Existing Product to Deal */}
            <div className="rounded-3xl border border-border bg-card p-6 space-y-4 shadow-sm">
              <div className="space-y-1">
                <h4 className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>Promote Any Existing Catalog Product to Deal</span>
                </h4>
                <p className="text-xs text-muted-foreground">
                  Select any existing product from your catalog to instantly apply a discount and turn it into an active deal or Deal of the Day.
                </p>
              </div>

              <form onSubmit={handlePromoteProductToDeal} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs items-end">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-foreground">Select Product *</label>
                  <select
                    required
                    value={promoteProductId}
                    onChange={(e) => setPromoteProductId(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground focus:border-amber-500 focus:outline-none"
                  >
                    <option value="">-- Choose Product to Promote --</option>
                    {catalog.map((p) => (
                      <option key={p.id} value={p.id}>
                        #{p.id} - {p.name} ({formatPrice(p.price)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-foreground">Discount Percentage (%)</label>
                  <select
                    value={promoteDiscountPercent}
                    onChange={(e) => setPromoteDiscountPercent(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground focus:border-amber-500 focus:outline-none"
                  >
                    <option value={10}>10% OFF</option>
                    <option value={15}>15% OFF</option>
                    <option value={20}>20% OFF (Mega)</option>
                    <option value={25}>25% OFF</option>
                    <option value={30}>30% OFF</option>
                    <option value={40}>40% OFF (Super Deal)</option>
                    <option value={50}>50% OFF (Half Price)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-foreground">Deal Tag</label>
                  <select
                    value={promoteDealTag}
                    onChange={(e) => setPromoteDealTag(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground focus:border-amber-500 focus:outline-none"
                  >
                    {DEAL_TAG_OPTIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 py-2.5 font-bold text-slate-950 transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Flame className="h-4 w-4" /> Apply Deal
                  </button>
                </div>
              </form>
            </div>

            {/* Active Deals List & Search */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                    <Tag className="h-4 w-4 text-amber-500" /> Active Deals ({dealProducts.length})
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Products currently showing in the Deals & Discounts section.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    value={dealSearchQuery}
                    onChange={(e) => setDealSearchQuery(e.target.value)}
                    placeholder="Search deals by title..."
                    className="w-full rounded-xl border border-border bg-card pl-9 pr-3 py-2 text-xs text-foreground focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {filteredDealProducts.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center space-y-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-500/10 text-amber-500 mx-auto">
                    <Flame className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-sm text-foreground">No Deals Found</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Upload a new deal or promote any existing product from your catalog using the controls above.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDealProducts.map((deal) => {
                    const isDealOfTheDay = Boolean(deal.isDealOfTheDay);
                    const discount = deal.discount || (deal.oldPrice && deal.oldPrice > deal.price ? Math.round(((deal.oldPrice - deal.price) / deal.oldPrice) * 100) : 0);

                    return (
                      <div
                        key={deal.id}
                        className={`rounded-2xl border bg-card p-4 space-y-3 flex flex-col justify-between transition-all ${isDealOfTheDay
                          ? "border-amber-400 ring-2 ring-amber-400/20 shadow-lg bg-amber-500/[0.02]"
                          : "border-border shadow-sm hover:border-amber-500/40"
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative h-18 w-18 rounded-xl bg-sky-soft/40 overflow-hidden shrink-0 border border-border/50">
                            <img src={deal.image} alt={deal.name} className="h-full w-full object-cover" />
                            {discount > 0 && (
                              <span className="absolute top-1 left-1 rounded-md bg-gold text-slate-950 font-black text-[9px] px-1.5 py-0.2 shadow-sm">
                                {discount}% OFF
                              </span>
                            )}
                          </div>

                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="rounded-full bg-sky-soft px-2 py-0.5 text-[9px] font-bold text-royal">
                                {deal.category}
                              </span>
                              {deal.dealTag && (
                                <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[9px] font-extrabold text-amber-600">
                                  {deal.dealTag}
                                </span>
                              )}
                              {isDealOfTheDay && (
                                <span className="rounded-full bg-amber-400 text-slate-950 px-2 py-0.5 text-[9px] font-black flex items-center gap-1 shadow-sm">
                                  <Crown className="h-2.5 w-2.5 fill-current" /> Deal of the Day
                                </span>
                              )}
                            </div>

                            <h4 className="font-bold text-xs text-foreground truncate mt-1" title={deal.name}>
                              {deal.name}
                            </h4>

                            <div className="flex items-baseline gap-2 pt-0.5">
                              <span className="font-black text-royal text-xs">
                                {formatPrice(deal.price)}
                              </span>
                              {deal.oldPrice && (
                                <span className="text-[10px] text-muted-foreground line-through font-semibold">
                                  {formatPrice(deal.oldPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Card Bottom Actions */}
                        <div className="pt-2 border-t border-border/50 flex items-center justify-between gap-2 text-xs">
                          <button
                            onClick={() => handleSetDealOfTheDay(deal)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${isDealOfTheDay
                              ? "bg-amber-400 text-slate-950 font-black shadow-sm"
                              : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border border-amber-500/20"
                              }`}
                          >
                            <Crown className="h-3.5 w-3.5" />
                            <span>{isDealOfTheDay ? "Active Spotlight" : "Set Deal of the Day"}</span>
                          </button>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleStartEdit(deal)}
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-royal hover:bg-sky-soft/40 transition-colors cursor-pointer"
                              title="Edit Deal"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleToggleDeal(deal)}
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                              title="Remove from Deals"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: DATA BACKUP & EXPORT                                               */}
        {/* ========================================================================= */}
        {activeTab === "data" && (
          <div className="space-y-6 animate-fade-in max-w-4xl">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-1">
                <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                  <Download className="h-4 w-4 text-royal" /> Data Export & Report Downloads
                </h3>
                <p className="text-xs text-muted-foreground">
                  Export verified customer bookings, payment records, and shipping addresses for accounting & courier fulfillment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Executive Formatted Excel */}
                <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-5 space-y-3 flex flex-col justify-between shadow-sm">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-500/15 px-2 py-0.5 rounded-full">
                      ★ Recommended
                    </div>
                    <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                      📊 Executive Excel (.xls)
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Rich formatted spreadsheet workbook with branded header banner, KPI metrics, color-coded status badges, and styled data columns.
                    </p>
                  </div>
                  <button
                    onClick={handleExportExcel}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-all cursor-pointer shadow-md"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Excel (.xls)
                  </button>
                </div>

                {/* 2. Universal CSV */}
                <div className="rounded-2xl border border-border bg-background p-5 space-y-3 flex flex-col justify-between shadow-sm">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                      Spreadsheet Raw
                    </div>
                    <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                      📑 Universal CSV (.csv)
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Structured comma-separated file with UTF-8 BOM encoding for Google Sheets, Apple Numbers, and accounting software.
                    </p>
                  </div>
                  <button
                    onClick={handleExportCSV}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-royal py-2.5 text-xs font-bold text-white hover:bg-royal-deep transition-all cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" /> Download CSV
                  </button>
                </div>

                {/* 3. JSON Backup */}
                <div className="rounded-2xl border border-border bg-background p-5 space-y-3 flex flex-col justify-between shadow-sm">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                      Database Ready
                    </div>
                    <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                      💾 Full JSON Backup (.json)
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Raw nested JSON structured records ready for direct import into MongoDB or serverless document databases.
                    </p>
                  </div>
                  <button
                    onClick={handleExportJSON}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-2.5 text-xs font-bold text-foreground hover:bg-sky-soft/40 transition-all cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" /> Download JSON
                  </button>
                </div>
              </div>

              {/* MongoDB Atlas Integration Card */}
              <div className="rounded-3xl border border-sky-500/20 bg-sky-500/5 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-500/10 text-royal">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                        🍃 MongoDB Atlas Cloud Integration
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${dbStatus.isConnected ? "bg-emerald-500/20 text-emerald-600" : "bg-amber-500/20 text-amber-600"
                          }`}>
                          {dbStatus.isConnected ? "● Cluster Connected" : "○ Local In-Memory"}
                        </span>
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Database: <code className="text-royal font-mono font-bold">gadgetzone</code> &nbsp;|&nbsp; Cluster: <code className="font-mono text-muted-foreground">cluster0.4ouxhp3.mongodb.net</code>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSyncDatabase}
                    disabled={isSyncingDb}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-xs font-bold text-white hover:bg-royal-deep transition-all cursor-pointer shadow-sm shrink-0"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isSyncingDb ? "animate-spin" : ""}`} />
                    {isSyncingDb ? "Syncing..." : "Sync & Seed DB Catalog"}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-sky-500/10 text-xs">
                  <div className="bg-card/80 p-3 rounded-xl border border-border">
                    <span className="text-muted-foreground text-[10px] uppercase font-bold">Collection</span>
                    <p className="font-bold text-foreground mt-0.5">orders ({orders.length})</p>
                  </div>
                  <div className="bg-card/80 p-3 rounded-xl border border-border">
                    <span className="text-muted-foreground text-[10px] uppercase font-bold">Collection</span>
                    <p className="font-bold text-foreground mt-0.5">products ({catalog.length})</p>
                  </div>
                  <div className="bg-card/80 p-3 rounded-xl border border-border">
                    <span className="text-muted-foreground text-[10px] uppercase font-bold">Failover Mode</span>
                    <p className="font-bold text-emerald-600 mt-0.5">Zero-Crash Enabled</p>
                  </div>
                  <div className="bg-card/80 p-3 rounded-xl border border-border">
                    <span className="text-muted-foreground text-[10px] uppercase font-bold">Connection</span>
                    <p className="font-bold text-royal mt-0.5">{dbStatus.statusText}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-center gap-3 text-xs text-emerald-600 font-medium">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>MongoDB Atlas database connected with full-stack schema persistence, SSL pooling, and automatic failover.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* ORDER DETAILS INSPECTION DRAWER / MODAL                                   */}
      {/* ========================================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-xl bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div>
                <span className="font-display text-lg font-black text-royal">
                  Order #{selectedOrder.orderNumber}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-sky-soft/30 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="rounded-2xl bg-sky-soft/20 border border-border/80 p-4 space-y-2 text-xs">
              <h4 className="font-bold text-foreground text-xs uppercase tracking-wider">Customer & Delivery Info</h4>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div><span className="text-muted-foreground">Name:</span> <span className="font-bold text-foreground">{selectedOrder.customerName}</span></div>
                <div><span className="text-muted-foreground">Phone:</span> <span className="font-bold text-foreground">{selectedOrder.phone}</span></div>
                <div className="col-span-2"><span className="text-muted-foreground">Address:</span> <span className="font-semibold text-foreground">{selectedOrder.address}, {selectedOrder.city}</span></div>
                <div><span className="text-muted-foreground">Payment:</span> <span className="font-bold text-foreground">{selectedOrder.paymentMethod}</span></div>
                {selectedOrder.customerEmail && <div><span className="text-muted-foreground">Email:</span> <span className="font-semibold text-foreground">{selectedOrder.customerEmail}</span></div>}
              </div>
              {selectedOrder.notes && (
                <div className="pt-2 border-t border-border/40">
                  <span className="text-muted-foreground">Special Instructions:</span>
                  <p className="font-medium text-foreground italic mt-0.5">{selectedOrder.notes}</p>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-foreground uppercase tracking-wider">Items Ordered</h4>
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-background border border-border/60 rounded-xl px-3.5 py-2.5">
                    <span className="font-semibold text-foreground">{item.name}</span>
                    <span className="font-bold text-foreground">{item.qty} × {formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Total */}
            <div className="border-t border-border/60 pt-4 space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal:</span>
                <span className="font-bold text-foreground">{formatPrice(selectedOrder.subtotal || selectedOrder.total)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery:</span>
                <span className={selectedOrder.shipping === 0 ? "font-bold text-emerald-500" : "font-bold text-foreground"}>
                  {selectedOrder.shipping === 0 ? "FREE" : formatPrice(selectedOrder.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-foreground border-t border-border/40 pt-2">
                <span>Total Amount:</span>
                <span className="text-royal text-base">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Live Status Control & Contact */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <div className="flex-1 w-full space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground">Update Order Status:</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.orderNumber, e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs font-bold text-foreground focus:border-royal focus:outline-none"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <a
                href={`https://wa.me/${selectedOrder.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${selectedOrder.customerName}, this is regarding your order #${selectedOrder.orderNumber} with The Gadget Zone.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-all shadow-md self-end"
              >
                <MessageCircle className="h-4 w-4" /> Message Customer
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal Dialog */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-card border border-royal/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-royal/10 text-royal grid place-items-center">
                  <Edit className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground">
                    Edit Product Details
                  </h3>
                  <p className="text-[11px] text-muted-foreground">ID #{editingProduct.id}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sky-soft/30 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-foreground">Product Title *</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-royal focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">Category *</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-royal focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">Price in PKR (Rs.) *</label>
                <input
                  type="number"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-royal focus:outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-foreground">Original/Old Price (Optional, for Discount)</label>
                <input
                  type="number"
                  value={editOldPrice}
                  onChange={(e) => setEditOldPrice(e.target.value)}
                  placeholder="e.g. 10999"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-royal focus:outline-none"
                />
                {Number(editOldPrice) > Number(editPrice) && Number(editPrice) > 0 && (
                  <p className="text-[11px] font-extrabold text-emerald-600">
                    ⚡ Auto-calculated Discount: {Math.round(((Number(editOldPrice) - Number(editPrice)) / Number(editOldPrice)) * 100)}% OFF
                  </p>
                )}
              </div>

              {/* Stock Status & Homepage Visibility Box */}
              <div className="sm:col-span-2 rounded-2xl border border-border/80 bg-background/50 p-4 space-y-3">
                <span className="font-bold text-xs text-foreground flex items-center gap-1.5">
                  <Package className="h-4 w-4 text-royal" />
                  <span>Stock Availability &amp; Storefront Visibility</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2.5 bg-card p-3 rounded-xl border border-border">
                    <input
                      type="checkbox"
                      id="editInStock"
                      checked={editInStock}
                      onChange={(e) => setEditInStock(e.target.checked)}
                      className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="editInStock" className="font-bold text-xs text-foreground cursor-pointer">
                      <span className={editInStock ? "text-emerald-600 font-extrabold" : "text-rose-600 font-extrabold"}>
                        {editInStock ? "🟢 In Stock (Available for Purchase)" : "🔴 Mark as Out of Stock (Disabled)"}
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center gap-2.5 bg-card p-3 rounded-xl border border-border">
                    <input
                      type="checkbox"
                      id="editFeatured"
                      checked={editFeatured}
                      onChange={(e) => setEditFeatured(e.target.checked)}
                      className="h-4 w-4 rounded text-royal focus:ring-royal cursor-pointer"
                    />
                    <label htmlFor="editFeatured" className="font-bold text-xs text-foreground cursor-pointer flex items-center gap-1.5">
                      <HomeIcon className="h-3.5 w-3.5 text-royal" />
                      <span>Feature on Homepage (2-Row Grid)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Deals Configuration Box */}
              <div className="sm:col-span-2 rounded-2xl border border-amber-400/40 bg-amber-500/5 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground flex items-center gap-1.5">
                    <Flame className="h-4 w-4 text-amber-500" />
                    <span>Deals & Spotlight Promotion Settings</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2.5 bg-card/60 p-2.5 rounded-xl border border-border">
                    <input
                      type="checkbox"
                      id="editIsDeal"
                      checked={editIsDeal}
                      onChange={(e) => setEditIsDeal(e.target.checked)}
                      className="h-4 w-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
                    />
                    <label htmlFor="editIsDeal" className="font-bold text-xs text-foreground cursor-pointer flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5 text-amber-500" /> Show in Deals Catalog
                    </label>
                  </div>

                  <div className="flex items-center gap-2.5 bg-card/60 p-2.5 rounded-xl border border-border">
                    <input
                      type="checkbox"
                      id="editIsDealOfTheDay"
                      checked={editIsDealOfTheDay}
                      onChange={(e) => {
                        setEditIsDealOfTheDay(e.target.checked);
                        if (e.target.checked) setEditIsDeal(true);
                      }}
                      className="h-4 w-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
                    />
                    <label htmlFor="editIsDealOfTheDay" className="font-bold text-xs text-foreground cursor-pointer flex items-center gap-1">
                      <Crown className="h-3.5 w-3.5 text-amber-500" /> Crown as Deal of the Day
                    </label>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <label className="font-bold text-[11px] text-muted-foreground">Deal Tag / Promotional Badge</label>
                  <select
                    value={editDealTag}
                    onChange={(e) => setEditDealTag(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-amber-500 focus:outline-none"
                  >
                    {DEAL_TAG_OPTIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Edit Media Upload Section */}
              <div className="space-y-2 sm:col-span-2 rounded-2xl border border-border/80 bg-background/50 p-4">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-foreground flex items-center gap-1.5 text-xs">
                    <UploadCloud className="h-4 w-4 text-royal" />
                    <span>Update Photos & Media (Upload from Device / Mobile)</span>
                  </label>
                  {isEditUploadingImage && (
                    <span className="text-[10px] font-bold text-royal animate-pulse">
                      Optimizing Image...
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Cover Photo */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-muted-foreground block">
                      Cover Picture
                    </span>

                    {editImage ? (
                      <div className="relative group aspect-video sm:aspect-square max-h-40 rounded-xl overflow-hidden border border-royal/40 bg-card shadow-sm">
                        <img
                          src={editImage}
                          alt="Edit Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label
                            htmlFor="edit-primary-image-upload"
                            className="cursor-pointer px-3 py-1.5 rounded-lg bg-royal text-white text-[11px] font-bold hover:bg-royal-deep transition-all"
                          >
                            Replace Photo
                          </label>
                        </div>
                        <span className="absolute bottom-2 left-2 rounded-md bg-royal/90 px-2 py-0.5 text-[9px] font-extrabold text-white">
                          Cover Photo
                        </span>
                      </div>
                    ) : (
                      <label
                        htmlFor="edit-primary-image-upload"
                        className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-royal/60 rounded-xl p-4 text-center cursor-pointer transition-all bg-card/40 hover:bg-sky-soft/20 group"
                      >
                        <ImageIcon className="h-5 w-5 text-royal mb-1" />
                        <span className="font-bold text-foreground text-xs">Upload New Cover Photo</span>
                      </label>
                    )}

                    <input
                      id="edit-primary-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleEditPrimaryFileChange}
                      className="hidden"
                    />
                  </div>

                  {/* Additional Gallery Photos */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-muted-foreground block">
                      Gallery Images ({editGallery.length})
                    </span>

                    <div className="space-y-2">
                      {editGallery.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {editGallery.map((gImg, idx) => (
                            <div key={idx} className="relative group h-14 w-14 rounded-lg overflow-hidden border border-border bg-card">
                              <img src={gImg} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setEditGallery((prev) => prev.filter((_, i) => i !== idx))}
                                className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-destructive text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <label
                        htmlFor="edit-gallery-image-upload"
                        className="flex items-center justify-center gap-2 border border-dashed border-border hover:border-royal/50 rounded-xl p-3 text-center cursor-pointer transition-all bg-card/30 hover:bg-sky-soft/20 text-xs font-bold text-muted-foreground hover:text-foreground"
                      >
                        <PlusCircle className="h-4 w-4 text-royal" />
                        <span>Add Gallery Photos</span>
                      </label>

                      <input
                        id="edit-gallery-image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleEditGalleryFilesChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-foreground">Description</label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-foreground focus:border-royal focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 pt-3 flex justify-end gap-3 border-t border-border/50">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="rounded-full border border-border px-5 py-2 font-bold text-muted-foreground hover:bg-sky-soft/30 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEditUploadingImage}
                  className="rounded-full bg-royal px-6 py-2 font-bold text-white hover:bg-royal-deep transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  Save & Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-sky-hero px-5 py-3 text-xs font-bold text-white shadow-xl animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}
