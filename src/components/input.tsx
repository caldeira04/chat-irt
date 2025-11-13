import { useMutation } from "convex/react"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { api } from "../../convex/_generated/api"
import { useRef, useState, KeyboardEvent } from "react"

export default function Input() {

    const createMessage = useMutation(api.messages.createMessage)
    const [message, setMessage] = useState<string>("")
    const inputRef = useRef<HTMLTextAreaElement>(null)
    function handleSubmit() {
        if (message.length > 140) {
            alert("mensagem deve ser menor que 140 caracteres")
            return
        }
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
        <div className="self-end w-1/3 flex items-center">
            <Textarea onKeyDown={handleKeyDown} value={message} ref={inputRef} onChange={(e) => setMessage(e.target.value)} className="w-full" placeholder="insira sua mensagem" />
            <Button disabled={message.length === 0} onClick={handleSubmit} className="h-full px-8">enviar</Button>
        </div>
    )
}
