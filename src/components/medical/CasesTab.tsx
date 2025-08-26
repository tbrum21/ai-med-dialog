import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";

const openCases = [
  {
    id: "1",
    title: "Paciente com dor torácica atípica",
    description: "Homem, 45 anos, dor precordial intermitente há 3 dias. Investigação em andamento.",
    status: "Em andamento",
    lastUpdate: "Há 2 horas",
    priority: "Alta",
    date: "23/01/2024"
  },
  {
    id: "2", 
    title: "Criança com febre prolongada",
    description: "Menina, 6 anos, febre persistente há 5 dias sem foco aparente.",
    status: "Aguardando exames",
    lastUpdate: "Há 4 horas", 
    priority: "Média",
    date: "22/01/2024"
  },
  {
    id: "3",
    title: "Idoso com confusão mental",
    description: "Homem, 78 anos, alteração do estado mental de início súbito.",
    status: "Em consulta",
    lastUpdate: "Há 1 hora",
    priority: "Alta", 
    date: "23/01/2024"
  }
];

export const CasesTab = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800 border-red-200";
      case "Média":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Baixa":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Casos em Aberto</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus casos médicos ativos
          </p>
        </div>
      </div>

      {/* Cases */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {openCases.map((case_) => (
            <Card key={case_.id} className="shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{case_.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {case_.description}
                    </p>
                  </div>
                  <Badge className={`ml-4 ${getPriorityColor(case_.priority)}`}>
                    {case_.priority}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{case_.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{case_.lastUpdate}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary">
                    {case_.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};