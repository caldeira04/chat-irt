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
import Input from "./components/input.tsx";

export default function App() {
    const currentUser = useQuery(api.user.currentUser)

    return (
        <div className="overflow-y-clip">
            <Authenticated>
                <div className="flex pt-4 h-screen overflow-y-clip">
                    <div className="w-1/3 flex flex-col gap-4 items-center">
                        <p>logado atualmente como: <strong>{currentUser?.username}</strong></p>
                        <SignOutButton />
                    </div>
                    <div className="flex w-full justify-between">
                        <Chat />
                        <Input />
                    </div>
                </div>
            </Authenticated>
            <Unauthenticated>
                <div className="w-full h-screen flex justify-center items-center">
                    <SignInForm />
                </div>
            </Unauthenticated>
        </div>
    );
}

