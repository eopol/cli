export async function getNpmInfo(name: string, registry?: string) {
  if (!name) return null
  const npmRegistry = registry ?? getDefaultRegistry()
  const url = new URL(`${npmRegistry}/${name}`)

  try {
    let data: Record<string, any> | null = null
    const res = await fetch(url)
    if (res.ok) {
      data = await res.json()
    }
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

function getDefaultRegistry(isOrigin = false) {
  return isOrigin
    ? 'https://registry.npmjs.org'
    : 'https://registry.npmmirror.com'
}

export async function getNpmInfoVersions(name: string, registry?: string) {
  const npmInfo = await getNpmInfo(name, registry)

  if (npmInfo) {
    return Object.keys(npmInfo.versions)
  } else {
    return []
  }
}

// export function getNpmLatestVersions(currentVersion: string, versions: string[]) {}
