"use client";
export default function Comment({ comment }: { comment: string }) {
  return (
    <div
      ref={(e) => {
        e?.replaceWith(document.createComment(comment));
      }}
    ></div>
  );
}
