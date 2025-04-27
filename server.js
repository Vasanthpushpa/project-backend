const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'projectdb'
}).promise();

app.get('/projects', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT ilance_projects.project_title, ilance_users.username
            FROM ilance_projects
            LEFT JOIN ilance_users ON ilance_projects.user_id = ilance_users.user_id
        `);

        if (rows.length > 0) {
            res.send(rows);  
        } else {
            res.status(404).send({ message: 'No projects found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch projects' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
