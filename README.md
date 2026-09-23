# place-capacity-market-orders

Part of [CommandAGI](https://commandagi.com): connecting agents to real computers, robots and
physical environments. This repository can be cloned independently of the private platform code.

```sh
git clone https://github.com/CommandAGI/commandagi-example-place-capacity-market-orders.git
cd commandagi-example-place-capacity-market-orders
```

## Compatibility and validation

This is a focused reference example, not a production device runtime. The source and instructions
are public so integrations can be understood and adapted. Local syntax checks do not verify live
API compatibility. Some examples retain earlier session/device API contracts; inspect the calls in
the source against your target environment before running them. No live rental, order, paid compute
or hardware-motion test was performed as part of the repository rename.


Read the live clearing market for a fungible capacity class and post a bid or ask.

```bash
export COMMANDAGI_API_KEY=cagi_…
node index.mjs vm.gpu-l4 bid 24 1     # willing to pay ≤ 24 credits/min for 1 GPU slot
node index.mjs vm.gpu-l4 ask 30 2     # offering 2 slots at ≥ 30 credits/min
```

Orders clear by price-time priority at the resting order's price; a fill against a seller's fleet
listing becomes a redeemable lease at that price. Watch the book live at
`https://commandagi.com/market/class/vm.gpu-l4`. Docs: https://commandagi.com/docs/market

## License

[MIT](LICENSE).
