import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, MessageCircle, Clock, Send } from "lucide-react";
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
    conversation: [
      { sender: "Dr. Maria Santos", message: "Colegas, compartilho caso interessante. Paciente masculino, 28 anos, atleta amador, apresentou dor torácica súbita durante corrida.", time: "14:30", type: "doctor" },
      { sender: "Dr. Carlos Mendes", message: "Oi Maria! Que sintomas específicos ele relatou? A dor irradiou para algum local?", time: "14:32", type: "doctor" },
      { sender: "Dr. Maria Santos", message: "Dor em aperto retroesternal, 9/10, irradiação para braço esquerdo e mandíbula. Sudorese intensa.", time: "14:35", type: "doctor" },
      { sender: "Dr. Ana Costa", message: "Há fatores de risco? História familiar? Uso de substâncias?", time: "14:37", type: "doctor" },
      { sender: "Dr. Maria Santos", message: "Sem comorbidades conhecidas. Pai teve IAM aos 52 anos. Nega drogas ilícitas.", time: "14:38", type: "doctor" },
      { sender: "Dr. Carlos Mendes", message: "ECG já foi feito? Troponinas coletadas?", time: "14:40", type: "doctor" },
      { sender: "Dr. Maria Santos", message: "Sim! ECG mostra elevação de ST em V1-V4. Troponina: 2.8 ng/mL (normal <0.04)", time: "14:42", type: "doctor" },
      { sender: "Dr. Ana Costa", message: "Quadro típico de IAMCSST anterior. Já ativaram hemodinâmica? Tempo é crucial!", time: "14:43", type: "doctor" },
      { sender: "Dr. Maria Santos", message: "Exato! Protocolo ativado. Angioplastia primária em 45min do início dos sintomas.", time: "14:45", type: "doctor" },
      { sender: "Dr. Carlos Mendes", message: "Perfeito manejo! Em jovem atleta, investigar causas secundárias como dissecção coronariana.", time: "14:46", type: "doctor" }
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
    conversation: [
      { sender: "Dr. Pedro Lima", message: "Pessoal, preciso de ajuda com protocolo de sedação. Paciente pediátrico, 4 anos, 18kg, para extração dentária complexa.", time: "12:15", type: "doctor" },
      { sender: "Dr. Lucia Fernandes", message: "Oi Pedro! Já fiz muitos casos assim. Para essa idade e peso, uso midazolam 0,5mg/kg VO.", time: "12:18", type: "doctor" },
      { sender: "Dr. Pedro Lima", message: "E sobre óxido nitroso? É seguro combinar?", time: "12:20", type: "doctor" },
      { sender: "Dr. Roberto Silva", message: "Sim, combinação segura! N2O 30-50% é ideal. Sempre com monitoração contínua.", time: "12:22", type: "doctor" },
      { sender: "Dr. Lucia Fernandes", message: "Exato! Monitore SpO2, FC e estado de consciência a cada 5 minutos.", time: "12:24", type: "doctor" },
      { sender: "Dr. Pedro Lima", message: "E se a criança não colaborar mesmo assim?", time: "12:26", type: "doctor" },
      { sender: "Dr. Roberto Silva", message: "Nesse caso, considere contenção física gentil ou anestesia geral com anestesista.", time: "12:28", type: "doctor" },
      { sender: "Dr. Pedro Lima", message: "Perfeito! Muito obrigado pela orientação, colegas. Caso resolvido com sucesso!", time: "12:45", type: "doctor" }
    ]
  },
  {
    id: "3",
    title: "Diagnóstico diferencial - Dispneia em idoso",
    description: "Paciente masculino, 72 anos, dispneia progressiva há 3 semanas. Exame físico com estertores bibasais.",
    author: "Dr. Fernando Rocha",
    authorSpecialty: "Clínica Médica",
    sharedDate: "6h atrás",
    tags: ["Clínica", "Cardiologia"],
    status: "Resolvido",
    rating: 4.5,
    comments: 15,
    avatarFallback: "FR",
    conversation: [
      { sender: "Dr. Fernando Rocha", message: "Colegas, paciente 72 anos com dispneia progressiva. Alguém pode ajudar no diagnóstico diferencial?", time: "10:20", type: "doctor" },
      { sender: "Dr. Beatriz Lopes", message: "Claro! Conte mais sobre história e exame físico.", time: "10:22", type: "doctor" },
      { sender: "Dr. Fernando Rocha", message: "Dispneia aos pequenos esforços há 3 semanas. Edema MMII ++/4+. Estertores bibasais.", time: "10:25", type: "doctor" },
      { sender: "Dr. João Cardoso", message: "História de HAS ou cardiopatia prévia?", time: "10:27", type: "doctor" },
      { sender: "Dr. Fernando Rocha", message: "HAS há 15 anos, mal controlada. IAM prévio há 5 anos.", time: "10:28", type: "doctor" },
      { sender: "Dr. Beatriz Lopes", message: "Suspeito fortemente de IC descompensada. ECO foi solicitado?", time: "10:30", type: "doctor" },
      { sender: "Dr. Fernando Rocha", message: "Eco mostra FE 35%, hipocinesia anterior extensa. BNP: 1200 pg/mL", time: "10:35", type: "doctor" },
      { sender: "Dr. João Cardoso", message: "Confirmado! IC sistólica. Iniciaria diurético, IECA e beta-bloqueador.", time: "10:37", type: "doctor" },
      { sender: "Dr. Beatriz Lopes", message: "Concordo. Furosemida 40mg/dia, enalapril 5mg 2x/dia, carvedilol iniciar baixa dose.", time: "10:39", type: "doctor" }
    ]
  }
];

export const TeamTab = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);

  const selectedCaseData = sharedCases.find(c => c.id === selectedCase);

  const handleOpenCase = (caseId: string) => {
    setSelectedCase(caseId);
    setIsModalOpen(true);
    setUserRating(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
    setNewComment("");
    setUserRating(0);
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    toast({
      title: "Avaliação enviada",
      description: `Você avaliou esta discussão com ${rating} estrela${rating > 1 ? 's' : ''}.`,
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Card clicked, opening case:", case_.id);
                handleOpenCase(case_.id);
              }}
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
                      <span>Ver discussão</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Case Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedCaseData && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  {selectedCaseData.title}
                </DialogTitle>
                <div className="flex items-center space-x-3 mt-2">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white font-semibold">
                      {selectedCaseData.avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{selectedCaseData.author}</p>
                    <p className="text-sm text-muted-foreground">{selectedCaseData.authorSpecialty}</p>
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
              </DialogHeader>

              <div className="space-y-6">
                {/* Case Description */}
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Descrição do Caso</h3>
                  <p className="text-muted-foreground">{selectedCaseData.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
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
                </div>

                <Separator />

                {/* Doctor Conversation */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Discussão entre Médicos</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto bg-muted/20 p-4 rounded-lg">
                    {selectedCaseData.conversation.map((message, index) => (
                      <div key={index} className="flex space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-white text-xs font-semibold">
                            {message.sender.split(" ")[1]?.substring(0, 2).toUpperCase() || "MD"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-foreground">{message.sender}</span>
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                          <div className="bg-card p-3 rounded-lg border">
                            <p className="text-sm text-foreground">{message.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Rating Section */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Avalie esta discussão</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        className="transition-colors hover:scale-110"
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
                    {selectedCaseData.status === "Resolvido" && selectedCaseData.rating > 0 && (
                      <span className="text-sm text-muted-foreground ml-4">
                        Avaliação média: {selectedCaseData.rating}/5
                      </span>
                    )}
                  </div>
                </div>

                {/* Add Comment */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Adicionar Comentário</h3>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Compartilhe sua opinião sobre este caso..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="bg-primary hover:bg-primary-hover text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Publicar Comentário
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};