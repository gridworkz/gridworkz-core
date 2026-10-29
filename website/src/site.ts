// Single place for links and facts that are still being confirmed.
export const site = {
  name: 'Gridworkz',
  domain: 'gridworkz.com',
  repo: 'https://github.com/gridworkz/gridworkz-core',
  repoSlug: 'gridworkz/gridworkz-core',
  // GitHub button in the top navbar.
  githubOrg: 'https://github.com/kubeworkz',
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
