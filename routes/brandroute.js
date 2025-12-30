import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Brand name is required" });
    }

    res.status(201).json({
        id: Date.now(),
        name
    });
});

router.get("/", (req, res) => {
    res.json({ message: "Brand route working" });
});

export default router;   
