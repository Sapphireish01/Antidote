"use client";

export default function NewsletterForm({ className, inputPlaceholder = "YOUR EMAIL ADDRESS" }) {
  return (
    <form className={className} onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        className="input-underlined input-underlined-stone"
        placeholder={inputPlaceholder}
        required
      />
      <button type="submit" className="btn btn-stone">
        Subscribe
      </button>
    </form>
  );
}
