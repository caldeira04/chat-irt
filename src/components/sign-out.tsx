import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";

export default function SignOutButton() {
    const { isAuthenticated } = useConvexAuth();
    const { signOut } = useAuthActions();
    return (
        <>
            {isAuthenticated && (
                <Button
                    variant="secondary"
                    onClick={() => void signOut()}
                >
                    sair
                </Button>
            )}
        </>
    );
}

