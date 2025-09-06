import { Database } from '@/types';

export function exportToJSON(data: Database, filename?: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { 
    type: 'application/json' 
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  a.href = url;
  a.download = filename || `${data.projeto.titulo.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.json`;
  
  document.body.appendChild(a);
  a.click();
  a.remove();
  
  URL.revokeObjectURL(url);
}

export function importFromJSON(file: File): Promise<Database> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (!data?.formacoes?.length) {
          throw new Error('Formato inválido: dados de formações não encontrados');
        }
        
        // Validate structure
        if (!data.projeto?.id || !data.projeto?.titulo) {
          throw new Error('Formato inválido: dados do projeto não encontrados');
        }
        
        resolve(data);
      } catch (error) {
        reject(new Error(`Falha ao importar JSON: ${error}`));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler o arquivo'));
    };
    
    reader.readAsText(file);
  });
}