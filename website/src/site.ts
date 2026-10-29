// Single place for links and facts that are still being confirmed.
export const site = {
  name: 'Gridworkz',
  domain: 'gridworkz.com',
  repo: 'https://github.com/gridworkz/gridworkz-core',
  repoSlug: 'gridworkz/gridworkz-core',
  // Where the hardware lives. Hardware links (navbar, clone buttons, RTL
  // source) point here; the website and docs stay in `repo` above.
  githubOrg: 'https://github.com/kubeworkz',
  hw: {
    soc: 'https://github.com/kubeworkz/grx930', // RISC-V SoC: CPU + NPUs
    gpu: 'https://github.com/kubeworkz/grxgpu', // G100 GPU + photonic tensor accelerator
    sdk: 'https://github.com/kubeworkz/grxcp',  // GRXCP compute platform (CUDA-style SDK)
  },
  version: 'v1.0.0-beta',
  contactEmail: 'dave@gridworkz.com',
  // Live GitHub stats bar under the homepage hero. Turn on once the numbers
  // help rather than hurt (a few dozen stars and some outside contributors).
  showRepoStats: false,
  // Workflow file whose successful runs on main count as "verified builds",
  // e.g. 'verify.yml'. Leave empty until RTL verification runs in CI; the
  // tile is hidden until then.
  verifyWorkflow: '',
};
