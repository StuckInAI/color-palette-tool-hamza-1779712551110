import { Link } from 'react-router-dom';
import { Star, Fuel, Gauge, Zap, Heart } from 'lucide-react';
import { useState } from 'react';
import type { Car } from '@/types';
import { formatPrice, formatMileage } from '@/lib/utils';

type CarCardProps = {
  car: Car;
};

const fuelColors: Record<string, string> = {
  Electric: 'text-emerald-400 bg-emerald-400/10',
  Petrol: 'text-orange-400 bg-orange-400/10',
  Diesel: 'text-blue-400 bg-blue-400/10',
  Hybrid: 'text-yellow-400 bg-yellow-400/10',
};

const badgeColors: Record<string, string> = {
  'New Arrival': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Hot Deal': 'bg-red-500/20 text-red-400 border-red-500/30',
  Premium: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Exotic: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

export default function CarCard({ car }: CarCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group relative bg-[#1a1a2e] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 card-glow hover:scale-[1.02]">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={car.image}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />

        {/* Badge */}
        {car.badge && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeColors[car.badge] || 'bg-white/10 text-white border-white/20'}`}>
            {car.badge}
          </span>
        )}

        {/* Like button */}
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
        >
          <Heart
            size={15}
            className={liked ? 'text-red-500 fill-red-500' : 'text-white/70'}
          />
        </button>

        {/* Fuel type */}
        <span className={`absolute bottom-3 left-3 text-xs font-medium px-2 py-0.5 rounded-full ${fuelColors[car.fuelType] || 'text-gray-400 bg-white/10'}`}>
          {car.fuelType}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">{car.year}</p>
            <h3 className="font-bold text-white text-base leading-tight">
              {car.make} {car.model}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white">{formatPrice(car.price)}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 mb-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Gauge size={12} />
            {formatMileage(car.mileage)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={12} />
            {car.transmission}
          </span>
          <span className="flex items-center gap-1">
            <Zap size={12} />
            {car.horsepower} hp
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(car.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">{car.rating} ({car.reviews} reviews)</span>
        </div>

        {/* CTA */}
        <Link
          to={`/car/${car.id}`}
          className="block w-full text-center py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
