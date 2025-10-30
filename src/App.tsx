"use client";

import {
    Authenticated,
    Unauthenticated,
} from "convex/react";
import Chat from "./components/chat";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import SignInForm from "./components/sign-in";
import SignOutButton from "./components/sign-out.tsx"

export default function App() {
    const currentUser = useQuery(api.user.currentUser)

    return (
        <>
            <Authenticated>
                <div className="relative h-screen w-full flex flex-col">
                    <div className="bg-black top-0 border-b-1 border-white sticky h-24 px-4 flex w-full items-center justify-between">
                        <p>logado atualmente como: {currentUser?.username}</p>
                        <SignOutButton />
                    </div>
                    <main className="flex-1">
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

