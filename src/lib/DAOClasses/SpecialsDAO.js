import { testConnection } from '../DAOClasses/DatabaseConnection.js';
import Specials from '../Classes/Specials.js';
import sql from 'mssql';

class FileDAO {
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

    async uploadFile(file) {
        let connection;
        try {
            connection = await testConnection(); // Database connections
            
            const query = `
                INSERT INTO FILES (Path, Type,userID, ApprovedAt, Status, Report, Grade, SubjectID, FileSize)
                VALUES ( @Path, @Type,@userID, @ApprovedAt, @Status, @Report, @Grade, @SubjectID, @FileSize)
            `;

            await connection.request()
                
                .input('Path', sql.NVarChar, file.path)
                .input('Type', sql.NVarChar, file.type)
                .input('userID', sql.Int, file.userID)
                .input('ApprovedAt', sql.DateTime, file.approvedAt)
                .input('Status', sql.NVarChar, file.status)
                .input('Report', sql.NVarChar, file.report)
                .input('Grade', sql.NVarChar, file.grade)
                .input('SubjectID', sql.Int, file.subjectID)
                .input('FileSize', sql.Int, file.fileSize)
                .query(query);

            console.log('File uploaded successfully');
        } catch (err) {
            console.error('Failed to upload file:', err);
        } finally {
            if (connection) {
                await connection.close(); 
            }
        }
    }
    async getFilesByTag(tagID){
        const query = `SELECT * 
        FROM dbo.FILES F
        JOIN dbo.FileTag FT ON F.FileID = FT.FileID
        JOIN dbo.Tags T ON T.TagID = FT.TagID
        WHERE T.TagID = @tagID;
        `

        let connection;
        try {
            connection = await testConnection(); // Database connection
            const result = await connection.request().input('tagID', sql.Int, tagID).query(query);
            return result.recordset; // Return the array of files
        } catch (err) {
            console.error('Failed to fetch files by tag ID:', err);
            throw err;
        } finally {
            if (connection) {
                await connection.close(); // Close the connection
            }
        }
    }
    async getFilesBySubject(subjectID){

        let connection;
        try {
            connection = await testConnection(); // Database connection
            const query = `SELECT * FROM FILES WHERE SubjectID = @subjectID;`
            const result = await connection.request().input('subjectID', sql.Int, subjectID).query(query);
            return result.recordset; // Return the array of files
        } catch (err) {
            console.error('Failed to fetch files by subject ID:', err);
            throw err;
        } finally {
            if (connection) {
                await connection.close(); // Close the connection
            }
        }

    }
    async getAllApprovedFiles(){
        let connection;
        try {
            connection = await testConnection(); // Database connection
             const query = `SELECT * FROM FILES where Status = 'Approved';`;
            const result = await connection.request().query(query);
            return result.recordset; // Return the array of files
        } catch (err) {
            console.error('Failed to fetch approved files:', err);
            throw err;
        } finally {
            if (connection) {
                await connection.close(); // Close the connection
            }
        }
    }

    async getAllFiles() {
        const query = ''

        //options 
        //1 search all files 
        //2 search with name

        let connection;
        try {
            connection = await testConnection(); // Database connection
             const query = 'SELECT * FROM FILES;';
            const result = await connection.request().query(query);
            return result.recordset; // Return the array of files
        } catch (err) {
            console.error('Failed to fetch files:', err);
            throw err;
        } finally {
            if (connection) {
                await connection.close(); // Close the connection
            }
        }
    }

    async getFileById(fileId) {
        let connection;
        try {
            connection = await testConnection();
            const query = `SELECT * FROM Files WHERE FileID = @fileId`;
            const result = await connection.request()
                .input('fileId', sql.Int, fileId)
                .query(query);
            return result.recordset.length > 0 ? result.recordset[0] : null; // Return the file if found
        } catch (err) {
            console.error('Failed to fetch file by ID:', err);
            throw err;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    async updateFileStatus(fileId, status) {
        let connection;
        try {
            connection = await testConnection();
            const query = `UPDATE Files SET Status = @Status WHERE FileID = @fileId`;
            await connection.request()
                .input('fileId', sql.Int, fileId)
                .input('Status', sql.NVarChar, status)
                .query(query);
            console.log('File status updated successfully');
        } catch (err) {
            console.error('Failed to update file status:', err);
            throw err;
        } finally {
            if (connection) {
                await connection.close()
            }
        }
    }

    async reportFile(fileId, reportReason) {
        let connection;
        try {
            connection = await testConnection();
            const query = `UPDATE Files SET Report = @Report WHERE FileID = @fileId`;
            await connection.request()
                .input('fileId', sql.Int, fileId)
                .input('Report', sql.NVarChar, reportReason)
                .query(query);
            console.log('File reported successfully');
        } catch (err) {
            console.error('Failed to report file:', err);
            throw err;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    async tagFile(fileId, tags) {
        let connection;
        try {
            connection = await testConnection();
            // Assuming you have a Tags table and a FileTags junction table
            const query = `
                INSERT INTO FileTags (FileID, Tag)
                VALUES (@FileID, @Tag)
            `;
            for (const tag of tags) {
                await connection.request()
                    .input('FileID', sql.Int, fileId)
                    .input('Tag', sql.NVarChar, tag)
                    .query(query);
            }
            console.log('File tagged successfully');
        } catch (err) {
            console.error('Failed to tag file:', err);
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

    //add subject, path, and tags
    async searchDocument(searchTerm) {

        let connection;
        try {
            connection = await testConnection();
            
            const query = `
                SELECT f.*
                FROM Files f
                WHERE f.Path LIKE @searchTerm ;
            `;
    
            const result = await connection.request()
                .input('searchTerm', sql.NVarChar, `%${searchTerm}%`)
                .query(query);
            
            return result.recordset; // Return the matching files
        } catch (err) {
            console.error('Failed to search files:', err);
            throw err;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }
    

    async deleteFile(fileId) {
        let connection;
        try {
            connection = await testConnection();
            const query = `DELETE FROM Files WHERE FileID = @fileId`;
            await connection.request()
                .input('fileId', sql.Int, fileId)
                .query(query);
            console.log('File deleted successfullys');
        } catch (err) {
            console.error('Failed to delete file:', err);
            throw err;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }
    
    async searchDocs(searchTerm)
    {
        try {
           
            const connection = await testConnection();

            const query =`SELECT * FROM Files WHERE Filename LIKE %@searchterm%`;

            await connection?.request();    
        } catch (error) {
            
        }
    }

    async moderateFile(file) {
        let connection;
        try {
            // Attempt to establish connection with retries
            connection = await testConnection();

            // Validate file status
            const validStatuses = ['approved', 'disapproved'];
            if (!validStatuses.includes(file.status)) {
                throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
            }

            // Update the file record in the database
            const query = `
                UPDATE Files 
                SET Status = @Status, 
                    ApprovedAt = @ApprovedAt
                WHERE FileID = @fileId
            `;

            await connection.request()
                .input('fileId', sql.Int, file.fileId)
                .input('Status', sql.NVarChar, file.status)
                .input('ApprovedAt', sql.DateTime, file.approvedAt)
                .query(query);

            console.log(`File with ID ${file.fileId} has been ${file.status}.`);
            return true; // Success
        } catch (error) {
            console.error('Error moderating file:', error);
            return false; // Failure
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    
}

export default FileDAO;
