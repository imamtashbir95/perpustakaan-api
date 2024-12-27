const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: ".env.local" });

const app = express();

// Konfigurasi MySQL
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

// Koneksi MySQL
const db = mysql.createPool(dbConfig);

// Middleware
app.use(bodyParser.json());
// app.use(cors());

// Route

// 1. Menampilkan semua buku
app.get("/api/buku", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM buku");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data." });
    }
});

// 2. Menampilkan buku oleh id
app.get("/api/buku/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.execute("SELECT * FROM buku WHERE id = ?", [
            id,
        ]);
        if (rows.length === 0) {
            res.status(404).json({ message: "Tidak menemukan data." });
            return;
        }
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan data." });
    }
});

// 3. Menambahkan buku
app.post("/api/buku", async (req, res) => {
    try {
        const { judul, pengarang, tahun, jumlah } = req.body;
        const [result] = await db.execute(
            "INSERT INTO buku (judul, pengarang, tahun, jumlah) VALUES (?, ?, ?, ?)",
            [judul, pengarang, tahun, jumlah]
        );
        res.status(201).json({ message: "Buku berhasil ditambahkan.", id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan data." });
    }
});

// 4. Memperbarui buku
app.put("/api/buku/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { judul, pengarang, tahun, jumlah } = req.body;
        await db.execute(
            "UPDATE buku SET judul = ?, pengarang = ?, tahun = ?, jumlah = ? WHERE id = ?",
            [judul, pengarang, tahun, jumlah, id]
        );
        res.json({ message: "Buku berhasil diperbarui." });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui data." });
    }
});

// 5. Memperbarui buku pada field tertentu
app.patch("/api/buku/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { judul, pengarang, tahun, jumlah } = req.body;

        // Periksa field mana yang diperbarui
        const fields = [];
        if (judul) fields.push(`judul = '${judul}'`);
        if (pengarang) fields.push(`pengarang = '${pengarang}'`);
        if (tahun) fields.push(`tahun = '${tahun}'`);
        if (jumlah) fields.push(`jumlah = '${jumlah}'`);

        // Gabungkan field yang diperbarui
        const updateFields = fields.join(", ");

        // Jika tidak ada field yang diperbarui
        if (!updateFields) {
            res.status(400).json({ message: "Tidak ada data yang diperbarui." });
            return;
        }

        // Jalankan query update
        await db.execute(`UPDATE buku SET ${updateFields} WHERE id = ?`, [id]);
        res.json({ message: "Buku berhasil diperbarui." })
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui data." });
    }
});

// 6. Menghapus buku
app.delete("/api/buku/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await db.execute("DELETE FROM buku WHERE id = ?", [id]);
        res.json({ message: "Buku berhasil dihapus." });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus data." });
    }
});

app.listen(3000, () => {
    console.log("Server berjalan di port 3000");
});

module.exports = app