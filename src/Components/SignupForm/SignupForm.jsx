"use client"

import { authClient, signIn } from "@/app/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Check } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
const SignupForm = () => {
    const handleGoogleLogin = async () => {
        await signIn.social({
            provider: "google",

        });

    }
    const onSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const signupData = Object.fromEntries(formData.entries())
        const { name, password, email, image } = signupData

        const { data, error } = await authClient.signUp.email({
            name,
            email,
            password,
            image

        })
        if (error) {
            toast.error("please fill all the field up")
        } else {
            toast.success("Sign Up Successful")
            redirect("/")
        }
        window.location.reload()

    }
    return (
        <div>
            <Form className="flex w-96 flex-col gap-4 justify-center mx-auto border p-10 m-10 rounded-xl" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                        if (value.length < 3) {
                            return "Name must be at least 3 characters";
                        }
                        return null;
                    }}
                >
                    <Label>Name</Label>
                    <Input placeholder="Enter Your Name" />
                    <FieldError />
                </TextField>
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
                <TextField isRequired>
                    <Label>Image</Label>
                    <Input name="image" placeholder="paste your photo URL"></Input>
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
                <div className="grid gap-3">
                    <Button className={" w-full bg-green-500"} type="submit">
                        <Check />Submit
                    </Button>
                    <Link href={"/login"}>
                        <Button className={"w-full"}>Login</Button>
                    </Link>
                    <Button onClick={handleGoogleLogin} className="w-full" variant="tertiary">
                        <Icon icon="devicon:google" />
                        Sign in with Google
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SignupForm;