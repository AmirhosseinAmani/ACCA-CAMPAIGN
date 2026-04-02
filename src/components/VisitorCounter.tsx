type Props = {
  count: number;
  label: string;
};

export default function VisitorCounter({ count, label }: Props) {
  return (
    <div className="inline-flex items-center rounded-2xl border border-[#d9c4a1] bg-white/80 px-4 py-2 shadow-sm">
      <span className="text-sm text-[#6b7280]">{label}:</span>
      <span className="ml-2 text-lg font-bold text-[#1b3558]">{count}</span>
    </div>
  );
}
