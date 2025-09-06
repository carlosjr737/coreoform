export async function initializeAudioContext(): Promise<AudioContext> {
  try {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    if (context.state === 'suspended') {
      await context.resume();
    }
    
    return context;
  } catch (error) {
    throw new Error('Seu navegador não suporta a Web Audio API');
  }
}

export function processAudioForVisualization(buffer: AudioBuffer, samples: number = 256): number[] {
  const rawData = buffer.getChannelData(0);
  const blockSize = Math.floor(rawData.length / samples);
  const filteredData: number[] = [];
  
  for (let i = 0; i < samples; i++) {
    const blockStart = blockSize * i;
    let sum = 0;
    
    for (let j = 0; j < blockSize; j++) {
      sum += Math.abs(rawData[blockStart + j]);
    }
    
    filteredData.push(sum / blockSize);
  }
  
  // Normalize data
  const maxVal = Math.max(...filteredData);
  const safeMax = maxVal > 0 ? maxVal : 1;
  const multiplier = 1 / safeMax;
  
  return filteredData.map(n => n * multiplier);
}

export function validateAudioFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg'];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'Arquivo muito grande. Máximo 50MB.' };
  }
  
  if (!allowedTypes.some(type => file.type.includes(type.split('/')[1]))) {
    return { valid: false, error: 'Formato não suportado. Use MP3, WAV ou OGG.' };
  }
  
  return { valid: true };
}