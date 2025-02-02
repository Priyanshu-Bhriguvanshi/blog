import { Client, Databases, Query, ID, Storage } from "appwrite";
import { config } from "../config/config";

export class databaseConfig {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl) 
            .setProject(config.appwriteProjectId); 

        this.database = new Databases(this.client);
        this.storage = new Storage(this.client)
    }

    async createPost({ title, content, status="active", slug, userId, featuredImage }) {
        if (!title || !content || !status || !slug || !userId || !featuredImage) {
            throw new Error("All fields are required to create a post");
        }

        try {
            const result = await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    status,
                    slug,
                    userId,
                    featuredImage
                }

            )
            return result;
        } catch (error) {
            throw new Error(`Error while creating post: ${error.message}`)
        }
    }

    async getPost(uniqueId) {
        if (!uniqueId) {
            throw new Error("Unique ID is required to get a post");
        }
        try {
            const result = await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                uniqueId
            );
            return result;  
        } catch (error) {
            throw new Error(`Error while fetching post: ${error.message}`);
        }
    }
    


    //update post

    async updatePost(uniqueId, { title, content, featuredImage, status }) {
        if (!uniqueId ) {
            throw new Error("Unique ID and updates are required to update a post");
        }
        try {
            const result = await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                uniqueId,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            return result;
        } catch (error) {
            throw new Error(`Error while updating post: ${error.message}`)

        }
    }

    async deletePost(uniqueId) {
        if (!uniqueId) {
            throw new Error("Unique ID is required to delete a post");
        }
        try {
            const result = await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                uniqueId
            )
        }
        catch (error) {
            throw new Error(`Error while deleting post: ${error.message}`)
        }
    }



    //get all post 

    async getAllpost() {
        try {
            
            const result = await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [Query.equal('status', 'public')]
            )
            
            return result;
        } catch (error) {
            throw new Error(`Error while fetching posts: ${error.message}`);

        }
    }

    //file

    async createFile(file) {
        if (!file) {
            throw new Error("File is required to upload");
        }
        try {
            const result = await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            return result;
        } catch (error) {
            throw new Error(`Error while uploading file: ${error.message}`);

        }
    }
    //get file
    async getFile(fileId) {
        if (!fileId) {
            throw new Error("File ID is required to fetch file");
        }
        try {
            const result = await this.storage.getFile(
                config.appwriteBucketId,
                fileId
            )
            return result;
        }
        catch (error) {
            throw new Error(`Error while fetching file: ${error.message}`);
        }

    }

    async deleteFile(fileId) {
        if (!fileId) {
            throw new Error("File ID is required to delete file");
        }
        try {
            const result = await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return result;
        }
        catch (error) {
            throw new Error(`Error while deleting file : ${error.message}`)
        }
    }
    getFilePreview(fileId) {
        if (!fileId) {
            throw new Error("File ID is required to get file preview");
        }

        try {
            return this.storage.getFilePreview(config.appwriteBucketId, fileId);
        } catch (error) {
            throw new Error(`Error while fetching file preview: ${error.message}`);
        }
    }
}

const databaseService = new databaseConfig();
export default databaseService;

