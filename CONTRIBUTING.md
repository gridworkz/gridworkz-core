# Contributing to Gridworkz

Thank you for helping build the Linux of chip design! We welcome contributions from university labs, silicon engineers, compiler researchers and open-source developers.

Gridworkz spans hardware RTL and a software SDK, so we use a structured process to keep every change synthesizable.

## 🛠️ Where you can contribute

- **Hardware (`/hw`):** RISC-V vector extensions, NPU matrix block optimizations, memory controller fixes, FPGA constraint files.
- **Software SDK (`/sdk`):** GCA compiler optimizations, runtime improvements, new example kernels, `gblas` math library work.
- **Verification (`/hw/sim`):** More Verilator testbench coverage, `cocotb` test configurations.
- **Documentation (`/docs`):** Register maps, hardware tutorials, API references.

## 🚀 Branching & submission

1. **Fork the repository** and branch off `main` (e.g. `feature/riscv-vector-ext` or `bugfix/gca-malloc-leak`).
2. **Run the checks locally** before opening a pull request:
   ```bash
   make test-hw-all    # Hardware RTL verification
   make test-sdk-all   # SDK verification
   ```
   > These targets are placeholders until the first RTL and SDK drops land.
3. **Open a pull request** against `main`. Describe the change, its architectural effects, and attach verification logs or waveforms.

## 📐 Code & design standards

### Hardware RTL
- All code in `/hw/rtl` must be synthesizable **SystemVerilog** or **Verilog**.
- No vendor-specific primitives (e.g. Xilinx/Intel macros) in core files. The platform must stay foundry-neutral.
- Code must compile warning-free under **Verilator**.

### Software SDK
- Follow modern **C++17** for compiler infrastructure.
- New GCA APIs must match the style and semantics of `sdk/include/gca.h`.

## 📜 Developer Certificate of Origin (DCO)

To keep the codebase free from legal disputes, every commit must be signed off with `-s`:

```bash
git commit -s -m "hw/riscv: Optimize instruction decode stage"
```

This adds `Signed-off-by: Your Name <your@email.com>` and certifies, under the [Developer Certificate of Origin](https://developercertificate.org/), that you have the right to submit the work under the Apache 2.0 license.
