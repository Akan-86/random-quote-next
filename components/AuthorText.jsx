export function AuthorText({ children }) {
  return (
    <footer className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
      <span aria-hidden="true" className="h-px w-6 shrink-0 bg-primary" />
      {children}
    </footer>
  );
}
