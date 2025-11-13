import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { formatDistanceToNow } from "date-fns"

export default function Chat() {
    const messages = useQuery(api.messages.getMessages)

    return (
        <div className="w-2/3 flex flex-col justify-between h-full">
            <div className="w-full flex flex-col overflow-y-scroll flex-1 justify-end">
                {messages?.length === 0 && (
                    <p className="py-8">não existem mensagens encontradas</p>
                )}
                {messages?.map((m) => (
                    <div key={m.createdAt} className="w-full flex justify-between py-4 px-6">
                        <p className="flex self-start gap-4">
                            <span style={{ color: `${m.color}` }} className="font-bold leading-10">{m.user}</span>
                            <span className="leading-10 break-all">{m.message}</span>
                        </p>
                        <p className="text-xs leading-10 text-muted-foreground">{formatDistanceToNow(new Date(m.createdAt), { addSuffix: true })}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}
