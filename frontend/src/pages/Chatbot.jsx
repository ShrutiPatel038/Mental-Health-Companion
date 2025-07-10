// import { useState } from "react";
// import { SendHorizonal, Bot, User } from "lucide-react";
// import { sendChatMessage } from "@/lib/api"; // Adjust path if needed
// import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
// import { Input } from "@/Components/ui/input";
// import { Button } from "@/Components/ui/button";
// import { ScrollArea } from "@/Components/ui/scroll-area";

// export default function Chatbot() {
//   const [messages, setMessages] = useState([
//     { role: "bot", text: "Hi! I'm here to support you. How are you feeling today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { role: "user", text: input }];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await sendChatMessage(newMessages);
//       setMessages([...newMessages, { role: "bot", text: res.reply }]);
//     } catch (err) {
//       setMessages([
//         ...newMessages,
//         { role: "bot", text: "Sorry, something went wrong. Please try again later." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   return (
//     <Card className="max-w-2xl mx-auto shadow-xl rounded-3xl bg-white/80 backdrop-blur-sm">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center text-purple-600">
//           Chat with Calmly 💬
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="flex flex-col gap-4">
//         <ScrollArea className="h-80 border rounded-xl p-4 bg-white space-y-3">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex items-start gap-2 ${
//                 msg.role === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               {msg.role === "bot" && <Bot className="w-4 h-4 text-purple-500 mt-1" />}
//               <div
//                 className={`p-3 max-w-xs rounded-xl text-sm ${
//                   msg.role === "user"
//                     ? "bg-blue-100 text-blue-900"
//                     : "bg-gray-100 text-gray-800"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//               {msg.role === "user" && <User className="w-4 h-4 text-blue-500 mt-1" />}
//             </div>
//           ))}
//         </ScrollArea>

//         <div className="flex gap-2">
//           <Input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type your message..."
//             disabled={loading}
//             className="rounded-full"
//           />
//           <Button
//             onClick={sendMessage}
//             disabled={loading || input.trim() === ""}
//             className="rounded-full"
//           >
//             <SendHorizonal className="w-4 h-4" />
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
"use client"

import { useState, useRef, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Card, CardContent } from "@/Components/ui/card"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { ArrowLeft, Send, Bot, User, Heart, Loader2 } from "lucide-react"
import ProtectedRoute from "@/Components/ProtectedRoute"
import { sendChatMessage } from "@/lib/api"

export default function ChatbotPage() {
  const router = useNavigate()
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm Ember, your mental health companion. I'm here to support you. How are you feeling today? 💙",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollAreaRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const newMessages = [...messages, { role: "user", text: input }]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await sendChatMessage(newMessages)
      setMessages([...newMessages, { role: "bot", text: res.reply }])
    } catch (err) {
        console.error("Chatbot error:", err)
      setMessages([...newMessages, { role: "bot", text: "Sorry, something went wrong. Please try again later. 💙" }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-purple-200 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => Navigate("/self-help")}
              className="rounded-full hover:bg-purple-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Self-Help
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Chat with Ember 
              </h1>
            </div>
            <div className="w-24"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Meet Ember 💬
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your compassionate AI companion, ready to listen and support you through your mental health journey.
            </p>
          </div>

          {/* Chat Interface */}
          <Card className="bg-white/90 backdrop-blur-sm border-purple-200 rounded-3xl shadow-xl overflow-hidden">
            <CardContent className="p-0">
              {/* Chat Messages */}
              <ScrollArea ref={scrollAreaRef} className="h-[500px] p-6">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "bot" && (
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}

                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-br-md"
                            : "bg-gradient-to-r from-purple-50 to-pink-50 text-gray-800 border border-purple-200 rounded-bl-md"
                        }`}
                      >
                        {msg.text}
                      </div>

                      {msg.role === "user" && (
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {loading && (
                    <div className="flex items-start gap-3 justify-start">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                          <span className="text-sm text-gray-600">Ember is typing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t border-purple-200 p-6 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Share what's on your mind..."
                      disabled={loading}
                      className="rounded-2xl border-purple-200 focus:border-orange-400 focus:ring-orange-400 bg-white/80 backdrop-blur-sm resize-none min-h-[44px] py-3"
                    />
                  </div>
                  <Button
                    onClick={sendMessage}
                    disabled={loading || input.trim() === ""}
                    className="rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 px-6 py-3 h-[44px]"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  Ember is here to support you. Press Enter to send your message.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Support Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-blue-300 rounded-3xl">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-blue-800 mb-2">Safe Space</h3>
                <p className="text-blue-700 text-sm">
                  This is a judgment-free zone. Share your thoughts and feelings openly with Calmly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-100 to-teal-100 border-green-300 rounded-3xl">
              <CardContent className="p-6 text-center">
                <Bot className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-green-800 mb-2">24/7 Support</h3>
                <p className="text-green-700 text-sm">
                  Ember is always here for you, ready to listen and provide support whenever you need it.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <Card className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300 rounded-3xl">
            <CardContent className="p-6 text-center">
              <p className="text-yellow-800 text-sm">
                <strong>Important:</strong> Ember is an AI companion designed to provide emotional support. For
                professional mental health care, please consult with a licensed therapist or counselor.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
