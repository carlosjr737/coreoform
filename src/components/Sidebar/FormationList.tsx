'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useProjectStore } from '@/stores/useProjectStore';
import { usePlaybackStore } from '@/stores/usePlaybackStore';
import { Formation } from '@/types';
import { clsx } from 'clsx';

export function FormationList() {
  const { db, formacaoAtivaId, addFormation, removeFormation, updateFormation, setActiveFormation } = useProjectStore();
  const { stopPlayback } = usePlaybackStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleAddFormation = () => {
    stopPlayback();
    addFormation();
  };

  const handleRemoveFormation = (id: string) => {
    if (confirm('Remover esta formação?')) {
      removeFormation(id);
    }
  };

  const handleFormationClick = (id: string) => {
    if (editingId) return;
    setActiveFormation(id);
  };

  const handleDoubleClick = (formation: Formation) => {
    setEditingId(formation.id);
    setEditingName(formation.nome);
  };

  const handleEditSubmit = (id: string) => {
    if (editingName.trim()) {
      updateFormation(id, { nome: editingName.trim() });
    }
    setEditingId(null);
    setEditingName('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      handleEditSubmit(id);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleEditTimes = (formation: Formation) => {
    stopPlayback();
    
    const newDuration = prompt(
      `Editar DURAÇÃO (s) para "${formation.nome}":`,
      formation.duracaoSegundos.toString()
    );
    
    if (newDuration !== null && !isNaN(Number(newDuration)) && Number(newDuration) >= 0) {
      updateFormation(formation.id, { duracaoSegundos: parseFloat(newDuration) });
    }
    
    const newTransition = prompt(
      `Editar TRANSIÇÃO (s) para "${formation.nome}":`,
      formation.tempoTransicaoEntradaSegundos.toString()
    );
    
    if (newTransition !== null && !isNaN(Number(newTransition)) && Number(newTransition) >= 0) {
      updateFormation(formation.id, { tempoTransicaoEntradaSegundos: parseFloat(newTransition) });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-100">Formações</h2>
        <Button onClick={handleAddFormation} size="sm">
          + Add
        </Button>
      </div>

      <ul className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {db.formacoes.map((formation) => (
          <li
            key={formation.id}
            className={clsx(
              'grid grid-cols-[1fr_auto_auto] items-center gap-2 p-2 rounded-md cursor-pointer border transition-colors',
              formation.id === formacaoAtivaId
                ? 'bg-blue-600 text-white border-blue-500'
                : 'border-transparent hover:bg-gray-700'
            )}
            onClick={() => handleFormationClick(formation.id)}
            onDoubleClick={() => handleDoubleClick(formation)}
          >
            {editingId === formation.id ? (
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={() => handleEditSubmit(formation.id)}
                onKeyDown={(e) => handleKeyDown(e, formation.id)}
                className="text-sm"
                autoFocus
              />
            ) : (
              <span className="text-sm truncate">
                {formation.ordem}. {formation.nome}
              </span>
            )}

            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleDoubleClick(formation);
              }}
              className="text-xs px-2 py-1"
            >
              ✎
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFormation(formation.id);
              }}
              className="text-xs px-2 py-1 text-red-400 hover:text-red-300"
            >
              ×
            </Button>
          </li>
        ))}
      </ul>

      <div className="text-xs text-gray-400 space-y-1">
        <p>Dica: clique para ativar</p>
        <p><strong>Duplo clique</strong> para renomear</p>
        <p><strong>SHIFT+clique</strong> para editar tempos</p>
      </div>
    </div>
  );
}