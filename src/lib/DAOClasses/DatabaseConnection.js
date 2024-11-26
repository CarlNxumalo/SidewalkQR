import sql from 'mssql';


// Database configuration
const config = {
    user: 'sidewalk',
    password: 'Thabang12',
    server: 'sidewalk-server.database.windows.net',
    database: 'sidewalkDB',
    options: {
        encrypt: true, // For Azure SQL
        trustServerCertificate: true // For local development
    }
};



export async function testConnection() {
    try {
        const connection = await sql.connect(config); // Connect to the database
        return connection; 
    } catch (err) {
        console.error('Database connection failed:', err);
        
    }
}

export{sql, config};