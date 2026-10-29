---
title: Photonic Compute API
description: Programming the G100 photonic tensor accelerator.
sidebar: { order: 2 }
---

The GCA SDK provides explicit intrinsics that route general matrix multiplications (GEMM) into the analog electro-optic chiplet.

## The photonic memory pipeline

Operands are staged in SRAM clusters next to the optical array before each multiply.

```cpp
#include <gca_photonic.h>

void run_optical_matmul() {
    gcaPhotonicMatrix_t matA, matB, matC;

    gcaPhotonicMalloc(&matA, 64, 64);
    gcaPhotonicMalloc(&matB, 64, 64);
    gcaPhotonicMalloc(&matC, 64, 64);

    gcaPhotonicMatMul(&matA, &matB, &matC, GCA_PHOTONIC_PRECISION_FP16);
    gcaPhotonicSync(&matC);
}
```

## Performance targets

:::caution[Pre-silicon targets]
These figures are design targets and will be updated with measured results.
:::

- **Latency:** < 4.2 ns per 64×64 tile
- **Datatypes:** FP16, INT8, and FP4/FP6 minifloats
