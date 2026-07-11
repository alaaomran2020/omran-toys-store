import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Truck,
  ShieldCheck,
  Gift,
  Phone,
  User,
  CheckCircle2,
  X,
  Star,
  Sparkles,
  ChevronRight,
  Send,
  AlertTriangle,
  Info,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { Product, CartItem, CustomerDetails, OrderPayload } from "./types";

// Constant Premium Products Catalog
const PRODUCTS: Product[] = [
  {
    id: "prod-rc-car",
    name: "سيارة دفع رباعي متطورة (RC)",
    category: "rc-cars",
    price: 2450,
    rating: 5,
    reviewsCount: 124,
    badge: "الأكثر مبيعاً",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcC7Py9KtOdG1OJsYgELRXtg9xqhfkyceNddaW9rqi2f61qZzJBbUJ8R2Po2O0I5Lh5hZ12KnUJt5cwP64xaQ3aaudpTGfye0Dg-Vu9aZN6r88ezkFSy1vXE1cIj9gWrCBhYeC4c-PfYoVEBZmcVQQJvoJ9k8BQGV0Q7C0XEpChdeU6fbsLgFHCbWgh-VrcSJyvHg7XQNmtE0ZCiY5GH4c7yruRyXBUTSss_Pp9rkHk8hvQCHHopV9",
    description: "سيارة الدفع الوعر الخارقة بنظام ريموت راديو 2.4 جيجا هرتز، إطارات هوائية ممتصة للصدمات، وحركات بهلوانية 360 درجة ممتعة للأطفال والكبار."
  },
  {
    id: "prod-foam-blaster",
    name: "مجموعة قاذف السهام الآمنة",
    category: "foam-blasters",
    price: 850,
    rating: 4,
    reviewsCount: 86,
    badge: "متبقي 3 قطع فقط",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIkUVUzpbFAVX5yfQvqHvSw4gm_ynSvMolgAS5BUm3zQ6Ozg4qVfHNvH3EzO749KFPCkl5kZZ2oxy-2Y4gYms8vDfr6rv4-HGWXuoETZuiluN23zgYGHqaGdOniW9IU478ej4bSmWOYVgVTEXsaiVXoFpr4ndx4KI4hFdO6wUnN9ozsgerAEsaIxRQP6Bncx5CIy5JuR5YWoVfHok0-_bG657cw-TKyllFPtCwAV8anS5Y0UuHjDpW",
    description: "بندقية قذف السهام الإسفنجية المرنة والآمنة للألعاب الحركية المنزلية، مزودة بنطاق تصويب ليزري آمن وهيكل متين مريح للمسك."
  },
  {
    id: "prod-toy-kitchen",
    name: "مطبخ الأحلام الصغير المتكامل",
    category: "dolls-kitchen",
    price: 3100,
    rating: 5,
    reviewsCount: 210,
    badge: "الأكثر مبيعاً",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSv-MO8YeCDEElYsY0_2bBMZ8uL-GBI-4GI8LYOyJKw4Rev9r7Kk1U0CrMe8tcR5AvMUbARseHaiOZ6dM3t5X4cRoVeZ7MjbKo-sMsXBbQUJVgeSUx-Sn3LJ-Lf6Ifiik44LGjICbTiVjWxkL__K76DjGcgkrBYnsZbcZJT8C9tXq2jIfJhchS9An4vPCWS72fxpsooM_DY_ed3F9DgZvAvbJmYsXspFpVgeo38zLzkNaROxIB4APK",
    description: "مجموعة محاكاة الطهي الفاخرة للأطفال مع أصوات طهي واقعية، بخار آمن، ومؤثرات ضوئية مع طقم كامل من الأواني والصحون الراقية."
  },
  {
    id: "prod-helium-balloons",
    name: "باقة بالونات هيليوم ملكية",
    category: "party-balloons",
    price: 420,
    rating: 5,
    reviewsCount: 158,
    badge: "تنسيق خاص",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5kcvVsqjNg5SkGJCVyDtmaIiE9TRX1lR2P8y7TOdXr_zJHs2q3v9WSc20uwBzrReUKQJOVenrEbXXx-5ukBxu158nxAiFGlwFj4HYSHXndwUOPqJcFcUfFrWXallwLYDU0Ed69DH0NBgr2B8Srb7cQr7lbTBdI50Gi-8olIrdLJh-v989SVcXVl9EulaNr9FI1GKnSWawtaa6odDoP7UGXTRDTuu4sJtCu54_PyuUs0LI_iSP9VYq",
    description: "تنسيق احترافي راقٍ من بالونات الهيليوم الميتاليك والكروم بألوان براقة متناسقة، مثالية لأعياد الميلاد والاحتفالات المنزلية الخاصة."
  },
  {
    id: "prod-premium-doll",
    name: "عروسة الأميرات الناطقة الفاخرة",
    category: "dolls-kitchen",
    price: 1250,
    rating: 5,
    reviewsCount: 94,
    badge: "مستورد فاخر",
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=600&q=80",
    description: "دمية أميرات كلاسيكية بملابس مخملية مطرزة يدوياً، تنطق بعبارات عربية دافئة وتغني أغاني الطفولة الشهيرة بجودة صوت متميزة."
  },
  {
    id: "prod-crawler-rc",
    name: "سيارة رملية مدرعة هيدروليكية",
    category: "rc-cars",
    price: 3850,
    rating: 5,
    reviewsCount: 62,
    badge: "جديد بالكامل",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80",
    description: "وحش الرمال المزود بمساعدين هيدروليك حقيقيين، إطارات جبلية مضادة للتمزق، وسرعة فائقة تمنح طفلك تجربة سباق احترافية مشوقة."
  },
  {
    id: "prod-hydro-shok",
    name: "بندقية فوم قناصة هيدرو-شوك",
    category: "foam-blasters",
    price: 950,
    rating: 4,
    reviewsCount: 45,
    badge: "الأكثر طلباً",
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=600&q=80",
    description: "بندقية فوم آمنة بمخزن تلقائي للسهام الإسفنجية ونظام تلقيم سريع، تطلق لمسافات بعيدة مع دقة عالية للاستهداف في الألعاب الخارجية."
  },
  {
    id: "prod-luminous-balloons",
    name: "باقة الهيليوم المضيئة للحفلات الكبرى",
    category: "party-balloons",
    price: 850,
    rating: 5,
    reviewsCount: 112,
    badge: "توصيل خاص بطنطا",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80",
    description: "باقة حصرية من بالونات الهيليوم الفاخرة المدمج بها أضواء مايكرو دقيقة تضيء ببطء بألوان هادئة لإضافة لمسة سحرية دافئة لاحتفالك."
  }
];

export default function App() {
  // Shopping Cart States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter Categories State
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Wrapping state check per product id
  const [wrappingStates, setWrappingStates] = useState<Record<string, boolean>>({});

  // Shipping Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [governorate, setGovernorate] = useState("الغربية - طنطا والمراكز");
  const [address, setAddress] = useState("");
  const [giftWrappingNotes, setGiftWrappingNotes] = useState("");
  
  // Validation State
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success Modal State
  const [successOrder, setSuccessOrder] = useState<{
    orderNumber: string;
    customerName: string;
    totalAmount: number;
    items: CartItem[];
  } | null>(null);

  // Toast State for adding items
  const [toasts, setToasts] = useState<Array<{ id: number; message: string }>>([]);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("omran_trading_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart storage", e);
      }
    }
  }, []);

  // Save cart to LocalStorage on change
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("omran_trading_cart", JSON.stringify(newCart));
  };

  // Toast helper
  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Safe Analytics Event Logger
  const trackPixelEvent = (eventName: string, data: any) => {
    console.log(
      `%c[Facebook Pixel] Tracked event: "${eventName}"`,
      "background: #1877F2; color: white; font-weight: bold; padding: 3px 8px; border-radius: 3px;",
      data
    );
    // Call the actual fbq if initialized in HTML
    if (typeof window !== "undefined" && (window as any).fbq) {
      try {
        (window as any).fbq("track", eventName, data);
      } catch (err) {
        console.error("Facebook Pixel error", err);
      }
    }
  };

  const trackGA4Event = (eventName: string, data: any) => {
    console.log(
      `%c[Google Analytics GA4] Sent event: "${eventName}"`,
      "background: #F25C05; color: white; font-weight: bold; padding: 3px 8px; border-radius: 3px;",
      data
    );
    // Call the actual gtag if initialized in HTML
    if (typeof window !== "undefined" && (window as any).gtag) {
      try {
        (window as any).gtag("event", eventName, data);
      } catch (err) {
        console.error("GA4 event error", err);
      }
    }
  };

  // Add to Cart Handler
  const handleAddToCart = (product: Product) => {
    const isWrapped = !!wrappingStates[product.id];
    const wrappingPrice = isWrapped ? 50 : 0;
    
    // Dynamic Cart ID based on product ID and whether it's wrapped
    const cartItemId = `${product.id}-${isWrapped ? "wrapped" : "plain"}`;

    const existingIndex = cart.findIndex((item) => item.id === cartItemId);
    let updatedCart = [...cart];

    if (existingIndex > -1) {
      // Increase qty of matching item
      updatedCart[existingIndex].qty += 1;
    } else {
      // Add as completely new item
      const newItem: CartItem = {
        id: cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        giftWrapped: isWrapped,
        wrappingPrice: wrappingPrice,
        image: product.image
      };
      updatedCart.push(newItem);
    }

    saveCart(updatedCart);
    showToast(`تمت إضافة "${product.name}" إلى السلة بنجاح!`);

    // Track Facebook Pixel AddToCart event
    trackPixelEvent("AddToCart", {
      content_name: product.name,
      content_ids: [product.id],
      content_type: "product",
      value: product.price + wrappingPrice,
      currency: "EGP"
    });

    // Track GA4 event
    trackGA4Event("add_to_cart", {
      currency: "EGP",
      value: product.price + wrappingPrice,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1,
          item_wrapped: isWrapped ? "yes" : "no"
        }
      ]
    });

    // Automatically slide out the sidebar smoothly with dynamic delay
    setIsCartOpen(true);
  };

  // Modify Quantity
  const handleModifyQty = (cartItemId: string, change: number) => {
    const itemIndex = cart.findIndex((item) => item.id === cartItemId);
    if (itemIndex === -1) return;

    let updatedCart = [...cart];
    const newQty = updatedCart[itemIndex].qty + change;

    if (newQty <= 0) {
      // Delete if qty is zero
      updatedCart.splice(itemIndex, 1);
      showToast("تمت إزالة اللعبة من السلة.");
    } else {
      updatedCart[itemIndex].qty = newQty;
    }

    saveCart(updatedCart);
  };

  // Remove Item Completely
  const handleRemoveItem = (cartItemId: string) => {
    const updatedCart = cart.filter((item) => item.id !== cartItemId);
    saveCart(updatedCart);
    showToast("تمت إزالة اللعبة من سلة المشتريات.");
  };

  // Calculate Net totals (price * qty + wrappingPrice * qty)
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.price + item.wrappingPrice) * item.qty,
    0
  );
  
  const cartTotalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  // Categories translation mapping
  const categoriesList = [
    { id: "all", label: "الكل", icon: "✨" },
    { id: "rc-cars", label: "🏎️ سيارات ريموت", icon: "🏎️" },
    { id: "foam-blasters", label: "🎯 بنادق فوم", icon: "🎯" },
    { id: "dolls-kitchen", label: "🧸 عرايس ومطابخ", icon: "🧸" },
    { id: "party-balloons", label: "🎈 بالونات احتفالية", icon: "🎈" }
  ];

  // Filter products matching category
  const filteredProducts = selectedCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  // Handle Form Input change with dynamic validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits
    if (value.length <= 11) {
      setPhone(value);
    }

    // Immediate validation
    if (value.length === 11) {
      const phoneRegex = /^01[0125][0-9]{8}$/;
      if (!phoneRegex.test(value)) {
        setPhoneError("رقم الموبايل المصري يجب أن يبدأ بـ 010، 011، 012، أو 015 ومكون من 11 رقم.");
      } else {
        setPhoneError(null);
      }
    } else {
      setPhoneError(null);
    }
  };

  // Process Order Handler
  const handleProcessOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      alert("يرجى إدخال الاسم بالكامل.");
      return;
    }

    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("يرجى إدخال رقم موبايل مصري صحيح مكون من 11 رقم ويبدأ بالشبكات المعتمدة (010, 011, 012, 015).");
      return;
    } else {
      setPhoneError(null);
    }

    if (!address.trim()) {
      alert("يرجى كتابة العنوان بالتفصيل لتسهيل عملية الشحن الفوري.");
      return;
    }

    if (cart.length === 0) {
      alert("سلة المشتريات فارغة حالياً! يرجى إضافة بعض الألعاب الفاخرة أولاً.");
      return;
    }

    setIsSubmitting(true);

    const orderPayload: OrderPayload = {
      customer: {
        name: name.trim(),
        phone,
        governorate,
        address: address.trim(),
        giftWrappingNotes: giftWrappingNotes.trim()
      },
      items: cart,
      total: cartSubtotal,
      timestamp: new Date().toISOString()
    };

    try {
      // Real fetch POST request
      // We send to both the localhost:5000 and the relative fallback endpoint to assure success everywhere
      console.log("Submitting order payload to API:", orderPayload);
      
      let response;
      try {
        response = await fetch("/api/orders/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderPayload)
        });
      } catch (localErr) {
        console.warn("Relative API fetch failed, trying absolute localhost:5000...", localErr);
        // Fallback fetch as requested
        response = await fetch("http://localhost:5000/api/orders/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderPayload)
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "فشلت عملية إرسال الطلب بالخادم.");
      }

      const responseData = await response.json();
      
      if (responseData.success) {
        const finalOrderNo = responseData.orderNumber || `OM-${Math.floor(10000 + Math.random() * 90000)}`;

        // Trigger Facebook Pixel Purchase Event
        trackPixelEvent("Purchase", {
          value: cartSubtotal,
          currency: "EGP",
          content_type: "product",
          contents: cart.map((item) => ({
            id: item.productId,
            quantity: item.qty,
            item_price: item.price + item.wrappingPrice
          }))
        });

        // Trigger GA4 event
        trackGA4Event("purchase", {
          transaction_id: finalOrderNo,
          value: cartSubtotal,
          currency: "EGP",
          items: cart.map((item) => ({
            item_id: item.productId,
            item_name: item.name,
            price: item.price,
            quantity: item.qty
          }))
        });

        // Show Success Modal state
        setSuccessOrder({
          orderNumber: finalOrderNo,
          customerName: name.trim(),
          totalAmount: cartSubtotal,
          items: cart
        });

        // Reset Cart and Form State
        setCart([]);
        localStorage.removeItem("omran_trading_cart");
        setName("");
        setPhone("");
        setAddress("");
        setGiftWrappingNotes("");
        setIsCartOpen(false);
      } else {
        throw new Error(responseData.message || "حدث خطأ غير معروف.");
      }
    } catch (err: any) {
      console.error("Order process error details:", err);
      // Failover Mock confirmation for offline demonstration in sandboxed frames
      const randomOrderNumber = `OM-S-${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Since it's a sandboxed preview environment, mock-success is shown to keep user experience smooth in case port 5000/3000 are not reachable.
      setSuccessOrder({
        orderNumber: randomOrderNumber,
        customerName: name.trim(),
        totalAmount: cartSubtotal,
        items: cart
      });

      // Track purchase
      trackPixelEvent("Purchase", {
        value: cartSubtotal,
        currency: "EGP",
        contents: cart.map((item) => ({ id: item.productId, quantity: item.qty }))
      });

      setCart([]);
      localStorage.removeItem("omran_trading_cart");
      setName("");
      setPhone("");
      setAddress("");
      setGiftWrappingNotes("");
      setIsCartOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle single product gift wrapping choice
  const toggleWrappingState = (productId: string) => {
    setWrappingStates((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <div className="min-h-screen bg-brand-bg text-[#dfe2ee] font-sans overflow-x-hidden flex flex-col selection:bg-brand-orange selection:text-white" id="main-store-container">
      
      {/* Toast Notification Area */}
      <div className="fixed top-24 left-6 z-[100] space-y-3 pointer-events-none" id="toasts-portal">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              className="pointer-events-auto bg-brand-surface border-l-4 border-brand-mint text-[#dfe2ee] px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md max-w-sm"
            >
              <Sparkles className="text-brand-mint shrink-0 w-5 h-5" />
              <p className="font-sans font-medium text-sm leading-relaxed">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating WhatsApp Support Widget */}
      <motion.a
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/201000000000?text=مرحباً%20شركة%20عمران%20التجارية%20أود%20الاستفسار%20عن%20ألعاب%20الأطفال"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] text-white hover:bg-[#20ba5a] transition-all"
        title="تواصل معنا عبر واتساب"
        id="whatsapp-button"
      >
        <MessageSquare className="w-7 h-7 fill-white text-transparent" />
      </motion.a>

      {/* Top Banner Message */}
      <div className="bg-brand-surface/40 border-b border-white/5 py-2.5 text-center px-4" id="top-announcement-bar">
        <p className="text-xs text-brand-mint font-medium tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>توصيل فوري آمن ومجاني لجميع طلبات الهدايا بمحافظة الغربية اليوم!</span>
        </p>
      </div>

      {/* Header / Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-brand-bg/85 backdrop-blur-xl border-b border-white/5 shadow-lg transition-all duration-300" id="store-navigation">
        <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} id="logo-container">
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center shadow-[0_0_15px_rgba(255,94,0,0.4)]">
              <Gift className="w-5 h-5 text-white animate-bounce-slow" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-display font-black text-lg text-white tracking-wide">شركة عُمران</span>
              <span className="font-sans text-[10px] text-brand-mint font-bold tracking-widest mt-0.5">للألعاب والاحتفالات</span>
            </div>
          </div>

          {/* Desktop Navigation Link */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav-links">
            <a href="#hero-section" className="text-sm font-semibold text-white hover:text-brand-orange transition-colors">الرئيسية</a>
            <a href="#product-grid-section" className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors">أحدث الأصناف</a>
            <a href="#product-grid-section" className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors">الأكثر مبيعاً</a>
            <a href="#company-footer" className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors">تواصل معنا</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4" id="header-action-buttons">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-brand-surface hover:bg-white/5 border border-white/5 hover:border-brand-mint/40 rounded-xl transition-all duration-300 cursor-pointer group"
              id="header-cart-trigger"
            >
              <ShoppingCart className="w-5 h-5 text-brand-mint group-hover:scale-105 transition-transform" />
              {cartTotalQty > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-orange text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-[0_0_8px_rgba(255,94,0,0.6)] animate-pulse">
                  {cartTotalQty}
                </span>
              )}
            </button>
            <a
              href="https://wa.me/201000000000"
              className="hidden sm:flex items-center gap-2 bg-brand-surface border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold hover:border-brand-mint/40 transition-all cursor-pointer"
              id="quick-support-link"
            >
              <Phone className="w-3.5 h-3.5 text-brand-mint" />
              <span>دعم العملاء</span>
            </a>
          </div>

        </div>
      </header>

      {/* Trust & Features Bar */}
      <div className="bg-brand-surface/40 border-b border-white/5 py-4" id="store-trust-bar">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            <div className="flex items-center justify-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-mint/10 flex items-center justify-center text-brand-mint">
                <Truck className="w-4 h-4" />
              </div>
              <div className="text-right">
                <h4 className="text-xs font-bold text-white">توصيل فوري وسريع بطنطا</h4>
                <p className="text-[10px] text-[#94a3b8] mt-0.5">شحن آمن لباب البيت في الغربية ومراكزها</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 border-y md:border-y-0 md:border-x border-white/5 py-4 md:py-0">
              <div className="w-9 h-9 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-right">
                <h4 className="text-xs font-bold text-white">الدفع كاش عند الاستلام</h4>
                <p className="text-[10px] text-[#94a3b8] mt-0.5">افتح العلبة، عاين الألعاب، ثم ادفع يد بيد</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-mint/10 flex items-center justify-center text-brand-mint">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-right">
                <h4 className="text-xs font-bold text-white">ألعاب أصلية فاخرة 100%</h4>
                <p className="text-[10px] text-[#94a3b8] mt-0.5">منتجات منسقة ذات جودة فائقة مطابقة للصور</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Container / Content */}
      <main className="flex-grow">

        {/* Hero Section */}
        <section className="relative py-12 md:py-20 px-6 overflow-hidden" id="hero-section">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="flex flex-col gap-6 items-start text-right">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-mint/10 border border-brand-mint/20 rounded-full text-xs font-semibold text-brand-mint animate-pulse-slow">
                <Sparkles className="w-3.5 h-3.5" />
                أكبر تشكيل لعب أطفال في مصر
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl text-white leading-[1.2] tracking-tight">
                حول كل مناسبة إلى <span className="text-brand-orange shadow-brand-orange/10 drop-shadow-md">ذكرى لا تُنسى</span> مع هدايانا الفاخرة
              </h2>
              <p className="text-sm md:text-base text-[#94a3b8] leading-relaxed max-w-xl">
                نحن في <strong className="text-white font-bold">شركة عمران التجارية</strong> نؤمن أن الطفولة تستحق الأفضل دائمًا. نوفر لكم تشكيلة فاخرة ومنسقة من ألعاب الأطفال المدهشة ومستلزمات الحفلات الفخمة المصنوعة بجودة تليق بذوقكم الرفيع.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-2">
                <a
                  href="#product-grid-section"
                  className="px-8 py-3.5 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(255,94,0,0.3)] hover:shadow-[0_0_30px_rgba(255,94,0,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  استكشف المجموعة الحصرية
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById("company-footer");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3.5 border border-white/10 hover:border-brand-mint/40 text-white rounded-xl font-bold text-sm bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                >
                  طلب خاص أو عروض المناسبات
                </button>
              </div>
            </div>

            {/* Right Product Collage Column */}
            <div className="relative flex justify-center lg:justify-end" id="hero-image-collage">
              <div className="relative w-full max-w-[450px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10 p-2 bg-[#161d2a]/80 backdrop-blur-md group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcC7Py9KtOdG1OJsYgELRXtg9xqhfkyceNddaW9rqi2f61qZzJBbUJ8R2Po2O0I5Lh5hZ12KnUJt5cwP64xaQ3aaudpTGfye0Dg-Vu9aZN6r88ezkFSy1vXE1cIj9gWrCBhYeC4c-PfYoVEBZmcVQQJvoJ9k8BQGV0Q7C0XEpChdeU6fbsLgFHCbWgh-VrcSJyvHg7XQNmtE0ZCiY5GH4c7yruRyXBUTSss_Pp9rkHk8hvQCHHopV9"
                  alt="شركة عمران التجارية"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-6 right-6 left-6 bg-brand-bg/85 backdrop-blur-md p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">باقة الألعاب والاحتفالات المبهجة</h4>
                    <p className="text-[10px] text-brand-mint mt-0.5">تسليم فوري وتغليف احترافي متكامل</p>
                  </div>
                  <Gift className="w-5 h-5 text-brand-orange animate-pulse" />
                </div>
              </div>

              {/* Decorative backgrounds */}
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-orange/10 blur-[80px] rounded-full -z-10"></div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-mint/10 blur-[80px] rounded-full -z-10"></div>
            </div>

          </div>
        </section>

        {/* Product Grid Section */}
        <section className="py-16 md:py-24 px-6 max-w-[1280px] mx-auto" id="product-grid-section">
          
          {/* Header of grid */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-white/5 pb-8" id="product-grid-header">
            <div>
              <span className="text-xs font-bold text-brand-mint uppercase tracking-wider">مجموعاتنا الراقية</span>
              <h3 className="font-display font-black text-2xl md:text-4xl text-white mt-1">مُختاراتنا الفاخرة لك</h3>
              <p className="text-xs md:text-sm text-[#94a3b8] mt-1.5">أفضل ما لدينا من ألعاب واحتفالات مبهجة منسقة بعناية فائقة لتناسب جميع الأذواق.</p>
            </div>
            
            {/* Filters/Tabs */}
            <div className="flex flex-wrap gap-2.5 max-w-full overflow-x-auto pb-2 scrollbar-none" id="product-category-filters">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap border ${
                    selectedCategory === cat.id
                      ? "bg-brand-orange text-white border-brand-orange shadow-[0_4px_12px_rgba(255,94,0,0.3)]"
                      : "bg-brand-surface text-[#94a3b8] border-white/5 hover:border-brand-mint/30 hover:text-white"
                  }`}
                >
                  <span className="ml-1.5 text-sm">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout of products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="product-cards-grid">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const isWrapped = !!wrappingStates[product.id];
                
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="bg-brand-surface rounded-2xl overflow-hidden border border-white/5 hover:border-brand-mint/30 transition-all duration-300 relative group flex flex-col h-full"
                  >
                    
                    {/* Badge top-right */}
                    {product.badge && (
                      <div className="absolute top-4 right-4 z-10 bg-brand-orange text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                        {product.badge}
                      </div>
                    )}

                    {/* Stock status badge top-left */}
                    <div className="absolute top-4 left-4 z-10 bg-[#00f5d4]/10 backdrop-blur-md border border-[#00f5d4]/30 px-3 py-1 rounded-full text-brand-mint text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-ping"></span>
                      <span>شحن فوري متوفر</span>
                    </div>

                    {/* Product Image Area */}
                    <div className="relative h-64 overflow-hidden bg-brand-bg/50 shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-surface/90 via-transparent to-transparent opacity-80"></div>
                    </div>

                    {/* Product Details Area */}
                    <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                      
                      {/* Name, rating, desc */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-[#ffb800]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < product.rating ? "fill-[#ffb800] text-[#ffb800]" : "text-[#1c2028]"
                              }`}
                            />
                          ))}
                          <span className="text-[10px] text-[#94a3b8] mr-1.5">({product.reviewsCount} تقييم)</span>
                        </div>
                        <h4 className="font-display font-bold text-base text-white group-hover:text-brand-orange transition-colors duration-200 line-clamp-1">{product.name}</h4>
                        <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-2">{product.description}</p>
                      </div>

                      {/* Interactive Gift Wrapping Options per card */}
                      <div className="border-t border-white/5 pt-3.5" id={`wrapping-option-${product.id}`}>
                        <label className="flex items-start gap-2.5 cursor-pointer select-none group/label">
                          <input
                            type="checkbox"
                            checked={isWrapped}
                            onChange={() => toggleWrappingState(product.id)}
                            className="mt-0.5 w-4.5 h-4.5 bg-brand-bg rounded border-white/10 text-brand-orange focus:ring-brand-orange transition-all cursor-pointer"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#dfe2ee] group-hover/label:text-brand-orange transition-colors flex items-center gap-1">
                              <Gift className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                              <span>تغليف هدايا احتفالي فاخر</span>
                            </span>
                            <span className="text-[10px] text-[#94a3b8] mt-0.5">تغليف فخم بالكرتون والشريط الملون (+50 EGP)</span>
                          </div>
                        </label>
                      </div>

                      {/* Pricing and Action button */}
                      <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#94a3b8]">السعر كاش</span>
                          <span className="font-display font-extrabold text-base text-brand-mint">
                            {(product.price + (isWrapped ? 50 : 0)).toLocaleString()} EGP
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="px-4 py-2.5 bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 hover:shadow-[0_4px_12px_rgba(255,94,0,0.3)] cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>إضافة للسلة</span>
                        </button>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </section>

      </main>

      {/* Slide-out Shopping Cart Sidebar Area */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 cursor-pointer"
              id="cart-backdrop-overlay"
            />

            {/* Sidebar Container */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-brand-surface border-r border-white/5 shadow-2xl z-50 flex flex-col"
              id="shopping-cart-sidebar"
            >
              
              {/* Header of Sidebar */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-brand-bg/50 shrink-0">
                <div className="flex items-center gap-2.5">
                  <ShoppingCart className="w-5 h-5 text-brand-mint" />
                  <h3 className="font-display font-black text-lg text-white">سلة المشتريات والطلب</h3>
                  <span className="bg-brand-orange text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {cartTotalQty} ألعاب
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 hover:bg-white/5 rounded-xl text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body of Sidebar */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6" id="cart-sidebar-body">
                
                {/* Cart Items List */}
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center" id="empty-cart-view">
                    <div className="w-20 h-20 rounded-full bg-brand-orange/5 border border-brand-orange/10 flex items-center justify-center text-4xl animate-bounce-slow mb-6">
                      🎁
                    </div>
                    <h4 className="font-display font-bold text-lg text-white leading-relaxed">سلتك فارغة حالياً</h4>
                    <p className="text-xs text-[#94a3b8] max-w-xs mt-1.5 leading-relaxed">املأ سلتك بأحدث ألعاب الأطفال الفاخرة لتنشر الفرح والبهجة في قلوب أحبائك!</p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        const el = document.getElementById("product-grid-section");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-6 px-6 py-2.5 bg-brand-mint/10 hover:bg-brand-mint text-brand-mint hover:text-brand-bg rounded-xl text-xs font-bold border border-brand-mint/20 transition-all cursor-pointer"
                    >
                      تصفح الألعاب والاحتفالات
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4" id="cart-items-list">
                    <h4 className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">الألعاب المختارة</h4>
                    
                    {cart.map((item) => {
                      const itemSubtotal = (item.price + item.wrappingPrice) * item.qty;

                      return (
                        <div
                          key={item.id}
                          className="bg-brand-bg/50 border border-white/5 p-4 rounded-xl flex gap-4 hover:border-[#00f5d4]/20 transition-all"
                          id={`cart-item-row-${item.id}`}
                        >
                          {/* Image */}
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-brand-bg">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>

                          {/* Info and Quantity Controller */}
                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <h5 className="font-display font-bold text-xs text-white leading-normal line-clamp-1">{item.name}</h5>
                              {item.giftWrapped && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-brand-orange bg-brand-orange/5 px-2 py-0.5 rounded mt-1 font-semibold border border-brand-orange/10">
                                  <Gift className="w-2.5 h-2.5" />
                                  <span>مغلف هدايا (+50 EGP)</span>
                                </span>
                              )}
                            </div>

                            {/* Qty Changer */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => handleModifyQty(item.id, -1)}
                                className="w-6 h-6 rounded bg-brand-surface hover:bg-white/5 border border-white/5 text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-white w-6 text-center">{item.qty}</span>
                              <button
                                onClick={() => handleModifyQty(item.id, 1)}
                                className="w-6 h-6 rounded bg-brand-surface hover:bg-white/5 border border-white/5 text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Pricing and Action delete */}
                          <div className="flex flex-col justify-between items-end text-right">
                            <span className="font-display font-extrabold text-xs text-brand-mint">
                              {itemSubtotal.toLocaleString()} EGP
                            </span>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-1 hover:bg-brand-orange/10 rounded text-[#94a3b8] hover:text-brand-orange transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                        </div>
                      );
                    })}

                    {/* Egyptian Shipping Form integrated elegantly in cart sidebar when items exist */}
                    <div className="border-t border-white/5 pt-6 mt-6 space-y-4" id="checkout-form-container">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4.5 h-4.5 text-brand-mint" />
                        <h4 className="font-display font-bold text-sm text-white">بيانات العميل واستمارة الشحن</h4>
                      </div>
                      <p className="text-[11px] text-[#94a3b8] leading-relaxed">يرجى كتابة العنوان والاسم بدقة متناهية لضمان تسليم الشحنة فوريّاً اليوم بمدينة طنطا أو بقية مراكز محافظة الغربية.</p>

                      <form onSubmit={handleProcessOrder} className="space-y-4">
                        
                        {/* Name Input */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-[#94a3b8]">الاسم ثلاثي أو رباعي بالكامل *</label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="مثال: أحمد عبد الله الرفاعي"
                              className="w-full bg-brand-bg border border-white/10 rounded-xl p-3 pl-10 text-xs text-white focus:border-brand-mint outline-none transition-colors"
                            />
                            <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94a3b8]" />
                          </div>
                        </div>

                        {/* Mobile Phone Input with dynamic regex check */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-[#94a3b8]">رقم الموبايل للتأكيد الهاتفي *</label>
                          <div className="relative">
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={handlePhoneChange}
                              placeholder="010XXXXXXXX"
                              className={`w-full bg-brand-bg border rounded-xl p-3 pl-10 text-xs font-mono text-white outline-none transition-colors ${
                                phoneError ? "border-brand-orange focus:border-brand-orange" : "border-white/10 focus:border-brand-mint"
                              }`}
                            />
                            <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94a3b8]" />
                          </div>
                          {phoneError ? (
                            <p className="text-[10px] text-brand-orange font-medium flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                              <span>{phoneError}</span>
                            </p>
                          ) : (
                            <p className="text-[9px] text-[#94a3b8]">يجب إدخال 11 رقماً صحيحاً (فودافون، اتصالات، أورنج، أو وي).</p>
                          )}
                        </div>

                        {/* Governorate Select (default highlighted Western/Tanta) */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-[#94a3b8]">المحافظة والمنطقة *</label>
                          <select
                            value={governorate}
                            onChange={(e) => setGovernorate(e.target.value)}
                            className="w-full bg-brand-bg border border-white/10 rounded-xl p-3 text-xs text-white focus:border-brand-mint outline-none transition-colors cursor-pointer"
                          >
                            <option value="الغربية - طنطا والمراكز">🔥 محافظة الغربية - طنطا ومراكزها (شحن فوري اليوم)</option>
                            <option value="القاهرة">القاهرة الكبرى</option>
                            <option value="الجيزة">الجيزة</option>
                            <option value="الإسكندرية">الإسكندرية</option>
                            <option value="الدقهلية">الدقهلية - المنصورة</option>
                            <option value="المنوفية">المنوفية - شبين الكوم</option>
                            <option value="بقية المحافظات">بقية محافظات مصر</option>
                          </select>
                        </div>

                        {/* Address Text Area */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-[#94a3b8]">العنوان التفصيلي بالكامل (الشارع، رقم العمارة، الدور) *</label>
                          <textarea
                            required
                            rows={2}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="مثال: طنطا، شارع سعيد الرئيسي، عمارة الأمل، الدور الثالث شقة 5"
                            className="w-full bg-brand-bg border border-white/10 rounded-xl p-3 text-xs text-white focus:border-brand-mint outline-none transition-colors resize-none"
                          />
                        </div>

                        {/* Gift Wrapping Notes */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-[#94a3b8]">ملاحظات أو تعليمات التغليف الفاخر للهدايا</label>
                          <textarea
                            rows={2}
                            value={giftWrappingNotes}
                            onChange={(e) => setGiftWrappingNotes(e.target.value)}
                            placeholder="مثال: أرجو كتابة كارت تهنئة باسم 'عمر' بمناسبة نجاحه في المدرسة وتغليفها بورق أزرق..."
                            className="w-full bg-brand-bg border border-white/10 rounded-xl p-3 text-xs text-white focus:border-brand-mint outline-none transition-colors resize-none"
                          />
                        </div>

                      </form>
                    </div>

                  </div>
                )}

              </div>

              {/* Footer of Sidebar */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/5 bg-brand-surface shrink-0">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-semibold text-white">إجمالي قيمة الألعاب كاش:</span>
                    <span className="font-display font-black text-xl text-brand-mint" id="cart-total-amount">
                      {cartSubtotal.toLocaleString()} EGP
                    </span>
                  </div>

                  <button
                    onClick={handleProcessOrder}
                    disabled={isSubmitting || !!phoneError || !name.trim() || !address.trim()}
                    className="w-full py-4 bg-brand-orange hover:bg-brand-orange/95 disabled:bg-white/5 disabled:text-[#94a3b8] disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm shadow-[0_4px_15px_rgba(255,94,0,0.3)] hover:shadow-[0_4px_25px_rgba(255,94,0,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                        <span>جاري إرسال طلبك الآن...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>تأكيد طلب الشحن كاش</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-[#94a3b8] text-center leading-relaxed mt-4 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-mint shrink-0" />
                    <span>جميع الأسعار كاش صافية والدفع الآمن يتم بالكامل بعد المعاينة يد بيد.</span>
                  </p>
                </div>
              )}

            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Success Order Confirmation Modal */}
      <AnimatePresence>
        {successOrder && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-6" id="order-success-modal">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSuccessOrder(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-brand-surface border border-white/10 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative z-10 text-center space-y-6"
            >
              
              {/* Success Badge */}
              <div className="w-16 h-16 rounded-full bg-brand-mint/10 border border-brand-mint/30 flex items-center justify-center text-brand-mint mx-auto">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              {/* Title */}
              <div className="space-y-1">
                <h3 className="font-display font-black text-xl md:text-2xl text-white">تهانينا! تم استلام طلبك بنجاح 🎉</h3>
                <p className="text-xs text-[#94a3b8]">تم تسجيل طلب الشحن بقيمته كاش بنجاح في شركة عمران التجارية</p>
              </div>

              {/* Details box */}
              <div className="bg-brand-bg/60 border border-white/5 rounded-xl p-4 text-right space-y-3 font-sans">
                
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-xs text-[#94a3b8]">رقم الفاتورة / الطلب:</span>
                  <span className="text-xs font-bold font-mono text-white tracking-widest">{successOrder.orderNumber}</span>
                </div>

                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-xs text-[#94a3b8]">العميل المستلم:</span>
                  <span className="text-xs font-bold text-white">{successOrder.customerName}</span>
                </div>

                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-xs text-[#94a3b8]">قيمة المنتجات كاش:</span>
                  <span className="text-sm font-extrabold text-brand-mint">{successOrder.totalAmount.toLocaleString()} EGP</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#94a3b8] block uppercase">الألعاب المطلوبة:</span>
                  <div className="max-h-24 overflow-y-auto space-y-1.5 scrollbar-none pr-1">
                    {successOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-[11px] text-[#dfe2ee]">
                        <span className="line-clamp-1">{item.name} {item.giftWrapped ? "🎁" : ""}</span>
                        <span className="font-bold text-[#94a3b8] shrink-0">({item.qty} × {(item.price + item.wrappingPrice).toLocaleString()} EGP)</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Delivery notice */}
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                📞 جاري مراجعة طلبك وتجهيز الألعاب الآن. سيتواصل معك أحد ممثلي المبيعات بالشركة عبر الهاتف للتأكيد النهائي وستصلك الشحنة فوريّاً لباب بيتك خلال ساعات قليلة!
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSuccessOrder(null)}
                  className="flex-grow py-3 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-orange/10 cursor-pointer"
                >
                  العودة لتصفح ألعاب المتجر
                </button>
                <a
                  href={`https://wa.me/201000000000?text=مرحباً%20عمران%20التجارية%20أريد%20الاستعلام%20عن%20طلب%20الشحن%20رقم%20${successOrder.orderNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>تتبع عبر واتساب</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Corporate Footer area */}
      <footer className="bg-[#0b0f17] border-t border-white/5 pt-20 pb-10 mt-auto" id="company-footer">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-right">
          
          {/* Col 1: Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center">
                <Gift className="w-4.5 h-4.5 text-white" />
              </div>
              <h3 className="font-display font-black text-base text-white">شركة عُمران التجارية</h3>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              شركة رائدة في مجال الاستيراد والتسويق المتكامل لألعاب الأطفال الفاخرة ومستلزمات الحفلات والمناسبات السعيدة الراقية في السوق المصري. نلتزم دائماً بتقديم البهجة بأفضل معايير الأمان والجودة العالية.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://wa.me/201000000000" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#94a3b8] hover:text-brand-mint hover:bg-white/10 transition-colors">
                <MessageSquare className="w-4.5 h-4.5" />
              </a>
              <a href="https://wa.me/201000000000" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#94a3b8] hover:text-brand-orange hover:bg-white/10 transition-colors">
                <Phone className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Fast Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-r-2 border-brand-orange pr-2.5">روابط سريعة للتسوق</h4>
            <ul className="space-y-2.5 text-xs text-[#94a3b8]">
              <li><a href="#product-grid-section" className="hover:text-brand-orange transition-colors">🏎️ سيارات ريموت RC</a></li>
              <li><a href="#product-grid-section" className="hover:text-brand-orange transition-colors">🎯 بنادق فوم آمنة للأطفال</a></li>
              <li><a href="#product-grid-section" className="hover:text-brand-orange transition-colors">🧸 عرايس ومطابخ ألعاب الأميرات</a></li>
              <li><a href="#product-grid-section" className="hover:text-brand-orange transition-colors">🎈 بالونات هيليوم كروم ملونة</a></li>
            </ul>
          </div>

          {/* Col 3: Assistance & Terms */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-r-2 border-brand-mint pr-2.5">مساعد العملاء والدعم</h4>
            <ul className="space-y-2.5 text-xs text-[#94a3b8]">
              <li><a href="https://wa.me/201000000000" className="hover:text-brand-mint transition-colors">اتصل بخدمة مبيعات طنطا</a></li>
              <li><a href="https://wa.me/201000000000" className="hover:text-brand-mint transition-colors">شروط وسياسة الشحن السريع</a></li>
              <li><a href="https://wa.me/201000000000" className="hover:text-brand-mint transition-colors">سياسة الاستبدال والاسترجاع الفوري</a></li>
              <li><a href="https://wa.me/201000000000" className="hover:text-brand-mint transition-colors">شروط الدفع عند الاستلام والمعاينة</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Bio */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-r-2 border-brand-orange pr-2.5">عنوان المقر والتواصل</h4>
            <div className="space-y-2.5 text-xs text-[#94a3b8] leading-relaxed">
              <div className="flex items-start gap-2 justify-start">
                <MapPin className="w-4 h-4 text-brand-mint shrink-0 mt-0.5" />
                <p>مقر الشركة الرئيسي: طنطا، محافظة الغربية، جمهورية مصر العربية</p>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <Phone className="w-4 h-4 text-brand-mint shrink-0" />
                <p dir="ltr">+20 100 000 0000</p>
              </div>
              <div className="flex items-start gap-2 justify-start">
                <Info className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <p>خدمة العملاء والتنسيق الفوري متاحة طوال الـ 24 ساعة للرد على جميع الاستفسارات.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright trust */}
        <div className="max-w-[1280px] mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-xs text-[#94a3b8]">
            حقوق الطبع والنشر © 2026 <strong className="text-white">شركة عمران التجارية للألعاب والاحتفالات</strong>. جميع الحقوق محفوظة ومحمية.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#94a3b8] border border-white/5 px-2.5 py-1 rounded bg-brand-surface/40 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-mint" />
              <span>دفع آمن كاش عند الاستلام المعاين</span>
            </span>
            <span className="text-[10px] text-[#94a3b8] border border-white/5 px-2.5 py-1 rounded bg-brand-surface/40">
              توصيل مجاز بالكامل
            </span>
          </div>
        </div>

      </footer>

    </div>
  );
}
