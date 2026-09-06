#!/usr/bin/env node
/**
 * Self-test for scripts/check-invariants.mjs. Run with: npm run check:selftest
 *
 * Mutation probe. A gate that has only ever been seen to pass is not known to
 * work. Break each new invariant on purpose, confirm the check goes red for the
 * right reason, then restore. Any failure to restore is loud.
 */
import { readFileSync, writeFileSync, copyFileSync, unlinkSync } from 'node:fs'
import { execSync } from 'node:child_process'

import { fileURLToPath } from 'node:url'
const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/[\/]$/, '')
const RAILWAY = ROOT + '/railway.json'
const PKG = ROOT + '/package.json'
const GITIGNORE = ROOT + '/.gitignore'

const backups = [
  [RAILWAY, RAILWAY + '.probe-bak'],
  [PKG, PKG + '.probe-bak'],
  [GITIGNORE, GITIGNORE + '.probe-bak'],
]
for (const [src, dst] of backups) copyFileSync(src, dst)

function check() {
  try {
    execSync('node scripts/check-invariants.mjs', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' })
    return { code: 0, out: '' }
  } catch (e) {
    return { code: e.status, out: (e.stdout || '') + (e.stderr || '') }
  }
}

function restore() {
  for (const [src, dst] of backups) copyFileSync(dst, src)
}

const cases = []
function probe(name, mutate, expectPattern) {
  mutate()
  const r = check()
  restore()
  const bit = r.code !== 0 && expectPattern.test(r.out)
  cases.push({ name, ok: bit, code: r.code, line: (r.out.match(expectPattern) || [''])[0].slice(0, 110) })
}

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))
const writeJson = (p, o) => writeFileSync(p, JSON.stringify(o, null, 2) + '\n')

probe('railway.json is unparseable', () => {
  writeFileSync(RAILWAY, '{ this is not json')
}, /not valid JSON/)

probe('builder switched away from NIXPACKS', () => {
  const j = readJson(RAILWAY); j.build.builder = 'DOCKERFILE'; writeJson(RAILWAY, j)
}, /build\.builder must be NIXPACKS/)

probe('build command bypasses the invariant script', () => {
  const j = readJson(RAILWAY); j.build.buildCommand = 'next build'; writeJson(RAILWAY, j)
}, /buildCommand must be "npm run build"/)

probe('prebuild hook emptied while build command stays correct', () => {
  const p = readJson(PKG); p.scripts.prebuild = 'echo skip'; writeJson(PKG, p)
}, /prebuild no longer runs check-invariants/)

probe('start command drifts from the package script', () => {
  const j = readJson(RAILWAY); j.deploy.startCommand = 'npx next start'; writeJson(RAILWAY, j)
}, /startCommand must be "npm start"/)

probe('a port is pinned in the package start script', () => {
  const p = readJson(PKG); p.scripts.start = 'next start -p 3000'; writeJson(PKG, p)
}, /pins a port/)

probe('health check points at a route that does not exist', () => {
  const j = readJson(RAILWAY); j.deploy.healthcheckPath = '/healthz'; writeJson(RAILWAY, j)
}, /is not a route this app serves/)

probe('engines.node removed', () => {
  const p = readJson(PKG); delete p.engines; writeJson(PKG, p)
}, /declares no engines\.node/)

probe('engines.node set to a different major than the build host', () => {
  const p = readJson(PKG); p.engines = { node: '18.x' }; writeJson(PKG, p)
}, /does not satisfy package\.json engines\.node/)

// The four below were all found by code review AFTER the first ten passed.
// Every one of them was a state in which check-invariants printed OK while the
// deployment config was broken. They are the reason this file is committed.
probe('railway.json is valid JSON but semantically empty (null)', () => {
  writeFileSync(RAILWAY, 'null')
}, /must contain a JSON object/)

probe('railway.json is a bare number', () => {
  writeFileSync(RAILWAY, '0')
}, /must contain a JSON object/)

probe('health check path removed entirely', () => {
  const j = readJson(RAILWAY); delete j.deploy.healthcheckPath; writeJson(RAILWAY, j)
}, /no deploy\.healthcheckPath/)

probe('replica count raised above one, silently weakening the rate limit', () => {
  const j = readJson(RAILWAY); j.deploy.numReplicas = 4; writeJson(RAILWAY, j)
}, /numReplicas must be 1/)

probe('engines.node written as a range this check cannot compare', () => {
  const p = readJson(PKG); p.engines = { node: '>=20 <23' }; writeJson(PKG, p)
}, /must be exactly "<major>\.x"/)

probe('gitignore stops excluding internal notes', () => {
  const g = readFileSync(GITIGNORE, 'utf8').split(/\r?\n/).filter((l) => l.trim() !== '.claude/').join('\n')
  writeFileSync(GITIGNORE, g)
}, /no longer excludes \.claude/)

// Clean up the backups and confirm the real files are intact.
for (const [, dst] of backups) unlinkSync(dst)
const final = check()

console.log('')
for (const c of cases) {
  console.log(`${c.ok ? 'BITES ' : 'BLIND '} ${c.name}${c.ok ? '' : `   (exit ${c.code}, no matching message)`}`)
  if (c.ok) console.log(`         -> ${c.line}`)
}
const blind = cases.filter((c) => !c.ok).length
console.log('')
console.log(`mutation probe: ${cases.length - blind} of ${cases.length} checks bite, ${blind} blind`)
console.log(`repo restored and green: ${final.code === 0}`)
process.exit(blind === 0 && final.code === 0 ? 0 : 1)
