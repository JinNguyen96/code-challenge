interface InfoRowProps {
  label: string;
  value: string;
}

export const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <div className="flex items-center justify-between text-xs sm:text-sm">
      <span className="text-brand-500/50">{label}</span>
      <span className="text-brand-500">{value}</span>
    </div>
  );
};

