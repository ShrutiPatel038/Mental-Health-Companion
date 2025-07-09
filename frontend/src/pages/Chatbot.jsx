import { useState } from "react";
import { SendHorizonal, Bot, User } from "lucide-react";
import { sendChatMessage } from "@/lib/api"; // Adjust path if needed
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm here to support you. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await sendChatMessage(input);
      setMessages((prev) => [...prev, { role: "bot", text: res.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl rounded-3xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-purple-600">
          Chat with Calmly 💬
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <ScrollArea className="h-80 border rounded-xl p-4 bg-white space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "bot" && <Bot className="w-4 h-4 text-purple-500 mt-1" />}
              <div
                className={`p-3 max-w-xs rounded-xl text-sm ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
              {msg.role === "user" && <User className="w-4 h-4 text-blue-500 mt-1" />}
            </div>
          ))}
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={loading}
            className="rounded-full"
          />
          <Button
            onClick={sendMessage}
            disabled={loading || input.trim() === ""}
            className="rounded-full"
          >
            <SendHorizonal className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
