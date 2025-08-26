export const TeamTab = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Equipe Médica</h1>
          <p className="text-muted-foreground mt-1">
            Colabore com outros profissionais da saúde
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="text-center text-muted-foreground">
          <p>Funcionalidade em desenvolvimento</p>
          <p className="text-sm mt-2">Em breve você poderá acessar o fórum da equipe médica</p>
        </div>
      </div>
    </div>
  );
};