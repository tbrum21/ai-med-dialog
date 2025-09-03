import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, MessageCircle, Clock, ArrowLeft, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const sharedCases = [
  {
    id: "1",
    title: "Síndrome coronariana aguda - Paciente jovem atleta",
    description: "Homem, 28 anos, corredor amador. Dor torácica súbita durante treino. ECG com elevação de ST em derivações anteriores.",
    author: "Dr. Maria Santos",
    authorSpecialty: "Cardiologia",
    sharedDate: "2h atrás",
    tags: ["Cardiologia", "Emergência"],
    status: "Em discussão",
    rating: 0,
    comments: 12,
    avatarFallback: "MS",
    chatHistory: [
      { sender: "Dr. Maria Santos", message: "Paciente chegou com dor torácica típica durante exercício.", time: "14:30" },
      { sender: "IA", message: "Baseado nos sintomas, sugiro ECG de 12 derivações imediato e dosagem de troponinas.", time: "14:31" },
      { sender: "Dr. Maria Santos", message: "ECG realizado: elevação de ST em V1-V4. Troponina: 2.5 ng/mL", time: "14:35" },
      { sender: "IA", message: "Quadro compatível com IAM anterior. Recomendo ativação do protocolo de IAMCSST.", time: "14:36" }
    ]
  },
  {
    id: "2",
    title: "Protocolo sedação pediátrica - Dúvidas dosagem",
    description: "Criança 4 anos, 18kg. Procedimento odontológico complexo. Qual protocolo de sedação consciente mais seguro?",
    author: "Dr. Pedro Lima",
    authorSpecialty: "Pediatria",
    sharedDate: "4h atrás",
    tags: ["Pediatria", "Sedação"],
    status: "Resolvido",
    rating: 4.8,
    comments: 8,
    avatarFallback: "PL",
    chatHistory: [
      { sender: "Dr. Pedro Lima", message: "Preciso de protocolo seguro para sedação em odontopediatria.", time: "12:15" },
      { sender: "IA", message: "Para criança de 18kg, sugiro midazolam 0,5mg/kg VO + óxido nitroso.", time: "12:16" },
      { sender: "Dr. Pedro Lima", message: "E o monitoramento? Quais parâmetros devo observar?", time: "12:20" },
      { sender: "IA", message: "Monitorar: SpO2 contínua, FC, FR de 5/5min. Manter SpO2 >95%.", time: "12:21" }
    ]
  }
];

export const TeamTab = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);

  const selectedCaseData = sharedCases.find(c => c.id === selectedCase);

  const handleRating = (rating: number) => {
    setUserRating(rating);
    toast({
      title: "Avaliação enviada",
      description: `Você avaliou este caso com ${rating} estrela${rating > 1 ? 's' : ''}.`,
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    toast({
      title: "Comentário adicionado",
      description: "Seu comentário foi publicado com sucesso.",
    });
    setNewComment("");
  };

  if (selectedCase && selectedCaseData) {
    return (
      <div className="flex flex-col h-full">
        {/* Case Detail Header */}
        <div className="p-6 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCase(null)}
                className="hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Detalhes do Caso</h1>
                <p className="text-muted-foreground mt-1">
                  Compartilhado por {selectedCaseData.author}
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className={`${
                selectedCaseData.status === "Resolvido"
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-yellow-100 text-yellow-700 border-yellow-200"
              }`}
            >
              {selectedCaseData.status}
            </Badge>
          </div>
        </div>

        {/* Case Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Case Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white font-semibold">
                      {selectedCaseData.avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedCaseData.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedCaseData.author} • {selectedCaseData.authorSpecialty}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">{selectedCaseData.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedCaseData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat History */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-foreground">Histórico da Conversa</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedCaseData.chatHistory.map((message, index) => (
                  <div key={index} className="flex space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-muted text-xs">
                        {message.sender === "IA" ? "IA" : message.sender.split(" ")[1]?.charAt(0) || "M"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rating Section */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-foreground">Avalie este caso</h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= userRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground hover:text-yellow-400"
                      }`}
                    />
                  </button>
                ))}
                {selectedCaseData.status === "Resolvido" && (
                  <span className="text-sm text-muted-foreground ml-4">
                    Avaliação média: {selectedCaseData.rating}/5
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-foreground">Comentários ({selectedCaseData.comments})</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <Textarea
                    placeholder="Adicione seu comentário sobre este caso..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-primary hover:bg-primary-hover text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Comentar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Equipe Médica</h1>
          <p className="text-muted-foreground mt-1">
            Casos compartilhados para discussão colaborativa
          </p>
        </div>
      </div>

      {/* Shared Cases */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {sharedCases.map((case_) => (
            <Card 
              key={case_.id} 
              className="shadow-card hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedCase(case_.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white font-semibold">
                        {case_.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{case_.author}</p>
                      <p className="text-xs text-muted-foreground">{case_.authorSpecialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">{case_.sharedDate}</span>
                    <div className="flex items-center mt-1">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          case_.status === "Resolvido"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        {case_.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {case_.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {case_.description}
                </p>
                
                <Separator className="my-3" />
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {case_.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs px-2 py-1 bg-primary/10 text-primary border-primary/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{case_.comments}</span>
                    </div>
                    {case_.status === "Resolvido" && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{case_.rating}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Ver detalhes</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};