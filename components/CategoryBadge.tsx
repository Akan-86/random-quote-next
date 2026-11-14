import { Badge } from "@/components/ui/badge";
import type { QuoteCategory } from "@/quotes";

export function CategoryBadge({ category }: { category?: QuoteCategory }) {
  if (!category) return null;
  return <Badge variant="secondary">{category}</Badge>;
}
