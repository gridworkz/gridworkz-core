---
title: Gridworkz Documentation
description: RTL architecture, register maps, toolchain setup and the GCA SDK.
---

Gridworkz is an open-source heterogeneous compute platform: a **quad-core RISC-V64 host**, **dual edge NPUs**, and the **G100 GPU** with a co-packaged **photonic tensor accelerator chiplet**. All RTL, compilers and runtime code are Apache 2.0.

## Where to start

- **Run something now:** [GCA SDK quickstart](/docs/sdk/quickstart)
- **Program the photonic chiplet:** [Photonic compute API](/docs/sdk/photonic-compute)
- **Read the hardware:** [RISC-V64 host](/docs/hardware/riscv64) · [NPU](/docs/hardware/npu) · [G100](/docs/hardware/g100) · [Pinout](/docs/hardware/pinout)

## Repository layout

```text
gridworkz-core/
├── hw/
│   ├── rtl/          # riscv64/, npu/, photonic_g100/
│   ├── sim/          # verilator/, cocotb/
│   └── boards/       # FPGA constraints & pin mappings
├── sdk/
│   ├── gca-compiler/ # LLVM backend
│   ├── gca-runtime/  # bare-metal runtime APIs
│   ├── include/      # gca.h, gca_photonic.h
│   ├── lib/          # gblas
│   └── examples/
└── docs/
```
