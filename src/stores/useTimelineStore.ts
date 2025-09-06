import { create } from 'zustand';
import { TimelineState, ZOOM_MIN, ZOOM_MAX, ZOOM_STEP, BASE_PX_PER_SEC } from '@/types';

interface TimelineStore extends TimelineState {
  // Actions
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setScrubbing: (isScrubbing: boolean) => void;
  calculateTotalPx: (totalSeconds: number) => number;
}

export const useTimelineStore = create<TimelineStore>((set, get) => ({
  zoom: 1,
  totalTimelinePx: 0,
  isScrubbing: false,

  setZoom: (newZoom: number) => {
    const clampedZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, newZoom));
    set({ zoom: clampedZoom });
  },

  zoomIn: () => {
    const { zoom, setZoom } = get();
    setZoom(zoom + ZOOM_STEP);
  },

  zoomOut: () => {
    const { zoom, setZoom } = get();
    setZoom(zoom - ZOOM_STEP);
  },

  resetZoom: () => {
    set({ zoom: 1 });
  },

  setScrubbing: (isScrubbing: boolean) =>
    set({ isScrubbing }),

  calculateTotalPx: (totalSeconds: number) => {
    const { zoom } = get();
    return Math.max(1, Math.floor(totalSeconds * BASE_PX_PER_SEC * zoom));
  }
}));