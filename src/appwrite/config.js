import conf from "../config/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProject)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({
        title , slug, content, featuredImage, status, userId}){

            try{
                return await this.databases.createDocument(
                    conf.appwriteDatabase,
                    conf.appwriteCollection,
                    slug,   //can take any id random
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId,
                    }
                )
            }catch(erro){
                console.log(erro);
            }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabase,
                conf.appwriteCollection,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }catch(error){
            console.log(error);
            return false;
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabase,
                conf.appwriteCollection,
                slug
            )
            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabase,
                conf.appwriteCollection,
                slug
            )
        }catch(error){
            console.log("getPost error : ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")])
    {
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabase,
                conf.appwriteCollection,
                queries,
            )
        }catch(error){
            console.log(error);
            return false;
        }
    }
    // same easy to understand code below ->>
    // async getPosts(){
    //     try {
    //         return await this.databases.listDocuments(
    //             conf.appwriteDatabase,
    //             conf.appwriteCollection,
    //             [Query.equal('status', 'active')]
    //         );
    //     } catch (error) {
    //         console.log("getPostssss error: ", error);
    //     }
    // }

    /*_________________________________________*/

    //FILE UPLOAD SERVICE

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucket,
                ID.unique(),
                file
            )
        }catch(error){
            console.log("Upload file error : ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucket,
                fileId
            )
            return true;
        }catch(error){
            console.log("Err while deleting", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucket,
            fileId
        )
    }

}

const service = new Service();
export default service;