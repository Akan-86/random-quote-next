export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border-2 p-8 shadow-2xl transition-colors sm:p-12 ${className}`}>
      {children}
    </div>
  );
}
