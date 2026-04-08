export default function HeroImage() {
  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-full overflow-hidden bg-gray-900">
      {/* Mountain landscape image matching the inspiration vibe */}
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop"
        alt="Calendar Hero"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />

      {/* Optional overlay gradient to make it pop */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent pointer-events-none" />
    </div>
  );
}