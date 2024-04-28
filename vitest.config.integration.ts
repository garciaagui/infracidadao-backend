import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/tests/integration/**/*.test.ts'],
    setupFiles: ['src/tests/helpers/setup.ts'],
    fileParallelism: false,
    coverage: {
      provider: 'v8',
      reportsDirectory: 'src/tests/integration/coverage',
      exclude: ['src/tests/**/*', 'prisma/**/*']
    }
  }
});
