import { useCalendarStore } from '../../store/useCalendarStore';
import { addMonths, subMonths, format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MonthNavigation() {
  const { currentDate, setCurrentDate, setDirection } = useCalendarStore();

  const nextMonth = () => {
    setDirection(1);
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setDirection(-1);
    setCurrentDate(subMonths(currentDate, 1));
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold tracking-widest text-sm uppercase">
          {format(currentDate, 'yyyy')}
        </span>
        <h2 className="text-3xl font-bold text-gray-900 uppercase">
          {format(currentDate, 'MMMM')}
        </h2>
      </div>

      <div className="flex gap-2">
        <button
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}