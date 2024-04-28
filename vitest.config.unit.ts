import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/tests/unit/**/*.test.ts'],
    fileParallelism: false,
    coverage: {
      provider: 'v8',
      reportsDirectory: 'src/tests/unit/coverage',
      exclude: ['src/tests/**/*', 'prisma/**/*']
    }
  }
});
