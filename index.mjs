#!/usr/bin/env node
// Read the live order book for a fungible class and post a bid or ask.
// Usage: COMMANDAGI_API_KEY=cagi_… node index.mjs <resourceClass> <bid|ask> <pricePerMin> [qty]
//   e.g. node index.mjs vm.gpu-l4 bid 24 1

const API = process.env.COMMANDAGI_API_URL ?? "https://api.commandagi.com";
const KEY = process.env.COMMANDAGI_API_KEY;
if (!KEY) throw new Error("Set COMMANDAGI_API_KEY (https://commandagi.com/api-keys)");

const rc = process.argv[2] ?? "vm.gpu-l4";
const side = process.argv[3] ?? "bid"; // bid (buy) | ask (sell)
const price = Number(process.argv[4] ?? 24); // credits per minute
const qty = Number(process.argv[5] ?? 1);

async function api(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { authorization: `Bearer ${KEY}`, "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${text}`);
  return text ? JSON.parse(text) : {};
}

// 1. Look at the live market: best bid/ask, spread, utilization.
const { book, signals } = await api(`/market/${encodeURIComponent(rc)}`);
console.log(`${rc} — bid ${book.bestBid ?? "—"} / ask ${book.bestAsk ?? "—"} (spread ${book.spread ?? "—"}), `
  + `${Math.round((signals?.utilization ?? 0) * 100)}% utilized`);

// 2. Post your order. It clears immediately against any crossing resting orders (price-time
//    priority) and rests for the remainder. A fill against a seller's fleet becomes a lease you redeem.
const { trades } = await api(`/market/${encodeURIComponent(rc)}/orders`, {
  method: "POST",
  body: { side, price, qty },
});
console.log(trades.length ? `filled ${trades.length} trade(s)` : "resting on the book");
