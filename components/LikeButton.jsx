export function LikeButton({ isLiked, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isLiked}
      className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700 ${
        isLiked
          ? "border-rose-700 bg-rose-700 text-white hover:bg-rose-800"
          : "border-rose-600 bg-white text-rose-700 hover:bg-rose-100"
      }`}
    >
      <span aria-hidden="true">{isLiked ? "♥" : "♡"}</span>
      {isLiked ? "Liked" : "Like"}
    </button>
  );
}
