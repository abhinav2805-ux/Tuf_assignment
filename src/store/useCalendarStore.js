import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { startOfMonth } from 'date-fns';

export const useCalendarStore = create(
  persist(
    (set) => ({
      currentDate: startOfMonth(new Date()),
      startDate: null,
      endDate: null,
      notes: '',
      direction: 0,

      setCurrentDate: (date) => set({ currentDate: date }),
      setDirection: (dir) => set({ direction: dir }),
      setRange: (start, end) => set({ startDate: start, endDate: end }),
      setNotes: (text) => set({ notes: text }),
    }),
    {
      name: 'calendar-storage',
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        currentDate: persistedState?.currentDate
          ? new Date(persistedState.currentDate)
          : currentState.currentDate,
      }),
      partialize: (state) => ({
        currentDate: state.currentDate,
        notes: state.notes,
        startDate: state.startDate,
        endDate: state.endDate
      }),
    }
  )
);