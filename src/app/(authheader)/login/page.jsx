"use client"
import { authClient } from "@/app/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Check } from "lucide-react";
import { toast } from "sonner";



const LoginPage = () => {
    
    const onSubmit = async(e) =>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const loginData = Object.fromEntries(formData.entries())
        console.log(loginData);

        const { data  , error} = await authClient.signIn.email({
            email : loginData.email ,
            password : loginData.password, 
            rememberMe: true , 
            callbackURL: "http://localhost:3000"
        })
       if(error){
            toast.error("Wrong credetential")
        } else{
            toast.success("Login Successful")
            
        }

    }
    return (
        <div>
            <Form className="flex w-96 flex-col gap-4 justify-ceneter mx-auto" onSubmit={onSubmit}>

                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="Enter Your Email" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit">
                        <Check />  Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;