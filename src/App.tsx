"use client";

import {
    Authenticated,
    Unauthenticated,
    useConvexAuth,
} from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import Chat from "./components/chat";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
    const currentUser = useQuery(api.user.currentUser)

    return (
        <>
            <Authenticated>
                <div className="grid grid-cols-4">
                    <div className="my-8 w-full flex flex-col items-center gap-4">
                        <p>logado atualmente como: {currentUser?.username}</p>
                        <SignOutButton />
                    </div>
                    <main className="col-span-2 h-screen flex flex-col items-center justify-start gap-16">
                        <Chat />
                    </main>
                </div>
            </Authenticated>
            <Unauthenticated>
                <div className="w-full h-screen flex justify-center items-center">
                    <SignInForm />
                </div>
            </Unauthenticated>
        </>
    );
}

function SignOutButton() {
    const { isAuthenticated } = useConvexAuth();
    const { signOut } = useAuthActions();
    return (
        <>
            {isAuthenticated && (
                <Button
                    variant="secondary"
                    onClick={() => void signOut()}
                >
                    Sign out
                </Button>
            )}
        </>
    );
}

function SignInForm() {
    const { signIn } = useAuthActions();
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>("")

    return (
        <div className="flex flex-col gap-8 w-96 mx-auto">
            <p className="text-center font-bold">digite um nome de usuário para entrar no chat</p>
            <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    formData.set("flow", "signUp");
                    formData.set("username", username)
                    void signIn("anonymous", formData).catch((error) => {
                        setError(error.message);
                    });
                }}
            >
                <Input
                    type="text"
                    name="text"
                    placeholder="nome de usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                    variant="default"
                    type="submit"
                    className="w-full"
                    disabled={username.length < 3}
                >
                    entrar
                </Button>
                {error && (
                    <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2">
                        <p className="text-dark dark:text-light font-mono text-xs">
                            Error signing in: {error}
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
}
