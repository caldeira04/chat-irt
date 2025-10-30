import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInForm() {
    const { signIn } = useAuthActions();
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>("")

    function getRandomColor(): string {
        const random = Math.floor(Math.random() * 16777215); // 0xFFFFFF
        return `#${random.toString(16).padStart(6, "0")}`;
    }

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
                    formData.set("color", getRandomColor())
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
