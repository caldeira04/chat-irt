import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useRef, useState, KeyboardEvent } from "react"
import { formatDistanceToNow, WeekOptions } from "date-fns"

export default function Chat() {

    const messages = useQuery(api.messages.getMessages)
    const createMessage = useMutation(api.messages.createMessage)
    const [message, setMessage] = useState<string>("")
    const inputRef = useRef<HTMLTextAreaElement>(null)

    function handleSubmit() {
        createMessage({
            message
        })
        setMessage("")
    }

    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className="bg-black w-full flex flex-col justify-between h-full">
            <div className="w-full flex flex-col h-full items-center justify-end">
                {messages?.length === 0 && (
                    <p className="py-8">não existem mensagens encontradas</p>
                )}
                {messages?.map((m) => (
                    <div className="w-full flex justify-between py-4 px-6">
                        <p className="flex self-start gap-4">
                            <span className="font-bold leading-10">{m.user}</span>
                            <pre className="leading-10">
                                <span>{m.message}</span>
                            </pre>
                        </p>
                        <p>{formatDistanceToNow(new Date(m.createdAt), { addSuffix: true })}</p>
                    </div>
                ))}
            </div>
            <div className="flex gap-4 w-full p-4">
                <Textarea onKeyDown={handleKeyDown} value={message} ref={inputRef} onChange={(e) => setMessage(e.target.value)} className="w-full" placeholder="insira sua mensagem" />
                <Button disabled={message.length === 0} onClick={handleSubmit} className="h-full px-8">enviar</Button>
            </div>
        </div>
    )

}
