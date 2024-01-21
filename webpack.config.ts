import * as webpack from 'webpack';

const config: (env: any) => webpack.Configuration = (env) => {
  return {
    mode: 'production',
    entry: { 'test.js': './test.ts' },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          exclude: /(^|\/)node_modules\//,
          use: [{ loader: 'ts-loader' }]
        }
      ]
    }
  };
};

export default config;