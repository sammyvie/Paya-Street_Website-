import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve everything in public folder as static
app.use(express.static(path.join(__dirname, "../public")));

// API routes (dummy data)
const products = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 150 },
];
const customers = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];
const messages = [
  { id: 1, text: "Hello!", customerId: 1 },
  { id: 2, text: "How are you?", customerId: 2 },
];

app.get("/api/products", (req, res) => res.json(products));
app.get("/api/customers", (req, res) => res.json(customers));
app.get("/api/messages", (req, res) => res.json(messages));

// Routes for HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/index.html"));
});
app.get("/landing", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/Landing_page.html"));
});
app.get("/feature", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/Feature_Page.html"));
});
app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/Product_Page.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/Contact_Page.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/Signup.html"));
});
app.get("/intro", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/Intro.html"));
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
