import { useCalendarStore } from './store/useCalendarStore';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarGrid from './components/Calendar/CalendarGrid';
import NotesPanel from './components/Notes/NotesPanel';

function SpiralBinding() {
  return (
    <div className="absolute -top-3 left-0 w-full flex justify-center gap-[6px] px-8 z-30 pointer-events-none">
      {/* Top hanger hook */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 border-4 border-gray-600 rounded-full clip-half bg-transparent shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-gray-600"></div>

      {/* The wire spirals */}
      {[...Array(38)].map((_, i) => (
        <div key={i} className="w-[6px] h-6 rounded-full border border-gray-900 bg-gradient-to-b from-gray-300 via-gray-500 to-gray-800 shadow-sm" />
      ))}
    </div>
  );
}

function App() {
  const { currentDate, setCurrentDate, setDirection } = useCalendarStore();

  const handlePrev = () => {
    setDirection(-1);
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center p-4 py-12">
      <div className="relative w-full max-w-[600px] bg-white shadow-2xl shadow-gray-400/50 flex flex-col">
        <SpiralBinding />

        {/* Top Half: Image & Blue Geometric Shape */}
        <div className="relative h-[350px] w-full overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1000&auto=format&fit=crop"
            alt="Mountain Climber"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Blue Geometric SVG Overlay */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-[140px] text-[#1b8bc2] fill-current z-10"
          >
            <path d="M 0 100 L 0 50 L 45 90 L 100 0 L 100 100 Z" />
          </svg>

          {/* Month / Year Text inside the blue shape */}
          <div className="absolute bottom-6 right-8 z-20 flex flex-col items-end">
            <span className="text-white text-2xl font-light tracking-widest">
              {format(currentDate, 'yyyy')}
            </span>
            <span className="text-white text-4xl font-bold tracking-wider uppercase leading-none">
              {format(currentDate, 'MMMM')}
            </span>
          </div>

          {/* Hidden Navigation Arrows (Appear on hover for clean UI) */}
          <div className="absolute inset-0 z-30 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={handlePrev} className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50">
              <ChevronLeft size={24} />
            </button>
            <button onClick={handleNext} className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Bottom Half: Notes & Calendar Grid */}
        <div className="flex px-6 py-8 h-[350px]">
          <div className="w-[35%] pr-4 border-r border-transparent">
            <NotesPanel />
          </div>
          <div className="w-[65%] pl-4 flex flex-col justify-end">
            <CalendarGrid />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;