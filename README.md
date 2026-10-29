<p align="center">
  <b>G R I D W O R K Z</b><br>
  <i>Open Silicon. No NDAs. No Licensing Fees.</i>
</p>

<p align="center">
  <a href="https://gridworkz.com">Website</a> ·
  <a href="#-architecture">Architecture</a> ·
  <a href="#-quickstart">Quickstart</a> ·
  <a href="#-the-gca-sdk">GCA SDK</a> ·
  <a href="https://gridworkz.com/docs">Docs</a>
</p>

---

# Gridworkz Heterogeneous Compute Platform

Gridworkz is a fully open-source hardware ecosystem built to break down proprietary vendor silos. We are building **the Linux of chip design**: giving university labs, AI researchers and systems architects bare-metal access to next-generation hardware.

This repository will hold the complete synthesizable RTL and software toolchain for the Gridworkz development platform: a **64-bit quad-core RISC-V host, dual edge NPUs, and the G100 GPU with a co-packaged photonic tensor accelerator chiplet**.

> [!NOTE]
> **Status: early development.** The repository structure, contribution process and documentation are in place. RTL, simulation targets and the SDK are being published in stages. Watch or star the repo to follow along.

---

## 🔬 Architecture

```text
+---------------------------------------------------------+
|                 GRIDWORKZ DEV PLATFORM                  |
|                                                         |
|   +-------------------+         +-------------------+   |
|   |   Quad-Core       |   CXL   |   Dual Edge NPU   |   |
|   |   RISC-V64 Block  |<=======>|   Subsystem       |   |
|   |   (Open Silicon)  |   Bus   |   (Bare-Metal)    |   |
|   +-------------------+         +-------------------+   |
|             ^                             ^             |
|             +--------------+--------------+             |
|                            |                            |
|                            v                            |
|   +-------------------------------------------------+   |
|   |                    G100 GPU                     |   |
|   |  +-------------------------------------------+  |   |
|   |  |     PHOTONIC TENSOR ACCELERATOR CHIPLET   |  |   |
|   |  |    (Laser-Driven Matrix Multiplication)   |  |   |
|   |  +-------------------------------------------+  |   |
|   +-------------------------------------------------+   |
+---------------------------------------------------------+
```

### 1. Host compute (RISC-V64)
- Quad-core, out-of-order 64-bit RISC-V (RV64GC).
- No secret microcode, no black-box security enclaves. Built for OS research, custom vector extensions and bare-metal compilation work.

### 2. Deep learning accelerators (dual NPUs)
- Two independent neural processing units mapped onto the primary memory grid.
- Designed for hardware-level research on quantization (INT4, FP4, block minifloats), sparse tensor indexing and custom activation functions.

### 3. Electro-optic accelerator (G100 GPU + photonic tensor chiplet)
- G100 compute cluster coupled to an analog photonic tensor array.
- Performs matrix-matrix multiplication (GEMM) by routing laser light through silicon waveguides.

---

## ⚡ Quickstart

> [!IMPORTANT]
> **Coming soon.** The simulation target below is not published yet. `make sim` currently prints a status message instead of running. The commands are shown so you can see what the workflow will look like.

You will **not** need a proprietary EDA license. The whole platform is designed to build and simulate on a laptop with open-source tools.

**1. Install dependencies** (Ubuntu / Debian)

```bash
sudo apt-get update
sudo apt-get install -y clang-18 llvm-18 verilator build-essential git python3-pip
```

**2. Clone**

```bash
git clone https://github.com/gridworkz/gridworkz-core.git
cd gridworkz-core
```

**3. Run the photonic matrix-multiply simulation**

```bash
make sim TARGET=verilator WORKLOAD=photonic_matmul_64
```

---

## 💾 The GCA SDK

**GCA (Gridworkz Compute Architecture)** is an open, CUDA-style parallel programming framework. If you can write CUDA or HIP, you will be able to write kernels for Gridworkz.

```cpp
#include <gca.h>

// Maps onto the quad-core RISC-V threads
__global__ void vectorAdd(float* A, float* B, float* C, int N) {
    int idx = gca_blockIdx_x * gca_blockDim_x + gca_threadIdx_x;
    if (idx < N) C[idx] = A[idx] + B[idx];
}

int main() {
    int N = 1024;
    size_t size = N * sizeof(float);

    float *d_A, *d_B, *d_C;
    gcaMalloc((void**)&d_A, size);
    gcaMalloc((void**)&d_B, size);
    gcaMalloc((void**)&d_C, size);

    vectorAdd<<<4, 256>>>(d_A, d_B, d_C, N);
    gcaDeviceSynchronize();

    gcaFree(d_A); gcaFree(d_B); gcaFree(d_C);
    return 0;
}
```

```bash
gcacc vector_add.gca -o vector_add --target=sim_verilator
./vector_add
```

---

## 📂 Repository layout

```text
gridworkz-core/
├── hw/                     # HARDWARE
│   ├── rtl/                # Synthesizable SystemVerilog / Verilog
│   │   ├── riscv64/        # Quad-core RV64 host
│   │   ├── npu/            # Dual NPUs
│   │   └── photonic_g100/  # G100 GPU + photonic chiplet logic
│   ├── sim/
│   │   ├── verilator/      # C++ simulation targets
│   │   └── cocotb/         # Python verification benches
│   └── boards/             # FPGA constraints & pin mappings
├── sdk/                    # SOFTWARE
│   ├── gca-compiler/       # LLVM-based kernel compiler (gcacc)
│   ├── gca-runtime/        # Bare-metal runtime APIs
│   ├── include/            # gca.h, gca_photonic.h
│   ├── lib/                # gblas math library
│   └── examples/           # Sample kernels
├── docs/                   # Docs in Markdown (published at gridworkz.com/docs)
├── website/                # gridworkz.com (Astro + Starlight)
├── deploy/                 # Web server config and deploy guide
└── Makefile
```

---

## 🎓 Academic allocations & physical boards

Ready to go from simulation to real hardware? We supply FPGA evaluation kits to qualified university labs and public research teams.

Request an allocation at **[gridworkz.com/labs](https://gridworkz.com/labs)**.

---

## 🤝 Contributing

We welcome contributions from university labs, silicon engineers, compiler researchers and open-source developers. See [CONTRIBUTING.md](CONTRIBUTING.md). All commits must be signed off (`git commit -s`).

## 📄 License

Gridworkz is licensed under the [Apache License, Version 2.0](LICENSE). You are free to modify, fork, simulate and tape out commercial versions of this code.
