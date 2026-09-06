#!/usr/bin/env node
/**
 * Production-mode server on port 4001 with FAKE tracking ids, for
 * scripts/verify-tracking.mjs --tagged. Builds into its own directory
 * (.next-tagged, see next.config.ts) so the normal .next build and the dev
 * server are untouched, then serves it with `next start`.
 *
 * Production mode on purpose: the dev server reloads a route once after its
 * first compile, which races the /book redirect and makes the tag checks
 * unreliable. The verify script blocks every request to Google and LinkedIn,
 * so the fake ids never leave the machine.
 */
import { spawnSync, spawn } from 'node:child_process'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const nextBin = require.resolve('next/dist/bin/next')

const env = {
  ...process.env,
  NEXT_PUBLIC_GTM_ID: 'GTM-TEST0000',
  NEXT_PUBLIC_LINKEDIN_PARTNER_ID: '0000000',
  NEXT_PUBLIC_LINKEDIN_BOOKING_CONVERSION_ID: '12345678',
  NEXT_DIST_DIR: '.next-tagged',
}

const build = spawnSync(process.execPath, [nextBin, 'build'], { stdio: 'inherit', env })
if (build.status !== 0) process.exit(build.status ?? 1)

const server = spawn(process.execPath, [nextBin, 'start', '-p', '4001'], { stdio: 'inherit', env })
server.on('exit', (code) => process.exit(code ?? 0))
