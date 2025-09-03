import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Star, Send, MessageCircle } from "lucide-react";

const caseData = {
  "1": {
    title: "Síndrome coronariana aguda - Paciente jovem atleta",
    description: "Homem, 28 anos, corredor amador. Dor torácica súbita durante treino. ECG com elevação de ST em derivações anteriores.",
    author: "Dr. Maria Santos",
    authorSpecialty: "Cardiologia",
    tags: ["Cardiologia", "Emergência"],
    status: "Em discussão",
    avatarFallback: "MS",
    conversation: [
      { id: 1, sender: "Dr. Maria Santos", message: "Colegas, compartilho caso interessante. Paciente masculino, 28 anos, atleta amador, apresentou dor torácica súbita durante corrida.", time: "14:30", type: "doctor" },
      { id: 2, sender: "Dr. Carlos Mendes", message: "Oi Maria! Que sintomas específicos ele relatou? A dor irradiou para algum local?", time: "14:32", type: "doctor" },
      { id: 3, sender: "Dr. Maria Santos", message: "Dor em aperto retroesternal, 9/10, irradiação para braço esquerdo e mandíbula. Sudorese intensa.", time: "14:35", type: "doctor" },
      { id: 4, sender: "Dr. Ana Costa", message: "Há fatores de risco? História familiar? Uso de substâncias?", time: "14:37", type: "doctor" },
      { id: 5, sender: "Dr. Maria Santos", message: "Sem comorbidades conhecidas. Pai teve IAM aos 52 anos. Nega drogas ilícitas.", time: "14:38", type: "doctor" },
      { id: 6, sender: "Dr. Carlos Mendes", message: "ECG já foi feito? Troponinas coletadas?", time: "14:40", type: "doctor" },
      { id: 7, sender: "Dr. Maria Santos", message: "Sim! ECG mostra elevação de ST em V1-V4. Troponina: 2.8 ng/mL (normal <0.04)", time: "14:42", type: "doctor" },
      { id: 8, sender: "Dr. Ana Costa", message: "Quadro típico de IAMCSST anterior. Já ativaram hemodinâmica? Tempo é crucial!", time: "14:43", type: "doctor" },
      { id: 9, sender: "Dr. Maria Santos", message: "Exato! Protocolo ativado. Angioplastia primária em 45min do início dos sintomas.", time: "14:45", type: "doctor" },
      { id: 10, sender: "Dr. Carlos Mendes", message: "Perfeito manejo! Em jovem atleta, investigar causas secundárias como dissecção coronariana.", time: "14:46", type: "doctor" },
      { id: 11, sender: "Dr. Ana Costa", message: "Concordo. Também verificar uso de suplementos ou esteroides anabolizantes.", time: "14:48", type: "doctor" },
      { id: 12, sender: "Dr. Maria Santos", message: "Excelente ponto! Questionei e ele confirmou uso de creatina, mas nega esteroides.", time: "14:50", type: "doctor" }
    ]
  },
  "2": {
    title: "Protocolo sedação pediátrica - Dúvidas dosagem",
    description: "Criança 4 anos, 18kg. Procedimento odontológico complexo. Qual protocolo de sedação consciente mais seguro?",
    author: "Dr. Pedro Lima",
    authorSpecialty: "Pediatria",
    tags: ["Pediatria", "Sedação"],
    status: "Resolvido",
    avatarFallback: "PL",
    conversation: [
      { id: 1, sender: "Dr. Pedro Lima", message: "Pessoal, preciso de ajuda com protocolo de sedação. Paciente pediátrico, 4 anos, 18kg, para extração dentária complexa.", time: "12:15", type: "doctor" },
      { id: 2, sender: "Dr. Lucia Fernandes", message: "Oi Pedro! Já fiz muitos casos assim. Para essa idade e peso, uso midazolam 0,5mg/kg VO.", time: "12:18", type: "doctor" },
      { id: 3, sender: "Dr. Pedro Lima", message: "E sobre óxido nitroso? É seguro combinar?", time: "12:20", type: "doctor" },
      { id: 4, sender: "Dr. Roberto Silva", message: "Sim, combinação segura! N2O 30-50% é ideal. Sempre com monitoração contínua.", time: "12:22", type: "doctor" },
      { id: 5, sender: "Dr. Lucia Fernandes", message: "Exato! Monitore SpO2, FC e estado de consciência a cada 5 minutos.", time: "12:24", type: "doctor" },
      { id: 6, sender: "Dr. Pedro Lima", message: "E se a criança não colaborar mesmo assim?", time: "12:26", type: "doctor" },
      { id: 7, sender: "Dr. Roberto Silva", message: "Nesse caso, considere contenção física gentil ou anestesia geral com anestesista.", time: "12:28", type: "doctor" },
      { id: 8, sender: "Dr. Pedro Lima", message: "Perfeito! Muito obrigado pela orientação, colegas. Caso resolvido com sucesso!", time: "12:45", type: "doctor" }
    ]
  },
  "3": {
    title: "Diagnóstico diferencial - Dispneia em idoso",
    description: "Paciente masculino, 72 anos, dispneia progressiva há 3 semanas. Exame físico com estertores bibasais.",
    author: "Dr. Fernando Rocha",
    authorSpecialty: "Clínica Médica",
    tags: ["Clínica", "Cardiologia"],
    status: "Resolvido",
    avatarFallback: "FR",
    conversation: [
      { id: 1, sender: "Dr. Fernando Rocha", message: "Colegas, paciente 72 anos com dispneia progressiva. Alguém pode ajudar no diagnóstico diferencial?", time: "10:20", type: "doctor" },
      { id: 2, sender: "Dr. Beatriz Lopes", message: "Claro! Conte mais sobre história e exame físico.", time: "10:22", type: "doctor" },
      { id: 3, sender: "Dr. Fernando Rocha", message: "Dispneia aos pequenos esforços há 3 semanas. Edema MMII ++/4+. Estertores bibasais.", time: "10:25", type: "doctor" },
      { id: 4, sender: "Dr. João Cardoso", message: "História de HAS ou cardiopatia prévia?", time: "10:27", type: "doctor" },
      { id: 5, sender: "Dr. Fernando Rocha", message: "HAS há 15 anos, mal controlada. IAM prévio há 5 anos.", time: "10:28", type: "doctor" },
      { id: 6, sender: "Dr. Beatriz Lopes", message: "Suspeito fortemente de IC descompensada. ECO foi solicitado?", time: "10:30", type: "doctor" },
      { id: 7, sender: "Dr. Fernando Rocha", message: "Eco mostra FE 35%, hipocinesia anterior extensa. BNP: 1200 pg/mL", time: "10:35", type: "doctor" },
      { id: 8, sender: "Dr. João Cardoso", message: "Confirmado! IC sistólica. Iniciaria diurético, IECA e beta-bloqueador.", time: "10:37", type: "doctor" },
      { id: 9, sender: "Dr. Beatriz Lopes", message: "Concordo. Furosemida 40mg/dia, enalapril 5mg 2x/dia, carvedilol iniciar baixa dose.", time: "10:39", type: "doctor" }
    ]
  }
};

export const CaseDebate = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);

  const currentCase = caseData[caseId as keyof typeof caseData];

  if (!currentCase) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Caso não encontrado</h2>
          <Button onClick={() => navigate("/dashboard")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    toast({
      title: "Comentário adicionado",
      description: "Seu comentário foi publicado com sucesso.",
    });
    setNewComment("");
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    toast({
      title: "Avaliação enviada",
      description: `Você avaliou esta discussão com ${rating} estrela${rating > 1 ? 's' : ''}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate("/dashboard")}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Debate do Caso</h1>
            <div className="w-24"></div> {/* Spacer */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Discussion Area */}
          <div className="lg:col-span-3">
            {/* Case Header */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white font-semibold">
                        {currentCase.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{currentCase.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        Por {currentCase.author} • {currentCase.authorSpecialty}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${
                      currentCase.status === "Resolvido"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-yellow-100 text-yellow-700 border-yellow-200"
                    }`}
                  >
                    {currentCase.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{currentCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {currentCase.tags.map((tag) => (
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

            {/* Discussion Messages */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Discussão entre Médicos ({currentCase.conversation.length} mensagens)
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {currentCase.conversation.map((message) => (
                    <div key={message.id} className="flex space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-white text-sm font-semibold">
                          {message.sender.split(" ")[1]?.substring(0, 2).toUpperCase() || "MD"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-foreground">{message.sender}</span>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <p className="text-sm text-foreground">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Rating Section */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-foreground">Avaliar Discussão</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        className="transition-all hover:scale-110"
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
                  </div>
                  {userRating > 0 && (
                    <p className="text-sm text-center text-muted-foreground">
                      Você avaliou com {userRating} estrela{userRating > 1 ? 's' : ''}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Add Comment */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-foreground">Adicionar Comentário</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Compartilhe sua opinião sobre este caso..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="w-full bg-primary hover:bg-primary-hover text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Publicar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Case Stats */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-foreground">Estatísticas</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mensagens:</span>
                      <span className="font-medium">{currentCase.conversation.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Participantes:</span>
                      <span className="font-medium">
                        {new Set(currentCase.conversation.map(m => m.sender)).size}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          currentCase.status === "Resolvido"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {currentCase.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDebate;