// Core types for the choreography application

export interface Project {
  id: string;
  titulo: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Marker {
  id: string;
  rotulo: string;
  x: number;
  y: number;
  cor: string;
}

export interface Formation {
  id: string;
  nome: string;
  ordem: number;
  duracaoSegundos: number;
  tempoTransicaoEntradaSegundos: number;
  marcadores: Marker[];
}

export interface Database {
  projeto: Project;
  formacoes: Formation[];
}

// Audio related types
export interface AudioTrack {
  buffer: AudioBuffer | null;
  context: AudioContext | null;
  sourceNode: AudioSourceNode | null;
  waveformData: number[] | null;
  duration: number;
  fileName: string;
}

// Playback state
export interface PlaybackState {
  isPlaying: boolean;
  globalMsAtual: number;
  tempoInicioPlayback: number;
  tempoPausadoAcumulado: number;
  playbackLoopId: number | null;
}

// Timeline and zoom
export interface TimelineState {
  zoom: number;
  totalTimelinePx: number;
  isScrubbing: boolean;
}

// UI State
export interface UIState {
  formacaoAtivaId: string | null;
  searchTerm: string;
  isEditingFormation: boolean;
  isEditingDancer: boolean;
}

// Constants
export const ZOOM_MIN = 0.25;
export const ZOOM_MAX = 8;
export const ZOOM_STEP = 0.25;
export const BASE_PX_PER_SEC = 120;

export const CORES_BAILARINOS = [
  '#ef4444', '#3b82f6', '#22c55e', '#f97316', 
  '#8b5cf6', '#eab308', '#14b8a6'
];