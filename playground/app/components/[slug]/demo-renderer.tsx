'use client';

import React, { useState } from 'react';
import * as NexusUI from '@nexus/ui';
import { Search, Bell, Home, Settings } from 'lucide-react';

export function DemoRenderer({ componentName }: { componentName: string }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<string>('');
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [dateValue, setDateValue] = useState<Date | undefined>();
  const [timeValue, setTimeValue] = useState<string | undefined>();
  const [dateTimeValue, setDateTimeValue] = useState<Date | undefined>();
  const [dateRangeValue, setDateRangeValue] = useState<NexusUI.DateRange>({ start: undefined, end: undefined });
  const [dateTimeRangeValue, setDateTimeRangeValue] = useState<NexusUI.DateRange>({ start: undefined, end: undefined });
  const [timeRangeValue, setTimeRangeValue] = useState<NexusUI.TimeRange>({ start: undefined, end: undefined });
  const { toast } = NexusUI.useToast();

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
        <div className="flex items-center gap-4 text-[var(--color-brand-primary)]">
          <NexusUI.Icon name="Activity" size={24} />
          <NexusUI.Icon name="AlertCircle" size={24} className="text-[var(--color-danger)]" />
          <NexusUI.Icon name="CheckCircle2" size={24} className="text-[var(--color-success)]" />
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
    default:
      return (
        <div className="text-[var(--color-text-secondary)] flex items-center gap-2">
          <NexusUI.Icon name="Hammer" />
          <span>Exemplo interativo do componente <strong>{componentName}</strong> ainda não implementado.</span>
        </div>
      );
  }
}
