import { getAuthUserId } from "@convex-dev/auth/server"
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const getMessages = query({
    handler: async (ctx) => {
        const messages = await ctx.db.query("messages")
            .order("asc")
            .take(50)

        return await Promise.all(
            messages.map(async (m) => {
                const user = await ctx.db.get(m.userId)

                return {
                    message: m.text,
                    user: user?.username,
                    createdAt: m._creationTime
                }

            })
        )
    },
})

export const createMessage = mutation({
    args: {
        message: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx)
        if (!userId) return false

        const message = await ctx.db.insert("messages", {
            text: args.message,
            userId
        })

        return message
    }
})
