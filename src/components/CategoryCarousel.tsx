import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  ArrowRight,
  Pause,
  Play,
  Sparkles
} from 'lucide-react';

interface ServiceCategory {
  id: string;
  title: string;
  urdu: string;
  categoryGroup: 'domestic' | 'medical' | 'commercial';
  timing: string;
  salary: string;
  desc: string;
  duties: string[];
  image: string;
  tag: string;
}

interface CategoryCarouselProps {
  services: ServiceCategory[];
  onViewDetails: (id: string) => void;
  onHire: (title: string) => void;
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  services,
  onViewDetails,
  onHire,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive items count calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // Tablet: 2 cards
      } else if (window.innerWidth < 1280) {
        setVisibleCount(3); // Desktop medium: 3 cards
      } else {
        setVisibleCount(4); // Desktop wide: 4 cards
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, services.length - visibleCount);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={containerRef}
    >
      {/* Top Header & Carousel Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              All 8 Categories
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Auto-playing every 3.5s (Hover to pause)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Browse All Staff Categories
          </h2>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2">
          {/* Pause / Play Indicator Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
            className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer"
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-700" /> : <Pause className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            title="Previous categories"
            className="p-2 text-slate-700 hover:text-emerald-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-2xs transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            title="Next categories"
            className="p-2 text-slate-700 hover:text-emerald-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-2xs transition cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel Track Container */}
      <div className="overflow-hidden rounded-2xl py-1">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {services.map((s) => (
            <div
              key={s.id}
              className="shrink-0 px-2.5"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between h-full group">
                <div>
                  {/* Category Image with Hover Zoom */}
                  <div
                    onClick={() => onViewDetails(s.id)}
                    className="relative aspect-4/3 w-full overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {s.tag}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <h3
                      onClick={() => onViewDetails(s.id)}
                      className="font-bold text-slate-900 text-base group-hover:text-emerald-800 transition cursor-pointer line-clamp-1"
                    >
                      {s.title}
                    </h3>
                    <p className="text-xs text-emerald-700 font-semibold mb-1.5 urdu-font">
                      {s.urdu}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                      {s.desc}
                    </p>
                  </div>
                </div>

                {/* Footer and Actions */}
                <div className="p-4 pt-0">
                  <div className="pt-2.5 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Estimated:</span>
                      <span className="font-bold text-emerald-800">{s.salary}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{s.timing}</div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onViewDetails(s.id)}
                        className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Details</span>
                      </button>
                      <button
                        onClick={() => onHire(s.title)}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition cursor-pointer shadow-xs"
                      >
                        <span>Hire</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            title={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentIndex === idx
                ? 'w-7 bg-emerald-700'
                : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
