'use client';

import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header />
      
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Stage Controls */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                SHIFT+arrastar para grade. Duplo clique para renomear.
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded border border-gray-600">
                Anterior
              </button>
              <button className="px-4 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded text-white">
                ▶ Play
              </button>
              <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded border border-gray-600">
                Próxima
              </button>
            </div>
          </div>

          {/* Stage */}
          <div className="flex-1 stage-grid relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">CoreoForm v9</h2>
                <p className="text-lg">Palco de Coreografia</p>
                <p className="text-sm mt-4 opacity-75">
                  Componentes sendo migrados para React...
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Footer */}
          <footer className="bg-gray-800 border-t border-gray-700 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Timeline</span>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded">−</button>
                <span className="text-xs text-gray-400">100%</span>
                <button className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded">+</button>
                <button className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded">⟲</button>
              </div>
            </div>
            
            {/* Time Ruler Placeholder */}
            <div className="h-7 bg-gray-700 rounded-t border border-gray-600 mb-0 flex items-center px-2">
              <span className="text-xs text-gray-400">0s</span>
            </div>
            
            {/* Timeline Blocks Placeholder */}
            <div className="h-15 bg-gray-900 border border-gray-600 border-t-0 rounded-b flex items-center px-2">
              <span className="text-xs text-gray-500">Timeline será renderizada aqui</span>
            </div>
            
            {/* Audio Track Placeholder */}
            <div className="h-12 bg-gray-900 border border-gray-600 border-t-0 rounded-b mt-1 flex items-center px-2">
              <span className="text-xs text-gray-500">Waveform de áudio</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}