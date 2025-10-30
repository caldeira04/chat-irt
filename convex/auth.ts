import { convexAuth } from "@convex-dev/auth/server";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
    providers: [Anonymous({
        profile(params) {
            return {
                username: params.username as string,
                color: params.color as string,
                isAnonymous: true
            }
        }
    })],
});
