import assert from "node:assert/strict";
import test from "node:test";
import { toggleQuoteLike } from "../lib/quote-likes";

const quotes = [
  { quote: "First", author: "Author", likedBy: ["auth0|other"] },
  { quote: "Second", author: "Author", likedBy: [] },
];

test("visitors cannot add likes", () => {
  assert.strictEqual(toggleQuoteLike(quotes, 0), quotes);
});

test("liking records the current user without changing other users or quotes", () => {
  const updated = toggleQuoteLike(quotes, 0, "auth0|current");
  assert.deepEqual(updated[0].likedBy, ["auth0|other", "auth0|current"]);
  assert.strictEqual(updated[1], quotes[1]);
  assert.deepEqual(quotes[0].likedBy, ["auth0|other"]);
});

test("unliking removes only the current user's ID", () => {
  const liked = toggleQuoteLike(quotes, 0, "auth0|current");
  const unliked = toggleQuoteLike(liked, 0, "auth0|current");
  assert.deepEqual(unliked[0].likedBy, ["auth0|other"]);
  assert.equal(unliked.filter(quote => quote.likedBy.includes("auth0|current")).length, 0);
  assert.equal(unliked.filter(quote => quote.likedBy.includes("auth0|other")).length, 1);
});
