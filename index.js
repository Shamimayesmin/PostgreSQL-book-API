const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

const pool = require("./db");
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
	console.log(`server is running at ${PORT}`);
});

// GET / books => return all the books
app.get("/books", async (req, res) => {
	try {
		const books = await pool.query("SELECT * FROM book");
		res.status(200).json({ message: "Books are returned", data: books.rows });
	} catch (error) {
		res.json({ error: error.message });
	}
});

// GET / books/:id => return a specific  book
app.get("/books/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const book = await pool.query("SELECT * FROM book WHERE id=$1", [id]);
		res
			.status(200)
			.json({ message: "Specific book is return with id", data: book.rows });
	} catch (error) {
		res.json({ error: error.message });
	}
});
// POST /books => create a book

app.post("/books", async (req, res) => {
	// console.log("hittingggggggggg url");
	try {
		const { name, description } = req.body;
		const id = uuidv4();

		// inserting book data into database
		const newBook = await pool.query(
			`INSERT INTO book (id, name, description) VALUES ($1, $2, $3) RETURNING *`,
			[id, name, description]
		);

		console.log("new books", newBook.rows[0]);

		res.status(201).json({ message: `Books was created `, data: newBook.rows });
	} catch (error) {
		res.json({ error: error.message });
	}
});

//DELETE /books/:id => delete a book
app.delete("/books/:id", async (req, res) => {
	try {
		const { id } = req.params;

		await pool.query(`DELETE FROM book WHERE id=$1`, [id]);

		res
			.status(200)
			.json({
				message: `Delete a Specific book is with id ${id}`,
				
			});
	} catch (error) {
		res.json({ error: error.message });
	}
});

// PUT /books/:id => update a book
app.put("/books/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description } = req.body;

      const updateBook=  await pool.query(`UPDATE book SET name=$1, description=$2 WHERE id=$3 RETURNING *`, [name,description,id]);


		res
			.status(200)
			.json({ message: `Books was updated `, data:updateBook.rows });
	} catch (error) {
		res.json({ error: error.message });
	}
});

// CRUD ==> Create, Read, Update, Delete
