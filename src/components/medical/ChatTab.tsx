import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export const ChatTab = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Sou sua assistente IA médica. Como posso ajudá-lo hoje?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Entendi sua questão. Com base nas informações fornecidas, posso sugerir algumas abordagens diagnósticas. Você poderia me fornecer mais detalhes sobre os sintomas do paciente?",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleShareCase = () => {
    toast({
      title: "Caso compartilhado",
      description: "O caso foi compartilhado com a equipe médica para discussão.",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Chat IA Médica</h1>
            <p className="text-sm text-muted-foreground">
              Assistente inteligente para decisões clínicas
            </p>
          </div>
          <Button
            onClick={handleShareCase}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar Caso</span>
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-start space-x-3 max-w-3xl ${
                message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback
                  className={
                    message.sender === "user"
                      ? "bg-chat-user-bg text-foreground"
                      : "bg-primary text-white"
                  }
                >
                  {message.sender === "user" ? "DR" : "IA"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-chat-user-bg text-foreground"
                    : "bg-primary text-white"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === "user" ? "text-muted-foreground" : "text-white/70"
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Digite sua pergunta ou descreva o caso clínico..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-primary hover:bg-primary-hover text-white"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};