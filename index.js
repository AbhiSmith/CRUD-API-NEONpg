import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './utils/db.js'
import bodyParser from 'body-parser';
import useRouter from './routes/page.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Check neon db connection
async function getPgVersion() {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT version()');
      console.log(result.rows[0]);
    } finally {
      client.release();
    }
  }
  getPgVersion();

app.use('/api/v1', useRouter);



app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
})