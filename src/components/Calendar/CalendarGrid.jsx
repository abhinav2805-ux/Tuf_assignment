import { useMemo } from 'react';
import { useCalendarStore } from '../../store/useCalendarStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  startOfMonth, startOfWeek, addDays, eachDayOfInterval,
  format, isSameMonth, isSameDay,
  isWithinInterval, isBefore
} from 'date-fns';

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 30 : -30, opacity: 0 })
};

export default function CalendarGrid() {
  const { currentDate, startDate: rawStart, endDate: rawEnd, setRange, direction } = useCalendarStore();

  const startDate = rawStart ? new Date(rawStart) : null;
  const endDate = rawEnd ? new Date(rawEnd) : null;

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const startDateGrid = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDateGrid = addDays(startDateGrid, 41);
    return eachDayOfInterval({ start: startDateGrid, end: endDateGrid });
  }, [currentDate]);

  const handleDateClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setRange(day, null);
    } else if (startDate && !endDate) {
      if (isBefore(day, startDate)) {
        setRange(day, startDate);
      } else {
        setRange(startDate, day);
      }
    }
  };

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="w-full h-full overflow-hidden flex flex-col justify-between">
      <div className="grid grid-cols-7 mb-4">
        {weekDays.map((day, i) => (
          <div
            key={day}
            className={`text-center text-[10px] font-bold tracking-wider uppercase
              ${i >= 5 ? 'text-[#1b8bc2]' : 'text-gray-800'}`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentDate.toString()}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            className="grid grid-cols-7 gap-y-2 absolute inset-0"
          >
            {days.map((day, idx) => {
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isSelectedStart = startDate && isSameDay(day, startDate);
              const isSelectedEnd = endDate && isSameDay(day, endDate);
              const isBetween = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate }) && !isSelectedStart && !isSelectedEnd;
              const isWeekend = day.getDay() === 0 || day.getDay() === 6;

              return (
                <div key={idx} className="flex justify-center items-center h-8 relative">
                  {isBetween && <div className="absolute inset-y-0 left-0 right-0 bg-[#e6f4fc]" />}
                  {isSelectedStart && endDate && <div className="absolute inset-y-0 right-0 w-1/2 bg-[#e6f4fc]" />}
                  {isSelectedEnd && startDate && <div className="absolute inset-y-0 left-0 w-1/2 bg-[#e6f4fc]" />}

                  <button
                    onClick={() => handleDateClick(day)}
                    className={`
                      z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all
                      ${!isCurrentMonth ? 'text-gray-300' : isWeekend ? 'text-[#1b8bc2]' : 'text-gray-800'}
                      ${!isCurrentMonth && isWeekend ? 'text-blue-200' : ''}
                      ${(isSelectedStart || isSelectedEnd) ? 'bg-[#1b8bc2] text-white shadow-md' : 'hover:bg-gray-100'}
                    `}
                  >
                    {format(day, 'd')}
                  </button>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}