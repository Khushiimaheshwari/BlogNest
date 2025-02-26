const config = {
    appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    ProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    DatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    CollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    BucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default config;