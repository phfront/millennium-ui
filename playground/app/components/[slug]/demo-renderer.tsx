'use client';

import React, { useState } from 'react';
import * as NexusUI from '@phfront/ui';
import { Search, Bell, Home, Settings, User, Shield, ChevronDown, Plus, CheckCheck, Edit, Trash2 } from 'lucide-react';

export function DemoRenderer({ componentName }: { componentName: string }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<string>('');
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [dateValue, setDateValue] = useState<Date | undefined>();
  const [dateLockedToMonth, setDateLockedToMonth] = useState<Date | undefined>();
  const [dateTimeLockedToMonth, setDateTimeLockedToMonth] = useState<Date | undefined>();
  const [dateRangeLockedToMonth, setDateRangeLockedToMonth] = useState<NexusUI.DateRange>({
    start: undefined,
    end: undefined,
  });
  const [dateTimeRangeLockedToMonth, setDateTimeRangeLockedToMonth] = useState<NexusUI.DateRange>({
    start: undefined,
    end: undefined,
  });
  const [timeValue, setTimeValue] = useState<string | undefined>();
  const [dateTimeValue, setDateTimeValue] = useState<Date | undefined>();
  const [dateRangeValue, setDateRangeValue] = useState<NexusUI.DateRange>({ start: undefined, end: undefined });
  const [dateTimeRangeValue, setDateTimeRangeValue] = useState<NexusUI.DateRange>({ start: undefined, end: undefined });
  const [timeRangeValue, setTimeRangeValue] = useState<NexusUI.TimeRange>({ start: undefined, end: undefined });
  const [stepperValue, setStepperValue] = useState('70.0');
  const [linePeriod, setLinePeriod] = useState('all');
  const [matrixAllowed, setMatrixAllowed] = useState(() => new Set(['u1|m1', 'u1|m2', 'u2|m1']));
  const [completionDone, setCompletionDone] = useState(false);
  const [checklistState, setChecklistState] = useState([false, true, false]);
  const [intSliderVal, setIntSliderVal] = useState(3);
  const [holdStepperVal, setHoldStepperVal] = useState(2);
  const [heatmapMonth, setHeatmapMonth] = useState(() => new Date(2026, 3, 1));
  const [monthStepIdx, setMonthStepIdx] = useState(2);
  const [monthPickerValue, setMonthPickerValue] = useState<number | undefined>(3);
  const [monthYearPickerValue, setMonthYearPickerValue] = useState<NexusUI.MonthYearValue | undefined>(() => ({
    year: 2026,
    month: 3,
  }));
  const [inlineAmountDemo, setInlineAmountDemo] = useState(1234.56);
  const [toggleBadgePaid, setToggleBadgePaid] = useState(false);
  const [compactStatusChecked, setCompactStatusChecked] = useState(true);
  const { toast } = NexusUI.useToast();

  function matrixKey(rowId: string, colId: string) {
    return `${rowId}|${colId}`;
  }

  function demoHeatmapData(month: Date): NexusUI.CalendarHeatmapDay[] {
    const y = month.getFullYear();
    const m = month.getMonth();
    const days = new Date(y, m + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => {
      const day = i + 1;
      const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const percent = Math.min(100, (i * 17) % 100);
      return {
        date: dateStr,
        percent,
        pointsEarned: Math.round(percent / 12),
        pointsMax: 10,
        pointsPercent: percent,
      };
    });
  }

  const heatmapNow = new Date();
  const isHeatmapCurrentMonth =
    heatmapMonth.getFullYear() === heatmapNow.getFullYear() && heatmapMonth.getMonth() === heatmapNow.getMonth();

  const lineChartDemoData =
    linePeriod === 'all'
      ? [
          { m: 'Jan', v1: 40, v2: 28 },
          { m: 'Fev', v1: 38, v2: 30 },
          { m: 'Mar', v1: 35, v2: 32 },
          { m: 'Abr', v1: 33, v2: 31 },
        ]
      : [
          { m: 'Mar', v1: 35, v2: 32 },
          { m: 'Abr', v1: 33, v2: 31 },
        ];

  switch (componentName) {
    case 'Button':
      return (
        <div className="flex flex-wrap gap-4">
          <NexusUI.Button variant="primary">Primary</NexusUI.Button>
          <NexusUI.Button variant="secondary">Secondary</NexusUI.Button>
          <NexusUI.Button variant="danger">Danger</NexusUI.Button>
          <NexusUI.Button variant="outline">Outline</NexusUI.Button>
          <NexusUI.Button variant="ghost">Ghost</NexusUI.Button>
          <NexusUI.Button isLoading>Loading</NexusUI.Button>
        </div>
      );
    case 'Input':
      return (
        <div className="w-full max-w-sm space-y-4">
          <NexusUI.Input label="Nome" placeholder="Seu nome completo" />
          <NexusUI.Input label="Email" type="email" placeholder="nome@exemplo.com" />
          <NexusUI.Input label="Senha" type="password" placeholder="Sua senha secreta" />
          <NexusUI.Input label="Com Erro" errorMessage="Este campo é obrigatório." />
        </div>
      );
    case 'Select':
      return (
        <div className="w-full max-w-sm space-y-4">
          <NexusUI.Select
            label="Escolha um país"
            placeholder="Selecione..."
            value={selectValue}
            onChange={(val) => setSelectValue(val as string)}
            options={[
              { value: 'br', label: 'Brasil' },
              { value: 'us', label: 'Estados Unidos' },
              { value: 'pt', label: 'Portugal' },
            ]}
          />
          <NexusUI.Select
            label="Linguagens de programação"
            placeholder="Escolha várias..."
            multiple
            searchable
            value={multiSelectValue}
            onChange={(val) => setMultiSelectValue(val as string[])}
            options={[
              { value: 'js', label: 'JavaScript' },
              { value: 'ts', label: 'TypeScript' },
              { value: 'py', label: 'Python' },
              { value: 'go', label: 'Go' },
              { value: 'rs', label: 'Rust' },
            ]}
          />
        </div>
      );
    case 'Textarea':
      return (
        <div className="w-full max-w-sm space-y-4">
          <NexusUI.Textarea label="Descrição" placeholder="Digite todos os detalhes aqui..." rows={4} />
          <NexusUI.Textarea label="Anotações (com erro)" errorMessage="Limite de caracteres excedido." rows={2} />
        </div>
      );
    case 'Badge':
      return (
        <div className="flex flex-wrap gap-2">
          <NexusUI.Badge variant="success">Sucesso</NexusUI.Badge>
          <NexusUI.Badge variant="info">Informação</NexusUI.Badge>
          <NexusUI.Badge variant="warning">Aviso</NexusUI.Badge>
          <NexusUI.Badge variant="danger">Perigo</NexusUI.Badge>
          <NexusUI.Badge variant="muted">Mudo</NexusUI.Badge>
        </div>
      );
    case 'Avatar':
      return (
        <div className="flex items-center gap-4">
          <NexusUI.Avatar src="https://github.com/shadcn.png" name="CN" size="sm" />
          <NexusUI.Avatar name="MD" size="md" />
          <NexusUI.Avatar name="LG" size="lg" />
        </div>
      );
    case 'Icon':
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-[var(--color-brand-primary)]">
            <NexusUI.Icon name="Activity" size={24} />
            <NexusUI.Icon name="CircleAlert" size={24} className="text-[var(--color-danger)]" />
            <NexusUI.Icon name="CircleCheck" size={24} className="text-[var(--color-success)]" />
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            Nome inválido com fallback:{' '}
            <NexusUI.Icon name="IconeInexistente" fallbackName="Box" size={24} className="inline-block align-middle" />
          </p>
        </div>
      );
    case 'Spinner':
      return (
        <div className="flex items-center gap-4">
          <NexusUI.Spinner size="sm" />
          <NexusUI.Spinner size="md" />
          <NexusUI.Spinner size="lg" />
        </div>
      );
    case 'Switch':
      return (
        <div className="flex items-center gap-4 bg-[var(--color-surface-2)] p-4 rounded-xl">
          <NexusUI.Switch checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
          <span className="text-[var(--color-text-primary)]">Ativar Notificações</span>
        </div>
      );
    case 'Divider':
      return (
        <div className="w-full max-w-md py-4">
          <p className="text-[var(--color-text-secondary)] mb-4">Seção 1</p>
          <NexusUI.Divider label="Ou continue com" />
          <p className="text-[var(--color-text-secondary)] mt-4">Seção 2</p>
        </div>
      );
    case 'Card':
      return (
        <NexusUI.Card className="w-full max-w-sm">
          <NexusUI.Card.Header>
            <h3 className="text-xl font-bold">Título do Card</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Descrição auxiliar do card.</p>
          </NexusUI.Card.Header>
          <NexusUI.Card.Body>
            <p className="text-[var(--color-text-primary)]">Este é o corpo do card. Aqui vai o conteúdo principal.</p>
          </NexusUI.Card.Body>
          <NexusUI.Card.Footer className="justify-end gap-2">
            <NexusUI.Button variant="ghost">Cancelar</NexusUI.Button>
            <NexusUI.Button variant="primary">Confirmar</NexusUI.Button>
          </NexusUI.Card.Footer>
        </NexusUI.Card>
      );
    case 'PageHeader':
      return (
        <NexusUI.PageHeader 
          title="Gestão de Usuários" 
          subtitle="Gerencie os usuários e permissões do sistema."
          actions={<NexusUI.Button variant="primary">Novo Usuário</NexusUI.Button>}
        />
      );
    case 'EmptyState':
      return (
        <NexusUI.EmptyState 
          icon={<Settings size={48} />}
          title="Nenhuma mensagem"
          description="Você não tem novas mensagens no momento."
          action={<NexusUI.Button variant="outline">Atualizar</NexusUI.Button>}
        />
      );
    case 'Skeleton':
      return (
        <div className="flex items-center gap-4 w-full max-w-sm">
          <NexusUI.Skeleton width={"48"} height={"48"} className="rounded-full" />
          <div className="space-y-2 flex-1">
            <NexusUI.Skeleton className="w-[80%] h-4" />
            <NexusUI.Skeleton className="w-[50%] h-3" />
          </div>
        </div>
      );
    case 'StatCard':
      return (
        <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
          <NexusUI.StatCard label="Receita" value="R$ 12.450" sub="mês atual" valueTone="positive" />
          <NexusUI.StatCard label="Churn" value="2,1%" valueTone="negative" />
          <NexusUI.StatCard label="Meta" value="87%" valueTone="muted" />
          <NexusUI.StatCard
            label="A carregar"
            value="—"
            valueTone="default"
            isLoading
            valueSize="md"
            icon={<NexusUI.Icon name="Wallet" className="size-4" />}
          />
        </div>
      );
    case 'RangeProgressBar':
      return (
        <div className="w-full max-w-md">
          <NexusUI.RangeProgressBar
            percent={62.5}
            startLabel="Início"
            endLabel="Objetivo"
            currentLabel="Agora"
            formatFooter={(p) => `${p.toFixed(1)}% concluído`}
          />
        </div>
      );
    case 'DeltaBadge':
      return (
        <div className="flex flex-wrap gap-2 items-center">
          <NexusUI.DeltaBadge delta={-1.2} unit="kg" suffix="vs. anterior" invertSemantics />
          <NexusUI.DeltaBadge delta={0.5} unit="kg" invertSemantics />
          <NexusUI.DeltaBadge delta={2} unit="%" />
          <NexusUI.DeltaBadge delta={null} />
        </div>
      );
    case 'StepperField':
      return (
        <div className="w-full max-w-xs">
          <NexusUI.StepperField
            value={stepperValue}
            onChange={setStepperValue}
            label="Valor"
            suffix="kg"
            decrementAriaLabel="Diminuir"
            incrementAriaLabel="Aumentar"
          />
        </div>
      );
    case 'LineChartPanel':
      return (
        <div className="w-full max-w-2xl">
          <NexusUI.LineChartPanel
            data={lineChartDemoData}
            xDataKey="m"
            series={[
              {
                dataKey: 'v1',
                name: 'Principal',
                color: 'var(--color-brand-primary)',
                dot: { r: 3, fill: 'var(--color-brand-primary)' },
              },
              {
                dataKey: 'v2',
                name: 'Comparativo',
                color: 'var(--color-brand-secondary, #a855f7)',
                dot: false,
                connectNulls: true,
              },
            ]}
            referenceLines={[{ y: 36, stroke: 'var(--color-success)', strokeDasharray: '4 4' }]}
            height={260}
            periods={[
              { id: 'all', label: 'Tudo' },
              { id: 'recent', label: 'Recente' },
            ]}
            selectedPeriodId={linePeriod}
            onPeriodChange={setLinePeriod}
          />
        </div>
      );
    case 'Alert':
      return (
        <div className="w-full max-w-md space-y-4">
          <NexusUI.Alert variant="info" title="Informação">Esta é uma mensagem informativa importante.</NexusUI.Alert>
          <NexusUI.Alert variant="success" title="Sucesso!">A operação foi concluída perfeitamente.</NexusUI.Alert>
          <NexusUI.Alert variant="warning" title="Cuidado">Temos algo que você deve observar antes de continuar.</NexusUI.Alert>
          <NexusUI.Alert variant="danger" title="Erro fatal">Aconteceu algo inesperado, por favor tente novamente mais tarde.</NexusUI.Alert>
        </div>
      );
    case 'Toast':
      return (
        <div className="w-full py-6 flex items-center justify-center">
          <NexusUI.Button variant="primary" onClick={() => toast.success('Ação salva', 'Seus dados foram salvos com sucesso na nuvem.')}>
            Disparar Toast
          </NexusUI.Button>
        </div>
      );
    case 'Modal':
      return (
        <div className="w-full flex items-center justify-center py-6">
          <NexusUI.Button variant="primary" onClick={() => setIsModalOpen(true)}>Abrir Modal</NexusUI.Button>
          <NexusUI.Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Termos de Uso">
            <div className="space-y-4 py-4">
              <p className="text-[var(--color-text-secondary)]">Ao continuar, você concorda com nossos termos de uso empresariais do ecossistema Nexus.</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <NexusUI.Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</NexusUI.Button>
              <NexusUI.Button variant="primary" onClick={() => setIsModalOpen(false)}>Eu Aceito</NexusUI.Button>
            </div>
          </NexusUI.Modal>
        </div>
      );
    case 'Tooltip':
      return (
        <div className="w-full py-10 flex items-center justify-center">
          <NexusUI.Tooltip content="Informação extra super legal ao passar o mouse!">
            <span className="underline decoration-dashed text-[var(--color-text-primary)] cursor-pointer">Passe o mouse aqui</span>
          </NexusUI.Tooltip>
        </div>
      );
    case 'Sidebar':
    case 'NavItem':
      return (
        <div className="h-[400px] w-[250px] border border-[var(--color-border)] rounded-tr-2xl rounded-br-2xl overflow-hidden relative isolate">
          <NexusUI.Sidebar 
            links={[
              { icon: <Home size={16} />, label: 'Dashboard', href: '#', isActive: true },
              { icon: <Search size={16} />, label: 'Clientes', href: '#' },
              { icon: <Settings size={16} />, label: 'Ajustes', href: '#' }
            ]}
          />
        </div>
      );
    case 'BottomNav':
      return (
        <div className="w-full max-w-sm h-40 relative rounded-xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface-1)]">
          <div className="p-4 flex items-center justify-center opacity-50 text-[var(--color-text-secondary)]">Conteúdo da Tela</div>
          <div className="absolute bottom-0 w-full left-0">
             <NexusUI.BottomNav items={[
               { icon: <Home size={24} />, label: 'Início', href: '#', isActive: true },
               { icon: <Search size={24} />, label: 'Buscar', href: '#' },
               { icon: <Bell size={24} />, label: 'Notificações', href: '#' }
             ]} />
          </div>
        </div>
      );
    case 'Tabs':
      return (
        <div className="w-full max-w-md">
          <NexusUI.Tabs defaultValue="perfil" className="w-full">
            <NexusUI.Tabs.List className="w-full grid grid-cols-3">
              <NexusUI.Tabs.Trigger value="perfil">Perfil</NexusUI.Tabs.Trigger>
              <NexusUI.Tabs.Trigger value="senha">Segurança</NexusUI.Tabs.Trigger>
              <NexusUI.Tabs.Trigger value="sistema">Sistema</NexusUI.Tabs.Trigger>
            </NexusUI.Tabs.List>
            <NexusUI.Tabs.Content value="perfil" className="p-4 bg-[var(--color-surface-2)] rounded-lg text-sm text-[var(--color-text-secondary)]">
              <p>Gerencie os detalhes do seu perfil público, foto e preferências de exibição do usuário.</p>
            </NexusUI.Tabs.Content>
            <NexusUI.Tabs.Content value="senha" className="p-4 bg-[var(--color-surface-2)] rounded-lg text-sm text-[var(--color-text-secondary)]">
              <p>Mude sua senha, configure autenticação de dois fatores e verifique dispositivos ativos.</p>
            </NexusUI.Tabs.Content>
            <NexusUI.Tabs.Content value="sistema" className="p-4 bg-[var(--color-surface-2)] rounded-lg text-sm text-[var(--color-text-secondary)]">
              <p>Configurações gerais do sistema, como fuso horário, moedas e integrações padrão.</p>
            </NexusUI.Tabs.Content>
          </NexusUI.Tabs>
        </div>
      );
    case 'ModuleCard':
      return (
        <div className="w-full max-w-sm">
          <NexusUI.ModuleCard 
            label="Nexus CRM" 
            description="Módulo de gestão do relacionamento estendido com rastreamento."
            icon={<Settings size={24} />}
            href="#"
            status="beta"
          />
        </div>
      );
    case 'ModuleCardSkeleton':
      return (
        <div className="w-full max-w-3xl space-y-6">
          <NexusUI.ModuleCardSkeleton className="max-w-sm" />
          <NexusUI.ModuleGridSkeleton count={3} />
        </div>
      );
    case 'ToggleMatrix':
      return (
        <div className="w-full max-w-3xl">
          <NexusUI.ToggleMatrix
            cornerHeader="Recurso"
            rows={[
              { id: 'u1', header: <span className="font-medium text-[var(--color-text-primary)]">Ana</span> },
              { id: 'u2', header: <span className="font-medium text-[var(--color-text-primary)]">Bruno</span> },
            ]}
            columns={[
              {
                id: 'm1',
                header: (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-[var(--color-text-primary)]">CRM</span>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)]">crm</span>
                  </div>
                ),
              },
              {
                id: 'm2',
                header: (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-[var(--color-text-primary)]">Health</span>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)]">health</span>
                  </div>
                ),
              },
            ]}
            isChecked={(rowId, colId) => matrixAllowed.has(matrixKey(rowId, colId))}
            onCheckedChange={(rowId, colId, checked) => {
              const k = matrixKey(rowId, colId);
              setMatrixAllowed((prev) => {
                const n = new Set(prev);
                if (checked) n.add(k);
                else n.delete(k);
                return n;
              });
            }}
            footer={<p className="p-3 text-xs text-[var(--color-text-muted)]">Exemplo de matriz de permissões.</p>}
          />
        </div>
      );
    case 'DataTable':
      return (
        <div className="w-full overflow-hidden border border-[var(--color-border)] rounded-xl">
           <NexusUI.DataTable 
              columns={[
                { key: 'id', header: 'ID' },
                { key: 'name', header: 'Nome' },
                { key: 'role', header: 'Cargo' }
              ]}
              data={[
                { id: '1', name: 'João Silva', role: 'Gerente' },
                { id: '2', name: 'Maria Souza', role: 'Diretora' },
                { id: '3', name: 'Carlos Alves', role: 'Vendedor' }
              ]}
           />
        </div>
      );
    case 'DatePicker':
      return (
        <div className="w-full max-w-sm space-y-4">
          <NexusUI.DatePicker
            label="Data de nascimento"
            placeholder="DD/MM/AAAA"
            value={dateValue}
            onChange={setDateValue}
          />
          <NexusUI.DatePicker
            label="Com erro"
            error="Data inválida."
            value={undefined}
            onChange={() => {}}
          />
          <NexusUI.DatePicker
            label="Desabilitado"
            disabled
            value={new Date()}
            onChange={() => {}}
          />
          <NexusUI.DatePicker
            label="Travado em abril/2026"
            lockToMonthYear={{ year: 2026, month: 3 }}
            value={dateLockedToMonth}
            onChange={setDateLockedToMonth}
            helperText="Sem mudar de mês; só escolhe o dia."
          />
          {dateValue && (
            <p className="text-xs text-[var(--color-text-muted)]">
              Selecionado: {dateValue.toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      );
    case 'TimePicker':
      return (
        <div className="w-full max-w-sm space-y-4">
          <NexusUI.TimePicker
            label="Horário de início"
            value={timeValue}
            onChange={setTimeValue}
          />
          <NexusUI.TimePicker
            label="Intervalo de 15 min"
            minuteStep={15}
            value={timeValue}
            onChange={setTimeValue}
            helperText="Minutos em intervalos de 15"
          />
          {timeValue && (
            <p className="text-xs text-[var(--color-text-muted)]">
              Selecionado: {timeValue}
            </p>
          )}
        </div>
      );
    case 'DateTimePicker':
      return (
        <div className="w-full max-w-sm space-y-4">
          <NexusUI.DateTimePicker
            label="Data e hora do evento"
            value={dateTimeValue}
            onChange={setDateTimeValue}
          />
          <NexusUI.DateTimePicker
            label="Com intervalo de 30 min"
            minuteStep={30}
            value={dateTimeValue}
            onChange={setDateTimeValue}
            helperText="Minutos em intervalos de 30"
          />
          <NexusUI.DateTimePicker
            label="Data travada em abril/2026"
            lockToMonthYear={{ year: 2026, month: 3 }}
            value={dateTimeLockedToMonth}
            onChange={setDateTimeLockedToMonth}
            helperText="Calendário fixo neste mês; hora editável."
          />
          {dateTimeValue && (
            <p className="text-xs text-[var(--color-text-muted)]">
              Selecionado: {dateTimeValue.toLocaleString('pt-BR')}
            </p>
          )}
        </div>
      );
    case 'DateRangePicker':
      return (
        <div className="w-full max-w-sm space-y-4">
          <NexusUI.DateRangePicker
            label="Período da viagem"
            value={dateRangeValue}
            onChange={setDateRangeValue}
          />
          <NexusUI.DateRangePicker
            label="Intervalo só em abril/2026"
            lockToMonthYear={{ year: 2026, month: 3 }}
            value={dateRangeLockedToMonth}
            onChange={setDateRangeLockedToMonth}
            helperText="Um calendário; início e fim no mesmo mês."
          />
          {(dateRangeValue.start ?? dateRangeValue.end) && (
            <p className="text-xs text-[var(--color-text-muted)]">
              De: {dateRangeValue.start?.toLocaleDateString('pt-BR') ?? '—'}&nbsp;
              Até: {dateRangeValue.end?.toLocaleDateString('pt-BR') ?? '—'}
            </p>
          )}
        </div>
      );
    case 'DateTimeRangePicker':
      return (
        <div className="w-full max-w-sm space-y-4">
          <NexusUI.DateTimeRangePicker
            label="Período do evento"
            value={dateTimeRangeValue}
            onChange={setDateTimeRangeValue}
            minuteStep={15}
          />
          <NexusUI.DateTimeRangePicker
            label="Datas só em abril/2026"
            lockToMonthYear={{ year: 2026, month: 3 }}
            value={dateTimeRangeLockedToMonth}
            onChange={setDateTimeRangeLockedToMonth}
            minuteStep={15}
            helperText="Um calendário para o intervalo de datas."
          />
          {(dateTimeRangeValue.start ?? dateTimeRangeValue.end) && (
            <p className="text-xs text-[var(--color-text-muted)]">
              De: {dateTimeRangeValue.start?.toLocaleString('pt-BR') ?? '—'}&nbsp;
              Até: {dateTimeRangeValue.end?.toLocaleString('pt-BR') ?? '—'}
            </p>
          )}
        </div>
      );
    case 'TimeRangePicker':
      return (
        <div className="w-full max-w-sm space-y-4">
          <NexusUI.TimeRangePicker
            label="Horário do expediente"
            value={timeRangeValue}
            onChange={setTimeRangeValue}
          />
          <NexusUI.TimeRangePicker
            label="Intervalo de 30 min"
            minuteStep={30}
            value={timeRangeValue}
            onChange={setTimeRangeValue}
            helperText="Minutos em intervalos de 30"
          />
          {(timeRangeValue.start ?? timeRangeValue.end) && (
            <p className="text-xs text-[var(--color-text-muted)]">
              De: {timeRangeValue.start ?? '—'}&nbsp; Até: {timeRangeValue.end ?? '—'}
            </p>
          )}
        </div>
      );
    case 'CircularProgress':
      return (
        <div className="flex gap-6 items-center">
          <NexusUI.CircularProgress value={7} max={10} size={64} />
          <NexusUI.CircularProgress value={40} max={100} />
        </div>
      );
    case 'StreakBadge':
      return (
        <div className="flex flex-wrap gap-4 items-center">
          <NexusUI.StreakBadge count={5} />
          <NexusUI.StreakBadge count={0} hideWhenZero={false} suffix="days" />
        </div>
      );
    case 'CompletionToggle':
      return (
        <div className="max-w-sm w-full">
          <NexusUI.CompletionToggle
            checked={completionDone}
            onCheckedChange={setCompletionDone}
            labelOn="Concluído!"
            labelOff="Marcar como feito"
          />
        </div>
      );
    case 'Checklist':
      return (
        <div className="max-w-md w-full">
          <NexusUI.Checklist
            items={[
              { label: 'Item com bónus', points: 1 },
              { label: 'Item com penalização', points: -1 },
              { label: 'Sem pontos' },
            ]}
            checked={checklistState}
            onToggle={(i, v) => {
              setChecklistState((prev) => {
                const n = [...prev];
                n[i] = v;
                return n;
              });
            }}
          />
        </div>
      );
    case 'IntegerSlider':
      return (
        <div className="max-w-sm w-full">
          <NexusUI.IntegerSlider value={intSliderVal} max={10} unit="km" onChange={setIntSliderVal} />
        </div>
      );
    case 'HoldStepper':
      return (
        <div className="max-w-xs w-full">
          <NexusUI.HoldStepper value={holdStepperVal} max={8} unit="un" onChange={setHoldStepperVal} />
        </div>
      );
    case 'CalendarHeatmap':
      return (
        <div className="w-full max-w-md">
          <NexusUI.CalendarHeatmap
            data={demoHeatmapData(heatmapMonth)}
            month={heatmapMonth}
            onPrevMonth={() => setHeatmapMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
            onNextMonth={() => setHeatmapMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
            isCurrentMonth={isHeatmapCurrentMonth}
          />
        </div>
      );
    case 'MonthStepper': {
      const labels = ['Janeiro 2024', 'Fevereiro 2024', 'Março 2024', 'Abril 2024'];
      return (
        <NexusUI.MonthStepper
          label={labels[monthStepIdx]}
          onPrev={() => setMonthStepIdx((i) => Math.max(0, i - 1))}
          onNext={() => setMonthStepIdx((i) => Math.min(labels.length - 1, i + 1))}
          disableNext={monthStepIdx >= labels.length - 1}
        />
      );
    }
    case 'MonthPicker':
      return (
        <div className="w-full max-w-sm space-y-4">
          <NexusUI.MonthPicker
            label="Mês de referência"
            value={monthPickerValue}
            onChange={setMonthPickerValue}
            helperText="Valor: índice 0–11 (como Date#getMonth)."
          />
          <NexusUI.MonthPicker label="Com erro" error="Escolha um mês." value={undefined} onChange={() => {}} />
          {monthPickerValue !== undefined && (
            <p className="text-xs text-[var(--color-text-muted)]">Índice selecionado: {monthPickerValue}</p>
          )}
        </div>
      );
    case 'MonthYearPicker':
      return (
        <div className="w-full max-w-sm space-y-4">
          <NexusUI.MonthYearPicker
            label="Competência"
            value={monthYearPickerValue}
            onChange={setMonthYearPickerValue}
            min={{ year: 2024, month: 0 }}
            max={{ year: 2027, month: 11 }}
            helperText="Limitado entre jan/2024 e dez/2027."
          />
          <NexusUI.MonthYearPicker label="Sem valor inicial" value={undefined} onChange={() => {}} />
          {monthYearPickerValue && (
            <p className="text-xs text-[var(--color-text-muted)]">
              {monthYearPickerValue.year}-{String(monthYearPickerValue.month + 1).padStart(2, '0')}
            </p>
          )}
        </div>
      );
    case 'InlineAmountCell':
      return (
        <div className="w-36">
          <NexusUI.InlineAmountCell
            value={inlineAmountDemo}
            onSave={(v) => setInlineAmountDemo(v)}
            formatDisplay={(n) =>
              new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)
            }
            parseInput={(raw) => {
              const cleaned = raw.replace(/[^\d,.-]/g, '').replace(',', '.');
              const x = parseFloat(cleaned);
              return Number.isNaN(x) ? 0 : x;
            }}
            highlightVariant="success"
            highlightActive={inlineAmountDemo > 2000}
          />
        </div>
      );
    case 'ToggleStatusBadge':
      return (
        <div className="flex flex-wrap gap-3 items-center">
          <NexusUI.ToggleStatusBadge
            checked={toggleBadgePaid}
            onToggle={() => setToggleBadgePaid((p) => !p)}
          />
          <NexusUI.ToggleStatusBadge
            checked={false}
            checkedLabel="OK"
            uncheckedLabel="Falta"
            showIconWhenChecked={false}
            onToggle={() => {
              toast.info('Demo', 'Estado visual fixo; o clique mostra toast.');
            }}
          />
        </div>
      );
    case 'CompactStatusCheckbox':
      return (
        <label className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] cursor-pointer">
          <NexusUI.CompactStatusCheckbox
            checked={compactStatusChecked}
            onCheckedChange={() => setCompactStatusChecked((c) => !c)}
          />
          Checkbox compacto
        </label>
      );
    case 'Checkbox':
      return (
        <div className="flex flex-col gap-4">
           <label className="flex items-center gap-2 text-sm text-[var(--color-text-primary)] cursor-pointer">
              <NexusUI.Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
              Aceito os termos e condições
           </label>
           <label className="flex items-center gap-2 text-sm text-[var(--color-text-primary)] cursor-pointer">
              <NexusUI.Checkbox checked disabled />
              Desabilitado Marcado
           </label>
        </div>
      );
    case 'Radio':
      return (
        <div className="flex flex-col gap-4">
           <label className="flex items-center gap-2 text-sm text-[var(--color-text-primary)] cursor-pointer">
              <NexusUI.Radio name="demoRadio" checked={selectValue === 'opt1'} onValueChange={() => setSelectValue('opt1')} />
              Opção 1
           </label>
           <label className="flex items-center gap-2 text-sm text-[var(--color-text-primary)] cursor-pointer">
              <NexusUI.Radio name="demoRadio" checked={selectValue === 'opt2'} onValueChange={() => setSelectValue('opt2')} />
              Opção 2
           </label>
           <label className="flex items-center gap-2 text-sm text-[var(--color-text-primary)] cursor-pointer">
              <NexusUI.Radio disabled />
              Desabilitado
           </label>
        </div>
      );
    case 'Accordion':
      return (
        <div className="w-full max-w-md space-y-6">
          {/* Exemplo 1: Padrão com Trigger padrão */}
          <div className="space-y-2">
            <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">Padrão (Trigger com Chevron)</p>
            <NexusUI.Accordion type="single" defaultValue="item-1">
              <NexusUI.Accordion.Item value="item-1">
                <NexusUI.Accordion.Trigger>O que é o Millennium Nexus?</NexusUI.Accordion.Trigger>
                <NexusUI.Accordion.Content>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    O Millennium Nexus é um ecossistema de produtividade pessoal que integra gestão de aprendizado, 
                    finanças, saúde e muito mais em uma única plataforma coesa.
                  </p>
                </NexusUI.Accordion.Content>
              </NexusUI.Accordion.Item>
              <NexusUI.Accordion.Item value="item-2">
                <NexusUI.Accordion.Trigger>Como funciona o sistema de módulos?</NexusUI.Accordion.Trigger>
                <NexusUI.Accordion.Content>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Cada módulo representa uma área da sua vida (Aprendizado, Finanças, Saúde). 
                    Dentro de cada módulo você pode criar planos, acompanhar métricas e organizar seu progresso.
                  </p>
                </NexusUI.Accordion.Content>
              </NexusUI.Accordion.Item>
            </NexusUI.Accordion>
          </div>

          {/* Exemplo 2: Trigger customizado com slot (children custom) */}
          <div className="space-y-2">
            <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">Trigger com Slot Customizado</p>
            <NexusUI.Accordion type="single">
              <NexusUI.Accordion.Item value="custom-1">
                <NexusUI.Accordion.Trigger>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center">
                      <Settings size={16} className="text-brand-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-text-primary">Configurações Avançadas</p>
                      <p className="text-xs text-text-muted">Gerencie preferências do sistema</p>
                    </div>
                    <NexusUI.Badge variant="info">Novo</NexusUI.Badge>
                  </div>
                </NexusUI.Accordion.Trigger>
                <NexusUI.Accordion.Content>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Notificações</span>
                      <NexusUI.Switch checked={true} onChange={() => {}} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Tema Escuro</span>
                      <NexusUI.Switch checked={true} onChange={() => {}} />
                    </div>
                  </div>
                </NexusUI.Accordion.Content>
              </NexusUI.Accordion.Item>
              <NexusUI.Accordion.Item value="custom-2">
                <NexusUI.Accordion.Trigger>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                      <User size={16} className="text-success" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-text-primary">Perfil do Usuário</p>
                      <p className="text-xs text-text-muted">Atualize suas informações</p>
                    </div>
                  </div>
                </NexusUI.Accordion.Trigger>
                <NexusUI.Accordion.Content>
                  <div className="space-y-2">
                    <NexusUI.Input placeholder="Nome completo" />
                    <NexusUI.Input placeholder="Email" type="email" />
                    <NexusUI.Button size="sm" variant="primary" className="w-full">Salvar</NexusUI.Button>
                  </div>
                </NexusUI.Accordion.Content>
              </NexusUI.Accordion.Item>
            </NexusUI.Accordion>
          </div>

          {/* Exemplo 3: CustomTrigger com controle total via render prop */}
          <div className="space-y-2">
            <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">CustomTrigger (Controle Total)</p>
            <NexusUI.Accordion type="single" defaultValue="ctrl-1">
              <NexusUI.Accordion.Item value="ctrl-1">
                <NexusUI.Accordion.CustomTrigger>
                  {({ isExpanded, toggle }) => (
                    <div className={[
                      'flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200',
                      isExpanded 
                        ? 'bg-brand-primary/10 border-brand-primary/30' 
                        : 'bg-surface-3 border-border hover:border-brand-primary/50'
                    ].join(' ')}>
                      <div className="flex items-center gap-3">
                        <div className={[
                          'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                          isExpanded ? 'bg-brand-primary text-white' : 'bg-surface-2 text-text-muted'
                        ].join(' ')}>
                          <Bell size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary">Notificações</p>
                          <p className="text-xs text-text-muted">{isExpanded ? 'Clique para recolher' : 'Clique para expandir'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <NexusUI.Badge variant={isExpanded ? 'success' : 'muted'}>
                          {isExpanded ? 'Aberto' : 'Fechado'}
                        </NexusUI.Badge>
                        <ChevronDown 
                          size={20} 
                          className={['transition-transform duration-300', isExpanded ? 'rotate-180' : ''].join(' ')} 
                        />
                      </div>
                    </div>
                  )}
                </NexusUI.Accordion.CustomTrigger>
                <NexusUI.Accordion.Content>
                  <div className="space-y-3">
                    <p className="text-sm text-text-secondary">Configure como deseja receber alertas:</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                        <NexusUI.Checkbox checked={true} onCheckedChange={() => {}} />
                        Email
                      </label>
                      <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                        <NexusUI.Checkbox checked={false} onCheckedChange={() => {}} />
                        Push
                      </label>
                      <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
                        <NexusUI.Checkbox checked={true} onCheckedChange={() => {}} />
                        SMS
                      </label>
                    </div>
                  </div>
                </NexusUI.Accordion.Content>
              </NexusUI.Accordion.Item>

              <NexusUI.Accordion.Item value="ctrl-2">
                <NexusUI.Accordion.CustomTrigger>
                  {({ isExpanded }) => (
                    <div className={[
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                      isExpanded ? 'bg-surface-3' : 'bg-surface-2 hover:bg-surface-3'
                    ].join(' ')}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Shield size={18} className={isExpanded ? 'text-brand-primary' : 'text-text-muted'} />
                          <span className="font-semibold text-text-primary">Segurança</span>
                        </div>
                        <div className="mt-2 h-1 bg-surface-1 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-brand-primary transition-all duration-500"
                            style={{ width: isExpanded ? '100%' : '60%' }}
                          />
                        </div>
                      </div>
                      <ChevronDown 
                        size={18} 
                        className={['text-text-muted transition-transform duration-300', isExpanded ? 'rotate-180' : ''].join(' ')} 
                      />
                    </div>
                  )}
                </NexusUI.Accordion.CustomTrigger>
                <NexusUI.Accordion.Content>
                  <div className="space-y-2">
                    <NexusUI.Input type="password" placeholder="Senha atual" />
                    <NexusUI.Input type="password" placeholder="Nova senha" />
                    <div className="flex gap-2">
                      <NexusUI.Button variant="outline" size="sm" className="flex-1">Cancelar</NexusUI.Button>
                      <NexusUI.Button variant="primary" size="sm" className="flex-1">Atualizar</NexusUI.Button>
                    </div>
                  </div>
                </NexusUI.Accordion.Content>
              </NexusUI.Accordion.Item>
            </NexusUI.Accordion>
          </div>

          {/* Exemplo 4: Input no header (stopPropagation) */}
          <div className="space-y-2">
            <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">Input no Header (Sem Trigger)</p>
            <NexusUI.Accordion type="single">
              <NexusUI.Accordion.Item value="input-header">
                <NexusUI.Accordion.Trigger>
                  <div className="flex items-center gap-3 w-full pr-4">
                    <div className="w-8 h-8 rounded-full bg-info/20 flex items-center justify-center shrink-0">
                      <Search size={16} className="text-info" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text-primary text-left">Busca Rápida</p>
                    </div>
                    {/* Input que NÃO dispara o accordion */}
                    <div 
                      className="w-48 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <NexusUI.Input 
                        placeholder="Digite para buscar..."
                        className="h-8 text-sm"
                        onClick={(e) => e.stopPropagation()}
                        onFocus={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                </NexusUI.Accordion.Trigger>
                <NexusUI.Accordion.Content>
                  <div className="space-y-2">
                    <p className="text-sm text-text-secondary">Resultados da busca:</p>
                    <div className="space-y-1">
                      <div className="p-2 rounded bg-surface-1 text-sm text-text-primary hover:bg-surface-2 cursor-pointer transition-colors">
                        📄 Documentação do API
                      </div>
                      <div className="p-2 rounded bg-surface-1 text-sm text-text-primary hover:bg-surface-2 cursor-pointer transition-colors">
                        🎨 Design Tokens
                      </div>
                      <div className="p-2 rounded bg-surface-1 text-sm text-text-primary hover:bg-surface-2 cursor-pointer transition-colors">
                        ⚙️ Configurações
                      </div>
                    </div>
                  </div>
                </NexusUI.Accordion.Content>
              </NexusUI.Accordion.Item>

              <NexusUI.Accordion.Item value="editable-title">
                <NexusUI.Accordion.Trigger>
                  <div className="flex items-center gap-3 w-full pr-4">
                    <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
                      <Settings size={16} className="text-warning" />
                    </div>
                    <div className="flex-1 min-w-0 flex items-center gap-2">
                      <span className="font-semibold text-text-primary">Título Editável:</span>
                      {/* Input inline que NÃO dispara o accordion */}
                      <div 
                        className="flex-1 max-w-[200px]"
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        <NexusUI.Input 
                          placeholder="Nome da seção..."
                          defaultValue="Minha Configuração"
                          className="h-7 text-sm font-normal"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  </div>
                </NexusUI.Accordion.Trigger>
                <NexusUI.Accordion.Content>
                  <div className="space-y-3">
                    <p className="text-sm text-text-secondary">
                      O título acima pode ser editado sem abrir/fechar o accordion. 
                      Clique no campo de texto e digite à vontade!
                    </p>
                    <div className="flex items-center justify-between p-2 rounded bg-surface-1">
                      <span className="text-sm text-text-secondary">Habilitar salvamento automático</span>
                      <NexusUI.Switch checked={true} onChange={() => {}} />
                    </div>
                  </div>
                </NexusUI.Accordion.Content>
              </NexusUI.Accordion.Item>
            </NexusUI.Accordion>
            <p className="text-xs text-text-muted">
              💡 Dica: Use <code className="bg-surface-3 px-1 rounded">onClick=&lbrace;(e) =&gt; e.stopPropagation()&rbrace;</code> no container do input
            </p>
          </div>

          {/* Exemplo 5: Icon Button com Toast (stopPropagation) */}
          <div className="space-y-2">
            <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide">Icon Button + Toast (Sem Trigger)</p>
            <NexusUI.Accordion type="single">
              <NexusUI.Accordion.Item value="toast-actions">
                <NexusUI.Accordion.Trigger>
                  <div className="flex items-center gap-3 w-full pr-4">
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                      <Bell size={16} className="text-success" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-semibold text-text-primary">Notificações e Ações</p>
                      <p className="text-xs text-text-muted">Ícones interativos no header</p>
                    </div>
                    {/* Botões de ação que NÃO disparam o accordion */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success('Adicionado!', 'Nova notificação criada com sucesso.');
                        }}
                        className="w-8 h-8 rounded-full bg-surface-3 hover:bg-brand-primary/20 flex items-center justify-center transition-colors"
                        title="Adicionar notificação"
                      >
                        <Plus size={16} className="text-brand-primary" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.info('Marcar lida', 'Todas as notificações foram marcadas como lidas.');
                        }}
                        className="w-8 h-8 rounded-full bg-surface-3 hover:bg-info/20 flex items-center justify-center transition-colors"
                        title="Marcar todas como lidas"
                      >
                        <CheckCheck size={16} className="text-info" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.error('Configurações', 'Abrir configurações de notificação.');
                        }}
                        className="w-8 h-8 rounded-full bg-surface-3 hover:bg-warning/20 flex items-center justify-center transition-colors"
                        title="Configurações"
                      >
                        <Settings size={16} className="text-warning" />
                      </button>
                    </div>
                  </div>
                </NexusUI.Accordion.Trigger>
                <NexusUI.Accordion.Content>
                  <div className="space-y-3">
                    <p className="text-sm text-text-secondary">Lista de notificações:</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 rounded bg-surface-1">
                        <div className="w-2 h-2 rounded-full bg-brand-primary" />
                        <span className="text-sm text-text-primary flex-1">Nova tarefa atribuída</span>
                        <span className="text-xs text-text-muted">2 min</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded bg-surface-1">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-sm text-text-primary flex-1">Plano de estudo concluído</span>
                        <span className="text-xs text-text-muted">1h</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded bg-surface-1 opacity-60">
                        <div className="w-2 h-2 rounded-full bg-text-muted" />
                        <span className="text-sm text-text-secondary flex-1 line-through">Lembrete de reunião</span>
                        <span className="text-xs text-text-muted">3h</span>
                      </div>
                    </div>
                  </div>
                </NexusUI.Accordion.Content>
              </NexusUI.Accordion.Item>

              <NexusUI.Accordion.Item value="task-actions">
                <NexusUI.Accordion.Trigger>
                  <div className="flex items-center gap-3 w-full pr-4">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
                      <NexusUI.Checkbox checked={true} onCheckedChange={() => {}} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-semibold text-text-primary">Tarefa com Ações</p>
                      <p className="text-xs text-text-muted">Botões de ação rápida</p>
                    </div>
                    {/* Ações que não disparam */}
                    <div 
                      className="flex items-center gap-1 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <NexusUI.Button 
                        size="sm" 
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success('Editar', 'Modo edição ativado');
                        }}
                      >
                        <Edit size={14} className="mr-1" /> Editar
                      </NexusUI.Button>
                      <NexusUI.Button 
                        size="sm" 
                        variant="ghost"
                        className="text-danger hover:text-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.error('Excluído', 'Tarefa removida');
                        }}
                      >
                        <Trash2 size={14} className="mr-1" /> Excluir
                      </NexusUI.Button>
                    </div>
                  </div>
                </NexusUI.Accordion.Trigger>
                <NexusUI.Accordion.Content>
                  <div className="space-y-2">
                    <p className="text-sm text-text-secondary">Detalhes da tarefa:</p>
                    <NexusUI.Textarea 
                      defaultValue="Revisar documentação do projeto antes da reunião de amanhã."
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <NexusUI.Button size="sm" variant="primary">Salvar</NexusUI.Button>
                      <NexusUI.Button size="sm" variant="outline">Cancelar</NexusUI.Button>
                    </div>
                  </div>
                </NexusUI.Accordion.Content>
              </NexusUI.Accordion.Item>
            </NexusUI.Accordion>
            <p className="text-xs text-text-muted">
              🖱️ Clique nos ícones para ver toasts • Clique na área vazia para expandir/colapsar
            </p>
          </div>

          {/* Exemplo 6: Modo múltiplo */}
          <div className="pt-4 border-t border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wide mb-3">Modo Múltiplo</p>
            <NexusUI.Accordion type="multiple" defaultValue={['sec-1']}>
              <NexusUI.Accordion.Item value="sec-1">
                <NexusUI.Accordion.Trigger>Seção 1</NexusUI.Accordion.Trigger>
                <NexusUI.Accordion.Content>
                  <p className="text-sm text-[var(--color-text-secondary)]">Conteúdo da primeira seção.</p>
                </NexusUI.Accordion.Content>
              </NexusUI.Accordion.Item>
              <NexusUI.Accordion.Item value="sec-2">
                <NexusUI.Accordion.Trigger>Seção 2</NexusUI.Accordion.Trigger>
                <NexusUI.Accordion.Content>
                  <p className="text-sm text-[var(--color-text-secondary)]">Conteúdo da segunda seção.</p>
                </NexusUI.Accordion.Content>
              </NexusUI.Accordion.Item>
            </NexusUI.Accordion>
          </div>
        </div>
      );
    default:
      return (
        <div className="text-[var(--color-text-secondary)] flex items-center gap-2">
          <NexusUI.Icon name="Hammer" />
          <span>Exemplo interativo do componente <strong>{componentName}</strong> ainda não implementado.</span>
        </div>
      );
  }
}
