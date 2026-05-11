export const formatPrice = (price: number, currency: "USD" | "EUR" | "TRY" = "USD") => {
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "₺";
  if (price >= 1_000_000) return `${symbol}${(price / 1_000_000).toFixed(2)}M`;
  if (price >= 1_000) return `${symbol}${(price / 1_000).toFixed(0)}K`;
  return `${symbol}${price.toLocaleString()}`;
};

export const formatArea = (m2: number) => `${m2.toLocaleString()} m²`;
