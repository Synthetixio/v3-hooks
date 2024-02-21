module.exports = {
  presets: [[require.resolve('@babel/preset-react'), { runtime: 'automatic' }]],

  env: {
    production: {
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            modules: false,
            targets: { browsers: ['last 1 Chrome version'] },
          },
        ],
      ],
    },

    development: {
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            modules: false,
            targets: { browsers: ['last 1 Chrome version'] },
          },
        ],
      ],
    },

    test: {
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            modules: 'commonjs',
            targets: { node: 'current' },
          },
        ],
      ],
    },
  },
};
