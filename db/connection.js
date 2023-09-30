const mysql = require('mysql2/promise');

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'employee_db',
        });

        console.log('Connected to the employee database');

        const db = {
            query: async (sql, params) => {
                const [rows] = await connection.execute(sql, params);
                return rows;
            },
        };

        return db; // Export the db object
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

module.exports = { connectToDatabase };
