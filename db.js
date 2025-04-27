import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'projectdb'
}).promise();
const query = pool.query(`
SELECT ilance_projects.project_title, ilance_users.username
FROM ilance_projects
JOIN ilance_users ON ilance_projects.user_id = ilance_users.user_id
`);
console.log(query);