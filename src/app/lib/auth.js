
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI)



const db = client.db("studyNook");

export const auth = betterAuth({
  baseURL : process.env.BETTER_AUTH_URL ,
  socialProviders : {
    google : {
       clientId: process.env.GOOGLE_CLIENT_ID ,
       clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
    }
  } , 
    emailAndPassword: {   
    enabled: true, 
  }, 
  database: mongodbAdapter(db, {
     
    client
  }),
});