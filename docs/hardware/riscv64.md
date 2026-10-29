---
title: RISC-V64 Host
description: Quad-core RV64 host processor.
sidebar: { order: 1 }
---

Quad-core, out-of-order 64-bit RISC-V (RV64GC). No secret microcode and no black-box security enclaves.

:::caution[Draft]
Register map below is a placeholder until the RTL is published.
:::

## Control registers

| Offset | Name | Access | Description |
|---|---|---|---|
| `0x0000` | `HART_EN` | RW | Per-hart enable mask `[3:0]` |
| `0x0004` | `BOOT_ADDR` | RW | Reset vector |
| `0x0008` | `IRQ_ROUTE` | RW | External interrupt routing |
| `0x0010` | `PERF_CYCLES` | RO | Cycle counter (64-bit, low word) |
