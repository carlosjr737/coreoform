# CoreoForm - Roadmap de Desenvolvimento

## 🎯 Objetivo
Transformar o CoreoMVP em uma aplicação SaaS completa para criação e compartilhamento de coreografias com sincronização de áudio em tempo real.

---

## 📋 Passo 1: Refatoração para TypeScript Modular
**Objetivo:** Organizar o código em módulos TypeScript reutilizáveis e testáveis

### Entregas:
- [ ] **Estrutura de pastas modular**
  ```
  src/
  ├── types/           # Interfaces e tipos
  ├── stores/          # Estado global (Zustand)
  ├── components/      # Componentes React
  ├── hooks/           # Custom hooks
  ├── utils/           # Funções utilitárias
  ├── services/        # Lógica de negócio
  └── lib/             # Configurações e clientes
  ```

- [ ] **Tipos TypeScript definidos**
  - `Project`, `Formation`, `Marker`, `AudioTrack`
  - Estados de playback e timeline
  - Configurações de usuário

- [ ] **Componentes modulares**
  - `Timeline` com sub-componentes
  - `Stage` para visualização
  - `FormationList` e `DancerPanel`
  - `AudioWaveform` e `PlaybackControls`

- [ ] **Gerenciamento de estado**
  - Zustand para estado global
  - Separação de concerns (audio, timeline, formations)

**Tempo estimado:** 1-2 semanas

---

## 📋 Passo 2: Next.js + Supabase Foundation
**Objetivo:** Migrar para Next.js com autenticação e persistência de dados

### Entregas:
- [ ] **Setup Next.js 14 com App Router**
  - TypeScript configurado
  - Tailwind CSS
  - Estrutura de rotas

- [ ] **Configuração Supabase**
  - Projeto criado
  - Tabelas: `users`, `projects`, `formations`, `markers`
  - RLS (Row Level Security) configurado
  - Tipos TypeScript gerados

- [ ] **Sistema de Autenticação**
  - Login/Registro com email/senha
  - Middleware de proteção de rotas
  - Perfil de usuário

- [ ] **CRUD Básico**
  - Salvar/carregar projetos
  - Operações em formações e marcadores
  - Sincronização automática

**Tempo estimado:** 2-3 semanas

---

## 📋 Passo 3: Upload de Áudio e Processamento
**Objetivo:** Sistema robusto de upload e processamento de áudio

### Entregas:
- [ ] **Supabase Storage configurado**
  - Bucket para arquivos de áudio
  - Políticas de acesso por usuário
  - Compressão automática

- [ ] **Upload com URL assinada**
  - Edge Function para gerar URLs
  - Progress tracking
  - Validação de formato/tamanho

- [ ] **Processamento server-side**
  - Edge Function com Peaks.js
  - Geração de waveform data
  - Metadados de áudio (duração, BPM)

- [ ] **Cache e otimização**
  - CDN para arquivos estáticos
  - Lazy loading de waveforms
  - Compressão de dados

**Tempo estimado:** 2-3 semanas

---

## 📋 Passo 4: Autosave e Versionamento
**Objetivo:** Sistema de salvamento automático e controle de versões

### Entregas:
- [ ] **Autosave inteligente**
  - Debounced saves (500ms)
  - Detecção de mudanças
  - Indicador visual de status

- [ ] **Sistema de versões**
  - Tabela `project_versions`
  - Snapshots automáticos
  - Restore de versões anteriores

- [ ] **Conflict resolution**
  - Detecção de conflitos
  - Merge strategies
  - Backup automático

- [ ] **Offline support**
  - Service Worker
  - IndexedDB para cache local
  - Sync quando online

**Tempo estimado:** 2-3 semanas

---

## 📋 Passo 5: Compartilhamento e Permissões
**Objetivo:** Sistema de colaboração com controle de acesso

### Entregas:
- [ ] **Sistema de permissões**
  - Tabelas: `project_shares`, `user_permissions`
  - Níveis: Owner, Editor, Viewer
  - Convites por email

- [ ] **Interface de compartilhamento**
  - Modal de convite
  - Gerenciamento de membros
  - Links públicos (opcional)

- [ ] **Controle de acesso**
  - Middleware de permissões
  - RLS policies atualizadas
  - Auditoria de ações

- [ ] **Notificações**
  - Email notifications
  - In-app notifications
  - Activity feed

**Tempo estimado:** 2-3 semanas

---

## 📋 Passo 6: Colaboração em Tempo Real
**Objetivo:** Sincronização em tempo real entre usuários

### Entregas:
- [ ] **Supabase Realtime**
  - Configuração de canais
  - Broadcast de mudanças
  - Presence tracking

- [ ] **Playhead sincronizado**
  - Broadcast de posição
  - Controle de quem pode tocar
  - Indicadores visuais de usuários

- [ ] **Edição colaborativa**
  - Operational Transform básico
  - Lock de elementos em edição
  - Cursors de outros usuários

- [ ] **Chat/Comentários**
  - Sistema de comentários
  - Chat em tempo real
  - Menções e notificações

**Tempo estimado:** 3-4 semanas

---

## 📋 Passo 7: Monetização e Limites
**Objetivo:** Sistema de billing e planos de assinatura

### Entregas:
- [ ] **Integração Stripe**
  - Produtos e preços configurados
  - Webhooks para eventos
  - Portal do cliente

- [ ] **Sistema de planos**
  ```
  Free: 1 projeto, 5min áudio, 2 membros
  Pro: 10 projetos, 60min áudio, 10 membros
  Team: Ilimitado, recursos avançados
  ```

- [ ] **Enforcement de limites**
  - Middleware de verificação
  - Soft/hard limits
  - Upgrade prompts

- [ ] **Dashboard de billing**
  - Uso atual vs limites
  - Histórico de pagamentos
  - Gerenciamento de assinatura

- [ ] **Analytics básico**
  - Métricas de uso
  - Conversion tracking
  - Health monitoring

**Tempo estimado:** 3-4 semanas

---

## 🛠 Stack Tecnológica Final

### Frontend
- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** + **Framer Motion**
- **Zustand** (estado global)
- **React Query** (cache/sync)

### Backend
- **Supabase** (Database + Auth + Storage + Realtime)
- **Edge Functions** (processamento)
- **Stripe** (pagamentos)

### Infraestrutura
- **Vercel** (deploy)
- **Supabase Cloud** (backend)
- **Stripe** (billing)

---

## 📊 Cronograma Total
**Tempo estimado:** 4-6 meses (1 desenvolvedor)
**Tempo com equipe:** 2-3 meses (2-3 desenvolvedores)

## 🎯 Marcos Importantes
- **Mês 1:** MVP funcional (Passos 1-2)
- **Mês 2:** Áudio completo (Passo 3)
- **Mês 3:** Colaboração básica (Passos 4-5)
- **Mês 4:** Tempo real (Passo 6)
- **Mês 5:** Monetização (Passo 7)
- **Mês 6:** Polish e launch

## 🚀 Próximos Passos
1. Começar com Passo 1 - criar estrutura TypeScript
2. Setup do ambiente Next.js + Supabase
3. Migração gradual do código existente
4. Testes em cada etapa antes de avançar