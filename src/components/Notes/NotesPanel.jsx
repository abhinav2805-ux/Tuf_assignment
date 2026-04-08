import { useCalendarStore } from '../../store/useCalendarStore';

export default function NotesPanel() {
  const { notes, setNotes } = useCalendarStore();

  return (
    <div className="h-full flex flex-col pt-2">
      <h3 className="text-[11px] font-bold text-gray-800 mb-2">Notes</h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full flex-grow text-xs text-gray-800 bg-transparent border-none resize-none focus:ring-0 focus:outline-none"
        style={{
          lineHeight: '26px',
          padding: '0',
          backgroundImage: 'linear-gradient(#d1d5db 1px, transparent 1px)',
          backgroundSize: '100% 26px',
          backgroundPosition: '0 25px',
          backgroundAttachment: 'local'
        }}
      />
    </div>
  );
}