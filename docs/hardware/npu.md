---
title: Dual NPU
description: Neural processing units.
sidebar: { order: 2 }
---

Two independent NPUs mapped onto the primary memory grid, designed for quantization (INT4, FP4, block minifloats) and sparse-tensor research.

:::caution[Draft]
Register map below is a placeholder until the RTL is published.
:::

## `NPUx_CTRL` (base `0x4000_0000`, NPU1 at `+0x1000`)

| Bits | Field | Access | Description |
|---|---|---|---|
| `[0]` | `ENABLE` | RW | Start the unit |
| `[3:1]` | `DTYPE` | RW | 0=INT8, 1=INT4, 2=FP16, 3=FP8, 4=FP4 |
| `[7:4]` | `SPARSITY_MODE` | RW | Structured sparsity pattern |
| `[15:8]` | `TILE_DIM` | RW | Tile edge length |
| `[31]` | `BUSY` | RO | Unit busy |
