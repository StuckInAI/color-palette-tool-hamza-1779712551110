import { useState, useMemo } from 'react';
import { cars } from '@/lib/data';
import type { FilterState, SortOption, Car } from '@/types';

const defaultFilters: FilterState = {
  search: '',
  make: 'All',
  bodyType: 'All',
  fuelType: 'All',
  priceMin: 0,
  priceMax: 1000000,
  yearMin: 2000,
  yearMax: 2025,
  transmission: 'All',
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortOption>('rating-desc');

  const filtered = useMemo<Car[]>(() => {
    let result = [...cars];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.make.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.year.toString().includes(q)
      );
    }
    if (filters.make !== 'All') result = result.filter((c) => c.make === filters.make);
    if (filters.bodyType !== 'All') result = result.filter((c) => c.bodyType === filters.bodyType);
    if (filters.fuelType !== 'All') result = result.filter((c) => c.fuelType === filters.fuelType);
    if (filters.transmission !== 'All') result = result.filter((c) => c.transmission === filters.transmission);
    result = result.filter((c) => c.price >= filters.priceMin && c.price <= filters.priceMax);
    result = result.filter((c) => c.year >= filters.yearMin && c.year <= filters.yearMax);

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'year-desc': result.sort((a, b) => b.year - a.year); break;
      case 'rating-desc': result.sort((a, b) => b.rating - a.rating); break;
      case 'mileage-asc': result.sort((a, b) => a.mileage - b.mileage); break;
    }

    return result;
  }, [filters, sort]);

  function updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  return { filters, sort, filtered, updateFilter, resetFilters, setSort };
}
