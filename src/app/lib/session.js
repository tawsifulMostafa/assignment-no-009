
import { headers } from "next/headers";
import { auth } from "./auth";

export const sessionCheck = async() =>{
    const session = await auth.api.getSession({
        headers: headers()
    })
}