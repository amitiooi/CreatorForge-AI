import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import nextConfig from '../next.config.mjs'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))

async function headersFor(environment) {
  const original = process.env.NODE_ENV
  process.env.NODE_ENV = environment

  try {
    const routes = await nextConfig.headers()
    assert.equal(routes.length, 1)
    assert.equal(routes[0].source, '/:path*')
    const headers = routes[0].headers
    assert.equal(new Set(headers.map(({ key }) => key.toLowerCase())).size, headers.length)
    return Object.fromEntries(headers.map(({ key, value }) => [key, value]))
  } finally {
    if (original === undefined) delete process.env.NODE_ENV
    else process.env.NODE_ENV = original
  }
}

test('baseline response headers apply to every route', async () => {
  const headers = await headersFor('development')
  assert.equal(headers['X-Content-Type-Options'], 'nosniff')
  assert.equal(headers['Referrer-Policy'], 'strict-origin-when-cross-origin')
  assert.equal(headers['Permissions-Policy'], 'camera=(), microphone=(), geolocation=()')
})

test('HSTS is limited to production and does not claim subdomains', async () => {
  const developmentHeaders = await headersFor('development')
  const productionHeaders = await headersFor('production')
  assert.equal(developmentHeaders['Strict-Transport-Security'], undefined)
  assert.equal(productionHeaders['Strict-Transport-Security'], 'max-age=63072000')
})

test('build errors are not suppressed and framework identification is disabled', () => {
  assert.notEqual(nextConfig.typescript?.ignoreBuildErrors, true)
  assert.equal(nextConfig.poweredByHeader, false)
})

test('Git excludes environment secrets and permits only the safe example', () => {
  const protectedPaths = [
    '.env',
    '.env.local',
    '.env.production',
    '.env.development.local',
    'nested/.env.local',
    'private.key',
    'certificate.pem',
    '.npmrc',
  ]
  const ignored = execFileSync('git', ['check-ignore', '--no-index', '--stdin'], {
    cwd: projectRoot,
    input: [...protectedPaths, '.env.example'].join('\n') + '\n',
    encoding: 'utf8',
  }).trim().split('\n')

  assert.deepEqual(ignored, protectedPaths)
})
