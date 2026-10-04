import { Heart } from "lucide-react";
import { AppButton } from "@/components/AppButton";

export function LikeButton({ isLiked, onClick }) {
  return (
    <AppButton
      onClick={onClick}
      aria-pressed={isLiked}
      className={`rounded-full border-2 px-5 ${isLiked
        ? "border-rose-700 bg-rose-700 text-white hover:bg-rose-800 hover:text-white dark:border-rose-300 dark:bg-rose-300 dark:text-rose-950 dark:hover:bg-rose-200"
        : "border-rose-600 text-rose-700 hover:bg-rose-50 hover:text-rose-800 dark:border-rose-400 dark:text-rose-200 dark:hover:bg-rose-950 dark:hover:text-rose-100"}`}
    >
      <Heart aria-hidden="true" className={isLiked ? "fill-current" : ""} />
      {isLiked ? "Liked" : "Like"}
    </AppButton>
  );
}
