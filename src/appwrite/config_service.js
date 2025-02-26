import config from "../config/config";
import {Client, ID, Storage, Query} from "appwrite";
import { Databases } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.ProjectId)
            this.databases = new Databases(this.client);  
            this.bucket = new Storage(this.client);

    }

    async createPost({Title, Slug, Content, FeaturedImage, Status, UserId, Category}) {
        try {
            return await this.databases.createDocument(
                config.DatabaseId,
                config.CollectionID,
                Slug,
                {
                    Title,
                    Content,
                    FeaturedImage,
                    Status,
                    UserId,
                    Category
                }
            )
            
        } catch (error) {
            console.log("Appwrite Server :: createPost :: error", error);
        }
    }

    async updatePost(Slug, {Title, Content, FeaturedImage, Status, Category}) {
        try {
            return await this.databases.updateDocument(
                config.DatabaseId,
                config.CollectionID,
                Slug,
                {
                    Title,
                    Content,
                    FeaturedImage,
                    Status,
                    Category
                }
            )
            
        } catch (error) {
            console.log("Appwrite Server :: updatePost :: error", error);
        }
    }

    async deletePost({Slug}) {
        try {
            await this.databases.deleteDocument(
                config.DatabaseId,
                config.CollectionID,
                Slug
            )
            return true;
            
        } catch (error) {
            console.log("Appwrite Server :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(Slug) {
        try {
            return await this.databases.getDocument(
                config.DatabaseId,
                config.CollectionID,
                Slug
            )
            
        } catch (error) {
            console.log("Appwrite Server :: getPost :: error", error);
        }
        return false;
    }

    // Indexes are required in Appwrite to write Queries
    async getAllPost(queries = [Query.equal("Status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.DatabaseId,
                config.CollectionID,
                queries,
            )  
            
        } catch (error) {
            console.log("Appwrite Server :: getAllPost :: error", error);
            return false;
        }      
    }

    // File Services

    async uploadFile(file) {
        try {
            console.log("Uploading file:", file);

            const uploadedFile = await this.bucket.createFile(
                config.BucketId,
                ID.unique(),
                file
            );

            console.log("Uploaded File Response:", uploadedFile);
            return uploadedFile;
            
        } catch (error) {
            console.log("Appwrite Server :: uploadFile :: error", error);
            return null;
        }
    }

    async deleteFile(fileId) {
        try {
            console.log("Attempting to delete file:", fileId);
            await this.bucket.deleteFile(
                config.BucketId,
                fileId
            )
            console.log("File deleted successfully.");
            return true;
            
        } catch (error) {
            console.log("Appwrite Server :: deleteFile :: error", error);
            return false;
        }
    }

    async getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.BucketId,
            fileId
        )
    }

    // Likes
    async likePost (postId, UserId, currentLikes, LikedBy) {
        try {
            const hasLiked = LikedBy.includes(UserId);
            console.log(UserId);
            
            const updatedLikes = hasLiked ? (currentLikes - 1) : (currentLikes + 1);

            const updatedLikedBy = hasLiked ? (LikedBy.filter(id => id !== UserId)) : ([...LikedBy, UserId])

            const updatedPost = await this.databases.updateDocument(
                config.DatabaseId, 
                config.CollectionID, 
                postId, 
                { 
                    Likes: updatedLikes,
                    LikedBy: updatedLikedBy
                 }
            );
            return updatedPost;
        } catch (error) {
            console.error("Error updating likes:", error);
            return null;
        }
    };

    async getLikes () {}
}

const service = new Service

export default service