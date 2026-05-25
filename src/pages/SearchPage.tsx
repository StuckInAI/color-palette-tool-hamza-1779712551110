import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import CarCard from '@/components/ui/CarCard';
import FilterPanel from '@/components/ui/FilterPanel';
import { useFilters } from '@/hooks/useFilters';

export default function SearchPage() {
  const { filters, sort, filtered, updateFilter, resetFilters, setSort } = useFilters();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Browse Vehicles</h1>
            <p className="text-gray-400">Discover your perfect car from our premium collection</p>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3 bg-[#1a1a2e] rounded-2xl border border-white/10 p-2 mb-6 focus-within:border-purple-500/50 transition-colors">
            <Search size={18} className="ml-3 text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Search make, model, year..."
              value={filters.search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter('search', e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm py-2"
            />
            {filters.search && (
              <button
                onClick={() => updateFilter('search', '')}
                className="p-1.5 rounded-lg bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <span className="text-sm text-gray-400">{filtered.length} vehicles found</span>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a1a2e] border border-white/10 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          <div className="flex gap-8">
            {/* Filter panel — desktop always visible, mobile conditional */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <FilterPanel
                filters={filters}
                sort={sort}
                onFilter={updateFilter}
                onSort={setSort}
                onReset={resetFilters}
                resultCount={filtered.length}
              />
            </div>

            {/* Cars grid */}
            <div className="flex-1 min-w-0">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-4">
                    <Search size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No cars found</h3>
                  <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 gradient-bg text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
