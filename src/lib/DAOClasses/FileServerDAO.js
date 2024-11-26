import { BlobServiceClient } from '@azure/storage-blob';
import { FILE_CON_STR } from '$env/static/private';
import { PDFDocument } from 'pdf-lib'; // For PDF manipulation
import fs from 'fs'; // For file system operations
//import * as fileType from 'file-type'; // Use this if you face import issues
import mammoth from 'mammoth'; // For DOCX to HTML conversion
//import puppeteer from 'puppeteer';
//import { exec } from 'child_process'; // For PPTX conversion
import { config } from 'dotenv';
config();

class FileServerDAO {
    constructor() {
        this.connectionString = FILE_CON_STR;
        this.containerName = 'sidewalkblob';
        this.blobServiceClient = null;
        this.containerClient = null;
    }

    async connect() {
        try {
            this.blobServiceClient = BlobServiceClient.fromConnectionString(this.connectionString);
            this.containerClient = this.blobServiceClient.getContainerClient(this.containerName);
            await this.containerClient.createIfNotExists();
            console.log('Connected to Azure Blob Storage');
        } catch (error) {
            console.error('Error connecting to Azure Blob Storage:', error);
            throw new Error('Could not connect to Azure Blob Storage');
        }
    }

    async uploadToBlobStorage(fileBuffer, fileName) {
        try {
            // Validate fileBuffer
            if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
                throw new Error('Invalid file buffer');
            }

            // Validate fileName
            if (!fileName || typeof fileName !== 'string' || fileName.trim().length === 0) {
                throw new Error('Invalid file name');
            }

            // Create a block blob client
            const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);

            // Set a generic image MIME type
            const options = { blobHTTPHeaders: { blobContentType: 'image/*' } };

            // Upload the image
            const uploadBlobResponse = await blockBlobClient.uploadData(fileBuffer, options);

            console.log(`Blob was uploaded successfully. Request ID: ${uploadBlobResponse.requestId}`);
            return uploadBlobResponse; // Optionally return the response
        } catch (error) {
            console.error(`Error uploading blob: ${error.message}`);
            throw new Error(`Failed to upload blob: ${error.message}`);
        }
    }


    async insertFile(file) {
        try {
            const type = await fileType.fromBuffer(file);
            if (!this.isSupportedFormat(type.ext)) {
                throw new Error('Unsupported file format. Supported formats: DOCX, PPTX, JPEG, PNG.');
            }

            const pdfBuffer = await this.convertToPDF(file, type.ext);
            const blobClient = this.containerClient.getBlobClient(`${file.name}.pdf`);
            const uploadBlobResponse = await blobClient.upload(pdfBuffer, pdfBuffer.length);
            return uploadBlobResponse;
        } catch (error) {
            console.error(`Error during file insertion: ${error.message}`);
            throw new Error(`Failed to upload file: ${error.message}`);
        }
    }

    isSupportedFormat(ext) {
        const supportedFormats = ['docx', 'pptx','pdf']; // Add more as needed
        return supportedFormats.includes(ext);
    }


    //works
    async deleteFile(filePath) {
        try {
            const blobClient = this.containerClient.getBlobClient(filePath);
            await blobClient.delete();
            return { message: 'File deleted successfully' };
        } catch (error) {
            throw new Error(`Failed to delete file: ${error.message}`);
        }
    }

    async updateFile(file) {
        try {
            const blobClient = this.containerClient.getBlobClient(file.getPath());
    
            // Get the file size and content type dynamically
            const fileSize = file.size || file.length; // file.size if using File API, file.length for buffers
            const fileType = file.type || 'application/octet-stream'; // Default to a generic type
    
            // Upload the file
            const uploadBlobResponse = await blobClient.upload(file, fileSize, {
                blobHTTPHeaders: { blobContentType: fileType },
            });
    
            return uploadBlobResponse;
        } catch (error) {
            throw new Error(`Failed to update file: ${error.message}`);
        }
    }
    

    async readFile(filePath) {
        try {
            console.log(`Attempting to read blob from path: ${filePath}`);
            const blobClient = this.containerClient.getBlobClient(filePath);
            const downloadBlockBlobResponse = await blobClient.download(0);
            const downloadedData = await this.streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
            console.log(`Successfully read blob from path: ${filePath}`);
            return downloadedData;
        } catch (error) {
            console.error(`Error while reading blob from path: ${filePath}`, error);
            throw new Error(`Failed to read file: ${error.message}`);
        }
    }
    

    async setMetadata(filePath, metadata) {
        try {
            const blobClient = this.containerClient.getBlobClient(filePath);
            await blobClient.setMetadata(metadata);
            return { message: 'Metadata set successfully' };
        } catch (error) {
            throw new Error(`Failed to set metadata: ${error.message}`);
        }
    }

    async getMetadata(filePath) {
        try {
            const blobClient = this.containerClient.getBlobClient(filePath);
            const properties = await blobClient.getProperties();
            return properties.metadata;
        } catch (error) {
            throw new Error(`Failed to get metadata: ${error.message}`);
        }
    }

    async deleteMetadata(filePath, metadataKeys) {
        try {
            const blobClient = this.containerClient.getBlobClient(filePath);
            const currentMetadata = await blobClient.getProperties();
            const updatedMetadata = {};

            // Retain existing metadata except for the keys to be deleted
            for (const key in currentMetadata.metadata) {
                if (!metadataKeys.includes(key)) {
                    updatedMetadata[key] = currentMetadata.metadata[key];
                }
            }

            await blobClient.setMetadata(updatedMetadata);
            return { message: 'Metadata deleted successfully' };
        } catch (error) {
            throw new Error(`Failed to delete metadata: ${error.message}`);
        }
    }

    async streamToBuffer(readableStream) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            readableStream.on('data', (data) => {
                chunks.push(data);
            });
            readableStream.on('end', () => {
                resolve(Buffer.concat(chunks));
            });
            readableStream.on('error', reject);
        });
    }
}

export default FileServerDAO;
