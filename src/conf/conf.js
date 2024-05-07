/**Below code is a good practice through which we make sure that we are shipping string variable out of conf, also we won't require to write that whole meta.env thing everywhere we require to use that env */
const conf= {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    appWriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID)

}

export default conf;