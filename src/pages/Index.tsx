import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Stethoscope, MessageCircle, Users, Activity } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">MedChat AI</h1>
          </div>
          <Button
            onClick={() => navigate("/login")}
            className="bg-primary hover:bg-primary-hover text-white"
          >
            Fazer Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              IA Médica para Decisões
              <span className="text-primary"> Clínicas Inteligentes</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Assistente inteligente que auxilia profissionais da saúde na tomada de decisões, 
              oferecendo suporte diagnóstico e facilitando a colaboração entre equipes médicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white px-8 py-3 text-lg shadow-soft"
              >
                Começar Agora
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-white"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Recursos Principais
            </h3>
            <p className="text-muted-foreground text-lg">
              Tecnologia avançada a serviço da medicina
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-lg shadow-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Chat IA Inteligente</h4>
              <p className="text-muted-foreground">
                Converse com nossa IA especializada em medicina para obter insights e sugestões diagnósticas.
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg shadow-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Colaboração Médica</h4>
              <p className="text-muted-foreground">
                Compartilhe casos com colegas e participe de discussões em fóruns especializados.
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg shadow-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Gestão de Casos</h4>
              <p className="text-muted-foreground">
                Organize e acompanhe seus casos médicos com histórico completo e status atualizados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-foreground">MedChat AI</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 MedChat AI. Assistente inteligente para profissionais da saúde.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
