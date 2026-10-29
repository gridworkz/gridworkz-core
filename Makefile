# Gridworkz top-level build.
# Targets are placeholders until the first RTL and SDK drops are published.

TARGET   ?= verilator
WORKLOAD ?= photonic_matmul_64

.PHONY: help sim test-hw-all test-sdk-all

help:
	@echo "Gridworkz build targets:"
	@echo "  make sim TARGET=verilator WORKLOAD=<name>   Run a simulation (coming soon)"
	@echo "  make test-hw-all                            Run all RTL tests (coming soon)"
	@echo "  make test-sdk-all                           Run all SDK tests (coming soon)"

define coming_soon
	@echo ""
	@echo "  [gridworkz] '$(1)' is not available yet."
	@echo "  The RTL and simulation targets are being published in stages."
	@echo "  Watch https://github.com/gridworkz/gridworkz-core for the first release."
	@echo ""
endef

sim:
	$(call coming_soon,sim TARGET=$(TARGET) WORKLOAD=$(WORKLOAD))

test-hw-all:
	$(call coming_soon,test-hw-all)

test-sdk-all:
	$(call coming_soon,test-sdk-all)
