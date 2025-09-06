import { create } from 'zustand';
import { Database, Formation, Marker, Project } from '@/types';

interface ProjectState {
  db: Database;
  formacaoAtivaId: string | null;
  
  // Actions
  setProject: (project: Project) => void;
  addFormation: (formation?: Partial<Formation>) => void;
  removeFormation: (id: string) => void;
  updateFormation: (id: string, updates: Partial<Formation>) => void;
  setActiveFormation: (id: string) => void;
  
  addDancer: () => void;
  removeDancer: (id: string) => void;
  updateDancer: (id: string, updates: Partial<Marker>) => void;
  updateDancerPosition: (id: string, x: number, y: number) => void;
  
  importData: (data: Database) => void;
  exportData: () => Database;
}

const initialData: Database = {
  projeto: { id: 'proj1', titulo: 'Coreografia v9' },
  formacoes: [
    {
      id: 'f1',
      nome: 'Início',
      ordem: 1,
      duracaoSegundos: 2,
      tempoTransicaoEntradaSegundos: 0,
      marcadores: [
        { id: 'm1', rotulo: 'D1', x: 100, y: 150, cor: '#ef4444' },
        { id: 'm2', rotulo: 'D2', x: 200, y: 150, cor: '#3b82f6' }
      ]
    },
    {
      id: 'f2',
      nome: 'Abertura',
      ordem: 2,
      duracaoSegundos: 1.5,
      tempoTransicaoEntradaSegundos: 1,
      marcadores: [
        { id: 'm1', rotulo: 'D1', x: 150, y: 50, cor: '#ef4444' },
        { id: 'm2', rotulo: 'D2', x: 150, y: 250, cor: '#3b82f6' }
      ]
    },
    {
      id: 'f3',
      nome: 'Final',
      ordem: 3,
      duracaoSegundos: 3,
      tempoTransicaoEntradaSegundos: 2,
      marcadores: [
        { id: 'm1', rotulo: 'D1', x: 400, y: 150, cor: '#ef4444' },
        { id: 'm2', rotulo: 'D2', x: 500, y: 150, cor: '#3b82f6' }
      ]
    }
  ]
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  db: initialData,
  formacaoAtivaId: initialData.formacoes[0]?.id || null,

  setProject: (project) =>
    set((state) => ({
      db: { ...state.db, projeto: project }
    })),

  addFormation: (formation) =>
    set((state) => {
      const novaOrdem = state.db.formacoes.length 
        ? Math.max(...state.db.formacoes.map(f => f.ordem)) + 1 
        : 1;
      
      const fAtual = state.db.formacoes.find(f => f.id === state.formacaoAtivaId);
      
      const nova: Formation = {
        id: `f${Date.now()}`,
        nome: `Formação ${novaOrdem}`,
        ordem: novaOrdem,
        duracaoSegundos: 3,
        tempoTransicaoEntradaSegundos: 1,
        marcadores: fAtual ? JSON.parse(JSON.stringify(fAtual.marcadores)) : [],
        ...formation
      };

      return {
        db: {
          ...state.db,
          formacoes: [...state.db.formacoes, nova]
        },
        formacaoAtivaId: nova.id
      };
    }),

  removeFormation: (id) =>
    set((state) => {
      const newFormations = state.db.formacoes.filter(f => f.id !== id);
      
      // Reorder formations
      newFormations.forEach((f, i) => f.ordem = i + 1);
      
      let newActiveId = state.formacaoAtivaId;
      if (state.formacaoAtivaId === id) {
        newActiveId = newFormations[0]?.id || null;
      }

      return {
        db: { ...state.db, formacoes: newFormations },
        formacaoAtivaId: newActiveId
      };
    }),

  updateFormation: (id, updates) =>
    set((state) => ({
      db: {
        ...state.db,
        formacoes: state.db.formacoes.map(f =>
          f.id === id ? { ...f, ...updates } : f
        )
      }
    })),

  setActiveFormation: (id) =>
    set({ formacaoAtivaId: id }),

  addDancer: () =>
    set((state) => {
      if (!state.db.formacoes.length) return state;

      const total = state.db.formacoes[0].marcadores.length;
      const cores = ['#ef4444', '#3b82f6', '#22c55e', '#f97316', '#8b5cf6', '#eab308', '#14b8a6'];
      
      const novo: Marker = {
        id: `m${Date.now()}`,
        rotulo: `D${total + 1}`,
        x: 50 + Math.random() * 100,
        y: 50 + Math.random() * 100,
        cor: cores[total % cores.length]
      };

      return {
        db: {
          ...state.db,
          formacoes: state.db.formacoes.map(f => ({
            ...f,
            marcadores: [...f.marcadores, JSON.parse(JSON.stringify(novo))]
          }))
        }
      };
    }),

  removeDancer: (id) =>
    set((state) => ({
      db: {
        ...state.db,
        formacoes: state.db.formacoes.map(f => ({
          ...f,
          marcadores: f.marcadores.filter(m => m.id !== id)
        }))
      }
    })),

  updateDancer: (id, updates) =>
    set((state) => ({
      db: {
        ...state.db,
        formacoes: state.db.formacoes.map(f => ({
          ...f,
          marcadores: f.marcadores.map(m =>
            m.id === id ? { ...m, ...updates } : m
          )
        }))
      }
    })),

  updateDancerPosition: (id, x, y) =>
    set((state) => {
      const activeFormation = state.db.formacoes.find(f => f.id === state.formacaoAtivaId);
      if (!activeFormation) return state;

      return {
        db: {
          ...state.db,
          formacoes: state.db.formacoes.map(f =>
            f.id === state.formacaoAtivaId
              ? {
                  ...f,
                  marcadores: f.marcadores.map(m =>
                    m.id === id ? { ...m, x, y } : m
                  )
                }
              : f
          )
        }
      };
    }),

  importData: (data) =>
    set({
      db: data,
      formacaoAtivaId: data.formacoes[0]?.id || null
    }),

  exportData: () => get().db
}));