type StatCardProps = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

export default function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all">
      <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white">
        {icon}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400 text-center">{label}</p>
    </div>
  );
}
