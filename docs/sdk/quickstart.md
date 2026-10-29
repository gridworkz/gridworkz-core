---
title: GCA Quickstart
description: Compile and run your first GCA kernel in simulation.
sidebar: { order: 1 }
---

Get your first compute kernel running on Gridworkz using only open-source tools.

:::caution[Coming soon]
The simulator, `gcacc` compiler and runtime are not published yet. `make sim` currently prints a status message. This page shows what the workflow will look like.
:::

## Prerequisites

```bash
sudo apt-get update
sudo apt-get install -y clang-18 llvm-18 verilator build-essential git python3-pip
```

## Clone and build

```bash
git clone https://github.com/gridworkz/gridworkz-core.git
cd gridworkz-core
make sim TARGET=verilator WORKLOAD=photonic_matmul_64
```

## Your first kernel: `vector_add.gca`

GCA uses C++ syntax, with execution mapped onto the RISC-V, NPU and photonic blocks.

```cpp
#include <gca.h>

__global__ void vectorAdd(float* A, float* B, float* C, int N) {
    int idx = gca_blockIdx_x * gca_blockDim_x + gca_threadIdx_x;
    if (idx < N) C[idx] = A[idx] + B[idx];
}

int main() {
    int N = 1024;
    size_t size = N * sizeof(float);
    float *h_A = (float*)malloc(size), *h_B = (float*)malloc(size), *h_C = (float*)malloc(size);

    float *d_A, *d_B, *d_C;
    gcaMalloc((void**)&d_A, size);
    gcaMalloc((void**)&d_B, size);
    gcaMalloc((void**)&d_C, size);

    gcaMemcpy(d_A, h_A, size, gcaMemcpyHostToDevice);
    gcaMemcpy(d_B, h_B, size, gcaMemcpyHostToDevice);

    int threads = 256, blocks = (N + threads - 1) / threads;
    vectorAdd<<<blocks, threads>>>(d_A, d_B, d_C, N);

    gcaDeviceSynchronize();
    gcaMemcpy(h_C, d_C, size, gcaMemcpyDeviceToHost);
    gcaFree(d_A); gcaFree(d_B); gcaFree(d_C);
    return 0;
}
```

## Compile and run in simulation

```bash
gcacc vector_add.gca -o vector_add --target=sim_verilator
./vector_add
```
