#!/usr/bin/env bash
# Before execute, run: chmod +x scripts/*

DIR="$(cd "$(dirname "$0")" && pwd)"
source "$DIR/setenv.sh"
docker-compose up -d
echo '🟡 - Waiting for database to be ready...'
"$DIR/wait-for-it.sh" "${DATABASE_URL}" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
ts-node --transpile-only prisma/helpers/seed.ts