import conf from '../conf/conf';
import {Client, Account, ID, Databases, Storage, Query} from "appwrite";

export class Service{
    client= new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases= new Databases(this.client);
        this.storage= new Storage(this.client);
    }

    // defining createpost function

    async createPost({title, slug, content, featuredImage, status, userID}){
        try {
            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,//slug is our post's unique id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    //defining update document , taking slug as it is unique id

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    //deletePost

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    //get a document :: This endpoint response returns a JSON object with the document data.

    async getPost(slug){
        try {
           return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    //above method gets a document with unique passed slug, but what if we need a list of documents, but we don't need all documents, we only want those documents whose status is active

    /**Query.equal("title", ["Iron Man"])	
     * Returns document if attribute is equal to any value in the provided array. in below code i have only used one element that is "active" but could have used an entire array if we had more than 2 options to select from in status  
     * can provide multiple query that's why using an array
     ## IMP:
     * to use in below manner we had to make indexes in appwrite collection as type:key (for status here)*/

    async getPosts(queries=[Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                //By default, results are limited to the first 25 items. We can change this through pagination.
                /**
                 *  which can be changed using the Query.limit(25) operator. Beware that large pages can degrade performance.
                 * Offset pagination
Offset pagination works by dividing documents into M pages containing N documents. Every page is retrieved by skipping offset = M * (N - 1) items and reading the following M pages.

Using Query.limit() and Query.offset() you can achieve offset pagination. With Query.limit() you can define how many documents can be returned from one request. The Query.offset() is number of records you wish to skip before selecting records.

Draw backs
While traditional offset pagination is familiar, it comes with some drawbacks. The request gets slower as the number of records increases because the database has to read up to the offset number M * (N - 1) of rows to know where it should start selecting data. If the data changes frequently, offset pagination will also produce missing and duplicate results.

Cursor pagination
The cursor is a unique identifier for a document that points to where the next page should start. After reading a page of documents, pass the last document's ID into the Query.cursorAfter(lastId) query method to get the next page of documents. Pass the first document's ID into the Query.cursorBefore(firstId) query method to retrieve the previous page.
                 */
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    //file upload methods

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    //file delete method

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    //file preview:: works fast so no need to make async function

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service= new Service();
export default service