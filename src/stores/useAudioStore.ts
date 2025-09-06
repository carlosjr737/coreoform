import { create } from 'zustand';
import { AudioTrack } from '@/types';

interface AudioState {
  audioTrack: AudioTrack;
  
  // Actions
  initializeAudioContext: () => Promise<void>;
  loadAudioFile: (file: File) => Promise<void>;
  clearAudio: () => void;
  processWaveformData: () => void;
}

const initialAudioTrack: AudioTrack = {
  buffer: null,
  context: null,
  sourceNode: null,
  waveformData: null,
  duration: 0,
  fileName: ''
};

export const useAudioStore = create<AudioState>((set, get) => ({
  audioTrack: initialAudioTrack,

  initializeAudioContext: async () => {
    const { audioTrack } = get();
    if (audioTrack.context) return;

    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume context if suspended (Safari/iOS requirement)
      if (context.state === 'suspended') {
        await context.resume();
      }

      set((state) => ({
        audioTrack: { ...state.audioTrack, context }
      }));
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      throw new Error('Seu navegador não suporta a Web Audio API');
    }
  },

  loadAudioFile: async (file: File) => {
    const { initializeAudioContext } = get();
    await initializeAudioContext();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const { audioTrack } = get();
          
          if (!audioTrack.context) {
            throw new Error('Audio context not initialized');
          }

          const buffer = await audioTrack.context.decodeAudioData(arrayBuffer);
          
          set((state) => ({
            audioTrack: {
              ...state.audioTrack,
              buffer,
              duration: buffer.duration,
              fileName: file.name
            }
          }));

          // Process waveform data
          get().processWaveformData();
          resolve(undefined);
        } catch (error) {
          console.error('Failed to decode audio:', error);
          reject(new Error(`Não foi possível processar este arquivo de áudio: ${error}`));
        }
      };

      reader.onerror = () => {
        reject(new Error('Erro ao ler o arquivo de áudio'));
      };

      reader.readAsArrayBuffer(file);
    });
  },

  clearAudio: () =>
    set({ audioTrack: initialAudioTrack }),

  processWaveformData: () => {
    const { audioTrack } = get();
    if (!audioTrack.buffer) return;

    const rawData = audioTrack.buffer.getChannelData(0);
    const samples = 256;
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

    const maxVal = Math.max(...filteredData);
    const safeMax = maxVal > 0 ? maxVal : 1;
    const multiplier = 1 / safeMax;
    const normalizedData = filteredData.map(n => n * multiplier);

    set((state) => ({
      audioTrack: {
        ...state.audioTrack,
        waveformData: normalizedData
      }
    }));
  }
}));