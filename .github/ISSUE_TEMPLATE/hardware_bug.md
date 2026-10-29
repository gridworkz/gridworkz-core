---
name: "🏗️ Hardware / RTL Bug Report"
about: Report synthesis errors, simulation failures, or register misbehavior in the silicon core.
title: "[HW] "
labels: ["bug", "hardware-rtl"]
assignees: ''
---

### 🔍 Block affected
- [ ] Host core (RISC-V64)
- [ ] Neural Processing Unit (NPU)
- [ ] G100 GPU / photonic interconnect
- [ ] Verification testbench / toolchain

### 📝 Description
A clear and concise description of the defect or simulation failure.

### 💻 Environment
- **OS:** (e.g. Ubuntu 24.04)
- **Verilator version:** (e.g. v5.024)
- **Target board / FPGA (if applicable):** (e.g. AMD Kintex UltraScale+)

### ⚙️ Steps to reproduce
```bash
make sim TARGET=verilator WORKLOAD=YOUR_WORKLOAD_HERE
```

### 📊 Expected vs. actual
- **Expected:** what the registers or waveforms should show.
- **Actual:** what the simulator or console returns (attach a snippet or a `.vcd` trace link if possible).
