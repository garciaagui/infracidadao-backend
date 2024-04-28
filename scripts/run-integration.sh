#!/usr/bin/env bash
# Before execute, run: chmod +x scripts/*

DIR="$(cd "$(dirname "$0")" && pwd)"
source "$DIR/setenv.sh"
docker-compose up -d
echo '🟡 - Waiting for database to be ready...'
"$DIR/wait-for-it.sh" "${DATABASE_URL}" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
ts-node --transpile-only prisma/helpers/seed.ts
if [ "$#" -eq 0 ]; then
    vitest -c "./vitest.config.integration.ts"
else
    vitest -c "./vitest.config.integration.ts" --ui --coverage.enabled=true
fi
