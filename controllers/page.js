import pool from '../utils/db.js'

export const getData = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM playing_with_neon');

        res.json(result.rows);
        client.release;
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ message: "Server error" });
        
    }    
}


export const postData = async (req, res) => {
    try {
        const { body } = req;
        const client = await pool.connect();
        const result = await client.query('INSERT INTO playing_with_neon (name, value) VALUES ($1, $2)  RETURNING *', [body.name, body.value]);
        res.json(result.rows);
        client.release;        
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteData = async (req, res) => {
    try {
        const { params: { id }} = req;
        console.log(id)
        const client = await pool.connect();
        await client.query('DELETE FROM playing_with_neon WHERE id = $1', [id]);
        
        res.status(200).send(`User deleted with ID: ${id}`);
        client.release;
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ message: "Server error" });        
    }
}

export const updateData = async (req, res) => {
    try {
        // const id = request.query.id;
        const { body, params: { id}} = req;
        const client = await pool.connect();
        const result = await client.query('UPDATE playing_with_neon SET name = $1, value = $2 WHERE id = $3 RETURNING *', [body.name, body.value, id]);
        res.json(result.rows);
        client.release

    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ message: "Server error" });   
    }
}


export const deleteAll = async (req, res) => {
    try {
        const client = await pool.connect();
        await client.query('DELETE FROM playing_with_neon');
        res.status(200).send(`All data deleted`);
        client.release;
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ message: "Server error" });
    }
}
