import conf from '../conf/conf';
import {Client, Account, ID, Databases, Storage, QUery} from "appwrite";

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
                conf.appWriteCollectionId,
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
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
}


const service= new Service();
export default service