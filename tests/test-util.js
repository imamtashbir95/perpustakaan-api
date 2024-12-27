export const removeTestBook = async () => {
    await db.execute("DELETE FROM buku WHERE judul = ?", ["Belajar Node.js"]);
}

export const addTestBook = async () => {
    await db.execute("INSERT INTO buku (judul, pengarang, tahun, jumlah) VALUES (?, ?, ?, ?)", ["Belajar Node.js", "Imam", 2024, 10]);
}