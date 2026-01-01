/* ================= IMPORTS ================= */
import express from "express"; // Express framework
import bcrypt from "bcryptjs"; // Use bcryptjs instead of bcrypt
import jwt from "jsonwebtoken"; // JSON Web Tokens for authentication
import dotenv from "dotenv"; // Environment variable management
import cookieParser from "cookie-parser"; // Cookie handling
import { connectDB, User } from "./config/database.js"; // Database connection & User model

import categoryRoutes from "./routes/categoryroute.js"; // Category routes
import productRoutes from "./routes/productroute.js"; // Product routes
import brandRoutes from "./routes/brandroute.js"; // Brand routes

/* ================= ENVIRONMENT VARIABLES ================= */
dotenv.config(); // Load .env file

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not defined in .env"); // Ensure JWT_SECRET exists
  }

  /* ================= APP INITIALIZATION ================= */
  const app = express(); // Initialize Express app
  connectDB(); // Connect to the database

  /* ================= MIDDLEWARE ================= */
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static("public"));
  app.set("view engine", "ejs");

  /* ================= API ROUTES ================= */
  app.use("/api/categories", categoryRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/brands", brandRoutes);

  /* ================= PAGE ROUTES ================= */
  app.get("/login", (req, res) => res.render("login"));
  app.get("/register", (req, res) => res.render("register"));
  app.get("/dinein", (req, res) => res.render("dinein"));
  app.get("/takeout", (req, res) => res.render("takeout"));
  app.get("/payment", (req, res) => res.render("payment"));
  app.get("/printreceipt", (req, res) => res.render("printreceipt"));
  app.get("/setting", (req, res) => res.render("setting"));
  app.get("/addtoorders", (req, res) => res.render("addtoorders"));
  app.get("/Addproduct", (req, res) => res.render("Addproduct"));
  app.get("/ViewStocks", (req, res) => res.render("ViewStocks"));
  app.get("/ViewOrders", (req, res) => res.render("ViewOrders"));

  /* ================= REGISTER ================= */
  app.post("/register", async (req, res) => {
    try {
        const { user, pass, role } = req.body;

            if (!user || !pass) {
                  return res.status(400).json({ message: "Username and password required" });
                      }

                          const existingUser = await User.findOne({ username: user });
                              if (existingUser) {
                                    return res.status(409).json({ message: "User already exists" });
                                        }

                                            const hashedPassword = bcrypt.hashSync(pass, 10); // bcryptjs works synchronously or async

                                                const newUser = new User({
                                                      username: user,
                                                            password: hashedPassword,
                                                                  role: role || "staff",
                                                                      });

                                                                          await newUser.save();
                                                                              res.status(201).json({ message: "Username Register successfully" });
                                                                                } catch (err) {
                                                                                    console.error("Register ERROR:", err);
                                                                                        res.status(500).json({ message: err.message }); // show actual error for debugging
                                                                                          }
                                                                                          });

                                                                                          /* ================= LOGIN ================= */
                                                                                          app.post("/login", async (req, res) => {
                                                                                            try {
                                                                                                const { user, pass } = req.body;

                                                                                                    const existingUser = await User.findOne({ username: user });
                                                                                                        if (!existingUser) return res.status(404).send("User not found");

                                                                                                            const isMatch = bcrypt.compareSync(pass, existingUser.password); // bcryptjs
                                                                                                                if (!isMatch) return res.status(401).send("Invalid password");

                                                                                                                    const token = jwt.sign(
                                                                                                                          {
                                                                                                                                  id: existingUser._id,
                                                                                                                                          username: existingUser.username,
                                                                                                                                                  role: existingUser.role,
                                                                                                                                                        },
                                                                                                                                                              process.env.JWT_SECRET,
                                                                                                                                                                    { expiresIn: "365d" }
                                                                                                                                                                        );

                                                                                                                                                                            res.cookie("token", token, {
                                                                                                                                                                                  httpOnly: true,
                                                                                                                                                                                        sameSite: "strict",
                                                                                                                                                                                              maxAge: 1000 * 60 * 60 * 24 * 365,
                                                                                                                                                                                                  });

                                                                                                                                                                                                      if (existingUser.role === "admin") return res.redirect("/admindashboard");
                                                                                                                                                                                                          res.redirect("/staffdashboard");
                                                                                                                                                                                                            } catch (err) {
                                                                                                                                                                                                                console.error("LOGIN ERROR:", err);
                                                                                                                                                                                                                    res.status(500).send("Login error");
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                      });

                                                                                                                                                                                                                      /* ================= AUTH MIDDLEWARE ================= */
                                                                                                                                                                                                                      const verifyToken = (req, res, next) => {
                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                            const token = req.cookies.token;
                                                                                                                                                                                                                                if (!token) return res.redirect("/login");

                                                                                                                                                                                                                                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                                                                                                                                                                                                                                        req.user = decoded;
                                                                                                                                                                                                                                            next();
                                                                                                                                                                                                                                              } catch (err) {
                                                                                                                                                                                                                                                  console.error("JWT ERROR:", err.message);
                                                                                                                                                                                                                                                      res.clearCookie("token");
                                                                                                                                                                                                                                                          res.redirect("/login");
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                            };

                                                                                                                                                                                                                                                            /* ================= DASHBOARDS ================= */
                                                                                                                                                                                                                                                            app.get("/admindashboard", verifyToken, async (req, res) => {
                                                                                                                                                                                                                                                              if (req.user.role !== "admin") return res.redirect("/staffdashboard");

                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                    const totalStocks = await Product.countDocuments();
                                                                                                                                                                                                                                                                        const totalProducts = await Product.countDocuments();
                                                                                                                                                                                                                                                                            const totalOrders = await Order.countDocuments();

                                                                                                                                                                                                                                                                                res.render("admindashboard", {
                                                                                                                                                                                                                                                                                      user: req.user,
                                                                                                                                                                                                                                                                                            stats: { totalStocks, totalProducts, totalOrders },
                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                  } catch (err) {
                                                                                                                                                                                                                                                                                                      console.error("AdminDashboard Error:", err);
                                                                                                                                                                                                                                                                                                          res.render("admindashboard", {
                                                                                                                                                                                                                                                                                                                user: req.user,
                                                                                                                                                                                                                                                                                                                      stats: { totalStocks: 0, totalProducts: 0, totalOrders: 0 },
                                                                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                            app.get("/staffdashboard", verifyToken, (req, res) => {
                                                                                                                                                                                                                                                                                                                              if (req.user.role !== "staff") return res.redirect("/admindashboard");
                                                                                                                                                                                                                                                                                                                                res.render("staffdashboard", { user: req.user });
                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                /* ================= LOGOUT ================= */
                                                                                                                                                                                                                                                                                                                                app.get("/logout", (req, res) => {
                                                                                                                                                                                                                                                                                                                                  res.clearCookie("token");
                                                                                                                                                                                                                                                                                                                                    res.redirect("/login");
                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                    /* ================= SERVER ================= */
                                                                                                                                                                                                                                                                                                                                    const PORT = process.env.PORT || 9090;
                                                                                                                                                                                                                                                                                                                                    app.listen(PORT, () =>
                                                                                                                                                                                                                                                                                                                                      console.log(`Server running at http://localhost:${PORT}`)
                                                                                                                                                                                                                                                                                                                                      );