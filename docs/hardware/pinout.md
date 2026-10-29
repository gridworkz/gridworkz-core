---
title: Board Pinout
description: Evaluation board connectors and pin mapping.
sidebar: { order: 4 }
---

:::note
Pin mappings will be generated from `hw/boards/` constraint files once the board design is published.
:::

| Header | Pin | Signal | Notes |
|---|---|---|---|
| J1 | 1 | `UART0_TX` | Host console, 115200 8N1 |
| J1 | 2 | `UART0_RX` | |
| J2 | 1–20 | `JTAG_*` | RISC-V debug module |
| J5 | — | PCIe x8 | Host attach |
