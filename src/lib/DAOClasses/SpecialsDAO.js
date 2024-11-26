import { testConnection } from '../DAOClasses/DatabaseConnection.js';
import Specials from '../Classes/Specials.js';
import sql from 'mssql';

class SpecialsDAO {
    constructor() {
        this.connectionString = "Server=tcp:sidewalk-server.database.windows.net,1433;Initial Catalog=sidewalkDB;Persist Security Info=False;User ID=sidewalk;Password=Thabang12;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
    }
    
    async connect() {
        try {
            this.pool = await sql.connect(this.connectionString);
        } catch (error) {
            console.error('Failed to connect to the database:', error);
            throw error;
        }
    }

    async disconnect() {
        try {
            await this.pool.close();  // Updates to use this.pool.close()
        } catch (error) {
            console.error('Failed to close the database connection:', error);
        }
    }

    async uploadFile(specials) {
        let connection;
        try {
            connection = await testConnection(); // Database connections
            
            const query = `
                INSERT INTO Specials (Special_ID, Name,Price, Description, Day, Start_time, End_time, Path)
                VALUES ( @specialsID, @name,@price, @description, @day, @startTime, @endTime, @path)
            `;

            await connection.request()
                
                .input('Special_ID', sql.Int, specials.specialsID)
                .input('Name', sql.NVarChar, specials.name)
                .input('Price', sql.Money, specials.price)
                .input('Description', sql.NVarChar, specials.description)
                .input('Day', sql.Int, specials.day)
                .input('Start_time', sql.Time, specials.startTime)
                .input('End_time', sql.Time, specials.endTime)
                .input('Path', sql.NVarChar, specials.path)
                
                .query(query);

            console.log('Image uploaded successfully');
        } catch (err) {
            console.error('Failed to upload image:', err);
        } finally {
            if (connection) {
                await connection.close(); 
            }
        }
    }

    async getAllImages() {
        const query = ''

        //options 
        //1 search all files 
        //2 search with name

        let connection;
        try {
            connection = await testConnection(); // Database connection
             const query = 'SELECT * FROM Specials;';
            const result = await connection.request().query(query);
            return result.recordset; // Return the array of files
        } catch (err) {
            console.error('Failed to fetch images:', err);
            throw err;
        } finally {
            if (connection) {
                await connection.close(); // Close the connection
            }
        }
    }

    async getFileById(special_id) {
        let connection;
        try {
            connection = await testConnection();
            const query = `SELECT * FROM Specials WHERE Special_ID = @special_id`;
            const result = await connection.request()
                .input('Special_ID', sql.Int, special_id)
                .query(query);
            return result.recordset.length > 0 ? result.recordset[0] : null; // Return the file if found
        } catch (err) {
            console.error('Failed to fetch image by ID:', err);
            throw err;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    
    typeOfSearch(typp){//S 
        //type = {type, }
        let query =""

        //by subject 
        query = "select * from Files where Subject = ;"

        //by 

        return query;
    }

    

    async deleteImage(specialsID) {
        let connection;
        try {
            connection = await testConnection();
            const query = `DELETE FROM Specials WHERE Specials_ID = @specialsID`;
            await connection.request()
                .input('Special_ID', sql.Int, specialsID)
                .query(query);
            console.log('Image deleted successfullys');
        } catch (err) {
            console.error('Failed to delete image:', err);
            throw err;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }
    
    async searchDocs(name)
    {
        try {
           
            const connection = await testConnection();

            const query =`SELECT * FROM Specials WHERE Name LIKE %@name%`;

            await connection?.request();    
        } catch (error){
            console.error('Failed to search for image:', error);
            throw error;
        }
    }


}

export default SpecialsDAO;
