'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useProjectStore } from '@/stores/useProjectStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { exportToJSON, importFromJSON } from '@/utils/export';
import { validateAudioFile } from '@/utils/audio';

export function Header() {
  const { db, importData } = useProjectStore();
  const { loadAudioFile, audioTrack } = useAudioStore();
  
  const importFileRef = useRef<HTMLInputElement>(null);
  const audioFileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportToJSON(db);
  };

  const handleImport = () => {
    importFileRef.current?.click();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await importFromJSON(file);
      importData(data);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao importar arquivo');
    }

    e.target.value = '';
  };

  const handleLoadAudio = () => {
    audioFileRef.current?.click();
  };

  const handleAudioFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateAudioFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    try {
      await loadAudioFile(file);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao carregar áudio');
    }

    e.target.value = '';
  };

  const getAudioInfo = () => {
    if (!audioTrack.fileName) {
      return 'Nenhum áudio carregado';
    }
    
    const shortName = audioTrack.fileName.length > 25 
      ? audioTrack.fileName.substring(0, 25) + '...' 
      : audioTrack.fileName;
    
    return `Áudio: ${shortName} (${audioTrack.duration.toFixed(1)}s)`;
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-gray-100">
          {db.projeto.titulo}
        </h1>
        
        <Button onClick={handleExport} size="sm">
          Exportar JSON
        </Button>
        
        <Button onClick={handleImport} size="sm">
          Importar JSON
        </Button>
        
        <Button onClick={handleLoadAudio} size="sm">
          Carregar Áudio
        </Button>
      </div>

      <div className="text-sm text-gray-400">
        {getAudioInfo()}
      </div>

      {/* Hidden file inputs */}
      <Input
        ref={importFileRef}
        type="file"
        accept="application/json"
        onChange={handleImportFile}
        className="hidden"
      />
      
      <Input
        ref={audioFileRef}
        type="file"
        accept="audio/*"
        onChange={handleAudioFile}
        className="hidden"
      />
    </header>
  );
}