# market-maker

Read the live clearing market for a fungible capacity class and post a bid or ask.

```bash
export COMMANDAGI_API_KEY=cagi_…
node index.mjs vm.gpu-l4 bid 24 1     # willing to pay ≤ 24 credits/min for 1 GPU slot
node index.mjs vm.gpu-l4 ask 30 2     # offering 2 slots at ≥ 30 credits/min
```

Orders clear by price-time priority at the resting order's price; a fill against a seller's fleet
listing becomes a redeemable lease at that price. Watch the book live at
`https://commandagi.com/market/class/vm.gpu-l4`. Docs: https://commandagi.com/docs/market
