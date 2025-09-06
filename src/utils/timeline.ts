import { Formation } from '@/types';

export function calculateTotalSeconds(formations: Formation[]): number {
  return formations.reduce(
    (acc, f) => acc + f.duracaoSegundos + f.tempoTransicaoEntradaSegundos,
    0
  );
}

export function calculateAccumulatedTime(formations: Formation[], targetIndex: number): number {
  let accumulated = 0;
  
  for (let i = 0; i < targetIndex; i++) {
    accumulated += formations[i].tempoTransicaoEntradaSegundos + formations[i].duracaoSegundos;
  }
  
  if (formations[targetIndex]) {
    accumulated += formations[targetIndex].tempoTransicaoEntradaSegundos;
  }
  
  return accumulated * 1000; // Convert to milliseconds
}

export function findFormationAtTime(formations: Formation[], timeMs: number): {
  formation: Formation | null;
  isTransition: boolean;
  progress: number;
  fromFormation?: Formation;
} {
  let accumulated = 0;
  
  for (let i = 0; i < formations.length; i++) {
    const f = formations[i];
    const transitionMs = f.tempoTransicaoEntradaSegundos * 1000;
    const durationMs = f.duracaoSegundos * 1000;
    
    // Check if in transition
    if (timeMs < accumulated + transitionMs) {
      const progress = transitionMs === 0 ? 1 : (timeMs - accumulated) / transitionMs;
      return {
        formation: f,
        isTransition: true,
        progress,
        fromFormation: formations[i - 1]
      };
    }
    
    accumulated += transitionMs;
    
    // Check if in formation duration
    if (timeMs < accumulated + durationMs) {
      return {
        formation: f,
        isTransition: false,
        progress: 0
      };
    }
    
    accumulated += durationMs;
  }
  
  // Return last formation if time exceeds total
  const lastFormation = formations[formations.length - 1];
  return {
    formation: lastFormation,
    isTransition: false,
    progress: 0
  };
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function formatTime(seconds: number): string {
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.round(seconds - minutes * 60);
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  }
  
  return seconds < 10 
    ? seconds.toFixed(1) + 's' 
    : Math.round(seconds) + 's';
}

export function calculateTimeStep(totalSeconds: number, containerWidth: number): number {
  const targetTicks = Math.max(8, Math.min(12, Math.floor(containerWidth / 120)));
  const rawStep = totalSeconds / Math.max(1, targetTicks);
  
  const steps = [0.1, 0.2, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  
  for (const step of steps) {
    if (step >= rawStep) return step;
  }
  
  return Math.ceil(rawStep);
}