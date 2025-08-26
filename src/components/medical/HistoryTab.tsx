import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, User } from "lucide-react";

const closedCases = [
  {
    id: "1",
    title: "Hipertensão arterial - diagnóstico confirmado",
    description: "Paciente feminina, 52 anos. Acompanhamento concluído com sucesso.",
    diagnosis: "Hipertensão Arterial Sistêmica",
    outcome: "Tratamento iniciado",
    closedDate: "20/01/2024",
    duration: "7 dias"
  },
  {
    id: "2", 
    title: "Pneumonia comunitária - recuperação completa",
    description: "Homem, 38 anos. Tratamento antibiótico eficaz.",
    diagnosis: "Pneumonia Comunitária",
    outcome: "Alta hospitalar",
    closedDate: "18/01/2024",
    duration: "5 dias"
  },
  {
    id: "3",
    title: "Gastroenterite viral - resolução espontânea",
    description: "Criança, 8 anos. Suporte clínico e hidratação.",
    diagnosis: "Gastroenterite Viral",
    outcome: "Recuperação completa",
    closedDate: "15/01/2024",
    duration: "3 dias"
  },
  {
    id: "4",
    title: "Consulta preventiva - check-up completo",
    description: "Homem, 35 anos. Avaliação de rotina sem alterações.",
    diagnosis: "Exame Normal",
    outcome: "Orientações preventivas",
    closedDate: "12/01/2024",
    duration: "1 dia"
  }
];

export const HistoryTab = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Histórico de Casos</h1>
          <p className="text-muted-foreground mt-1">
            Consulte seus casos médicos finalizados
          </p>
        </div>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {closedCases.map((case_) => (
            <Card key={case_.id} className="shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <h3 className="font-semibold text-foreground">{case_.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {case_.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Diagnóstico
                    </p>
                    <p className="text-sm text-foreground font-medium">{case_.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Desfecho
                    </p>
                    <p className="text-sm text-foreground font-medium">{case_.outcome}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Finalizado em {case_.closedDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>Duração: {case_.duration}</span>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Concluído
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