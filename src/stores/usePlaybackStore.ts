import { create } from 'zustand';
import { PlaybackState } from '@/types';

interface PlaybackStore extends PlaybackState {
  // Actions
  startPlayback: (offsetMs?: number) => Promise<void>;
  pausePlayback: () => void;
  stopPlayback: () => void;
  setGlobalTime: (ms: number) => void;
  updatePlaybackTime: (ms: number) => void;
}

export const usePlaybackStore = create<PlaybackStore>((set, get) => ({
  isPlaying: false,
  globalMsAtual: 0,
  tempoInicioPlayback: 0,
  tempoPausadoAcumulado: 0,
  playbackLoopId: null,

  startPlayback: async (offsetMs = 0) => {
    const state = get();
    if (state.isPlaying) return;

    set({
      isPlaying: true,
      tempoInicioPlayback: performance.now() - offsetMs,
      globalMsAtual: offsetMs
    });
  },

  pausePlayback: () => {
    const state = get();
    if (!state.isPlaying) return;

    if (state.playbackLoopId) {
      cancelAnimationFrame(state.playbackLoopId);
    }

    set({
      isPlaying: false,
      playbackLoopId: null,
      tempoPausadoAcumulado: performance.now() - state.tempoInicioPlayback
    });
  },

  stopPlayback: () => {
    const state = get();
    
    if (state.playbackLoopId) {
      cancelAnimationFrame(state.playbackLoopId);
    }

    set({
      isPlaying: false,
      playbackLoopId: null,
      globalMsAtual: 0,
      tempoInicioPlayback: 0,
      tempoPausadoAcumulado: 0
    });
  },

  setGlobalTime: (ms: number) =>
    set({ globalMsAtual: ms }),

  updatePlaybackTime: (ms: number) =>
    set({ globalMsAtual: ms })
}));