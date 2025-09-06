'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useProjectStore } from '@/stores/useProjectStore';
import { Marker } from '@/types';

export function DancerPanel() {
  const { db, addDancer, updateDancer } = useProjectStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  // Get unique dancers from all formations
  const uniqueDancers = useMemo(() => {
    const dancerMap = new Map<string, Marker>();
    
    db.formacoes.forEach((formation) => {
      formation.marcadores.forEach((marker) => {
        if (!dancerMap.has(marker.id)) {
          dancerMap.set(marker.id, {
            id: marker.id,
            rotulo: marker.rotulo,
            cor: marker.cor,
            x: marker.x,
            y: marker.y
          });
        }
      });
    });

    return Array.from(dancerMap.values()).sort((a, b) => 
      a.rotulo.localeCompare(b.rotulo, 'pt-BR', { sensitivity: 'base' })
    );
  }, [db.formacoes]);

  const filteredDancers = useMemo(() => {
    if (!searchTerm.trim()) return uniqueDancers;
    
    const term = searchTerm.toLowerCase();
    return uniqueDancers.filter(dancer => 
      dancer.rotulo.toLowerCase().includes(term)
    );
  }, [uniqueDancers, searchTerm]);

  const handleAddDancer = () => {
    if (!db.formacoes.length) {
      alert('Crie uma formação antes.');
      return;
    }
    addDancer();
  };

  const handleEditDancer = (dancer: Marker) => {
    setEditingId(dancer.id);
    setEditingName(dancer.rotulo);
  };

  const handleEditSubmit = (id: string) => {
    if (editingName.trim()) {
      updateDancer(id, { rotulo: editingName.trim() });
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-100">Bailarinos</h3>
        <Button onClick={handleAddDancer} size="sm">
          + Add
        </Button>
      </div>

      <Input
        placeholder="Buscar bailarino..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-sm"
      />

      <ul className="flex flex-col gap-2 max-h-64 overflow-y-auto">
        {filteredDancers.map((dancer) => (
          <li
            key={dancer.id}
            className="grid grid-cols-[16px_1fr_auto] items-center gap-2 p-2 rounded-md hover:bg-gray-700 cursor-pointer"
          >
            <div
              className="w-3 h-3 rounded-full border border-gray-500"
              style={{ backgroundColor: dancer.cor }}
            />

            {editingId === dancer.id ? (
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={() => handleEditSubmit(dancer.id)}
                onKeyDown={(e) => handleKeyDown(e, dancer.id)}
                className="text-sm"
                autoFocus
              />
            ) : (
              <span 
                className="text-sm truncate"
                title={dancer.rotulo}
                onDoubleClick={() => handleEditDancer(dancer)}
              >
                {dancer.rotulo}
              </span>
            )}

            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleEditDancer(dancer)}
              className="text-xs px-2 py-1"
            >
              ✎
            </Button>
          </li>
        ))}
      </ul>

      {filteredDancers.length === 0 && searchTerm && (
        <p className="text-xs text-gray-400 text-center py-4">
          Nenhum bailarino encontrado
        </p>
      )}
    </div>
  );
}