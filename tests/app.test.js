const request = require("supertest");
const app = require("../app");
const { expect } = require("chai");
const { removeTestBook, addTestBook } = require("./test-util");

describe("Testing API", () => {
    // Test GET semua buku
    it("GET /api/buku - Menampilkan semua buku", async () => {
        beforeEach(async () => {
            await addTestBook;
        });
        afterEach(async () => {
            await removeTestBook;
        });
        const res = await request(app).get("/api/buku");
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
    });

    // // Test GET buku berdasarkan ID
    // it("GET /api/buku/:id - Menampilkan buku berdasarkan ID", async () => {
    //     beforeEach(async () => {
    //         addTestBook;
    //     });
    //     const id = 1;
    //     const res = await request(app).get(`/api/buku/${id}`);
    //     expect(res.status).to.equal(200);
    //     expect(res.body).to.be.an("array");
    //     expect(res.body[0]).to.have.property("id", id);
    // });

    // Test POST menambahkan buku baru
    it("POST /api/buku - Menambahkan buku baru", async () => {
        afterEach(async () => {
            await removeTestBook;
        });
        const newBook = {
            judul: "Belajar Node.js",
            pengarang: "Imam",
            tahun: 2024,
            jumlah: 10,
        };
        const res = await request(app).post("/api/buku").send(newBook);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property(
            "message",
            "Buku berhasil ditambahkan."
        );
        expect(res.body).to.have.property("id").to.be.a("number");
    });

    // Test PUT memperbarui buku
    it("PUT /api/buku/:id - Memperbarui buku", async () => {
        beforeEach(async () => {
            await addTestBook;
        });
        afterEach(async () => {
            await removeTestBook;
        });
        const id = 1;
        const updatedBook = {
            judul: "Belajar Node.js Lanjutan",
            pengarang: "Imam",
            tahun: 2024,
            jumlah: 10,
        };
        const res = await request(app).put(`/api/buku/${id}`).send(updatedBook);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property(
            "message",
            "Buku berhasil diperbarui."
        );
    });

    // Test PATCH memperbarui buku
    it("PATCH /api/buku/:id - Memperbarui buku", async () => {
        beforeEach(async () => {
            await addTestBook;
        });
        afterEach(async () => {
            await removeTestBook;
        });
        const id = 1;
        const updatedBook = {
            jumlah: 20,
        };
        const res = await request(app)
            .patch(`/api/buku/${id}`)
            .send(updatedBook);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property(
            "message",
            "Buku berhasil diperbarui."
        );
    });

    // Test DELETE menghapus buku
    it("DELETE /api/buku/:id - Menghapus buku", async () => {
        beforeEach(async () => {
            await addTestBook;
        });
        afterEach(async () => {
            await removeTestBook;
        });
        const id = 1;
        const res = await request(app).delete(`/api/buku/${id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message", "Buku berhasil dihapus.");
    });
});
