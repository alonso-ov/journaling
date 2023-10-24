"use client"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "../../components/ui/form";
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { signIn } from "next-auth/react";

const formSchema = z.object({
    username: z.string().max(8, { "message": "Username length must not surpass 8 characters" }),
    password: z.string(),
})


export default function Login() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "alonso",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        signIn("credentials", {
            username: values.username,
            password: values.password
        });

        
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }


    return (
        <main className="flex items-center justify-center w-screen h-screen">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-8 border rounded-lg w-72">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="alonso" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••"  {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </main>
    );
}