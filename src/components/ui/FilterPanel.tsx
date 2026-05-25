import { X, SlidersHorizontal } from 'lucide-react';
import { makes, bodyTypes, fuelTypes, transmissions } from '@/lib/data';
import type { FilterState, SortOption } from '@/types';
import { cn } from '@/lib/utils';

type FilterPanelProps = {
  filters: FilterState;
  sort: SortOption;
  onFilter: (key: keyof FilterState, value: any) => void;
  onSort: (s: SortOption) => void;
  onReset: () => void;
  resultCount: number;
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'rating-desc', label: 'Top Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'year-desc', label: 'Newest First' },
  { value: 'mileage-asc', label: 'Lowest Mileage' },
];

function ChipGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
              value === opt
                ? 'filter-chip-active text-white border-transparent'
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FilterPanel({ filters, sort, onFilter, onSort, onReset, resultCount }: FilterPanelProps) {
  return (
    <aside className="w-72 shrink-0">
      <div className="sticky top-24 bg-[#1a1a2e] rounded-2xl border border-white/5 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-purple-400" />
            <span className="font-semibold text-white">Filters</span>
            <span className="text-xs text-gray-500">({resultCount} results)</span>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <X size={12} />
            Reset
          </button>
        </div>

        {/* Sort */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Sort By</p>
          <select
            value={sort}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSort(e.target.value as SortOption)}
            className="w-full bg-[#0f0f1a] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <ChipGroup label="Make" options={makes} value={filters.make} onChange={(v) => onFilter('make', v)} />
        <ChipGroup label="Body Type" options={bodyTypes} value={filters.bodyType} onChange={(v) => onFilter('bodyType', v)} />
        <ChipGroup label="Fuel Type" options={fuelTypes} value={filters.fuelType} onChange={(v) => onFilter('fuelType', v)} />
        <ChipGroup label="Transmission" options={transmissions} value={filters.transmission} onChange={(v) => onFilter('transmission', v)} />

        {/* Price Range */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Max Price</p>
          <input
            type="range"
            min={0}
            max={600000}
            step={5000}
            value={filters.priceMax}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilter('priceMax', Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>$0</span>
            <span>${(filters.priceMax / 1000).toFixed(0)}k</span>
          </div>
        </div>

        {/* Year Range */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Min Year</p>
          <input
            type="range"
            min={2015}
            max={2024}
            step={1}
            value={filters.yearMin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilter('yearMin', Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{filters.yearMin}</span>
            <span>2024</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
