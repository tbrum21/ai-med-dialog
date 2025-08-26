import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, MessageCircle, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const forumPosts = [
  {
    id: "1",
    title: "Caso complexo: Síndrome coronariana aguda em paciente jovem",
    description: "Paciente masculino, 28 anos, apresentou dor torácica súbita durante exercício. ECG mostrou elevação de ST em derivações anteriores...",
    author: "Dr. Maria Santos",
    authorSpecialty: "Cardiologia",
    date: "Há 2 horas",
    tags: ["Cardiologia", "Emergência"],
    replies: 8,
    likes: 12,
    avatarFallback: "MS"
  },
  {
    id: "2", 
    title: "Protocolo de sedação em pediatria: experiências e dúvidas",
    description: "Gostaria de discutir protocolos de sedação consciente em crianças de 2-6 anos para procedimentos odontológicos. Quais medicações vocês utilizam?",
    author: "Dr. Pedro Lima",
    authorSpecialty: "Pediatria",
    date: "Há 4 horas",
    tags: ["Pediatria", "Sedação"],
    replies: 15,
    likes: 23,
    avatarFallback: "PL"
  },
  {
    id: "3",
    title: "Interpretação de neuroimagem: lesão suspeita em lobo temporal",
    description: "Solicito ajuda na interpretação de RM cerebral. Paciente com crises convulsivas de início recente, imagem sugere lesão focal...",
    author: "Dr. Ana Costa",
    authorSpecialty: "Neurologia", 
    date: "Há 6 horas",
    tags: ["Neurologia", "Imagem"],
    replies: 6,
    likes: 9,
    avatarFallback: "AC"
  }
];

export const ForumTab = () => {
  const handleNewPost = () => {
    toast({
      title: "Nova discussão",
      description: "Funcionalidade em desenvolvimento. Em breve você poderá criar novos tópicos!",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Fórum Médico</h1>
            <p className="text-muted-foreground mt-1">
              Compartilhe casos e discuta com colegas médicos
            </p>
          </div>
          <Button
            onClick={handleNewPost}
            className="bg-primary hover:bg-primary-hover text-white rounded-[var(--radius)] flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Discussão</span>
          </Button>
        </div>
      </div>

      {/* Posts */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {forumPosts.map((post) => (
            <Card key={post.id} className="shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white font-semibold">
                        {post.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.authorSpecialty}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
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
                      <span>{post.replies}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.likes}</span>
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