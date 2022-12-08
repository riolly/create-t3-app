module.exports = {
  // extends: ['gitmoji'], // It's up to you wether you want emoji or not
  rules: {
    'header-max-length': [0, 'always', 100],
    'scope-case': [0, 'always', 'pascal-case'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'chore',
        'wip',
        'change',
      ],
    ],
  },
}
