import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom self-contained CORS middleware to support potential external integrations
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// In-memory database of order submissions
interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    governorate: string;
    address: string;
    giftWrappingNotes?: string;
  };
  items: Array<{
    name: string;
    price: number;
    qty: number;
    giftWrapped?: boolean;
  }>;
  total: number;
  timestamp: string;
}

const orders: Order[] = [];

// API Route for receiving a new order
app.post("/api/orders/new", (req, res) => {
  try {
    const { customer, items, total } = req.body;

    // Server-side validation
    if (!customer || !customer.name || !customer.phone || !customer.address || !customer.governorate) {
      return res.status(400).json({
        success: false,
        message: "جميع حقول بيانات العميل الإلزامية مطلوبة (الاسم، الهاتف، المحافظة، العنوان)."
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "سلة المشتريات فارغة. يرجى إضافة ألعاب أولاً."
      });
    }

    // Egyptian phone validation: 11 digits, starting with 010, 011, 012, or 015
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(customer.phone)) {
      return res.status(400).json({
        success: false,
        message: "رقم الموبايل المصري غير صحيح. يجب أن يتكون من 11 رقم ويبدأ بـ 010 أو 011 أو 012 أو 015."
      });
    }

    // Generate unique order number (e.g. OM-10492)
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `OM-${randomNum}`;

    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 9),
      orderNumber,
      customer: {
        name: customer.name,
        phone: customer.phone,
        governorate: customer.governorate,
        address: customer.address,
        giftWrappingNotes: customer.giftWrappingNotes || ""
      },
      items,
      total,
      timestamp: new Date().toISOString()
    };

    orders.push(newOrder);

    console.log(`[Order Received] ${orderNumber} - Customer: ${customer.name}, Phone: ${customer.phone}, Total: ${total} EGP`);

    return res.status(201).json({
      success: true,
      orderNumber,
      message: "تم استقبال الطلب بنجاح وسيتواصل معك موظف المبيعات لتأكيد الشحن."
    });

  } catch (error: any) {
    console.error("Error processing order:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ غير متوقع بالخادم أثناء معالجة الطلب."
    });
  }
});

// GET endpoint to view orders (for administrative/debugging overview in development)
app.get("/api/orders", (req, res) => {
  res.json({ success: true, count: orders.length, orders });
});

// Integrate Vite middleware or serve static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Omran Trading Server is listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
