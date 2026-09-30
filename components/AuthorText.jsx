export function AuthorText({ children }) {
  return (
    <footer className="mt-8 flex items-center gap-3 text-sm text-slate-600">
      <span aria-hidden="true" className="h-px w-8 bg-violet-500" />
      {children}
    </footer>
  );
}
