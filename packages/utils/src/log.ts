import consola from 'consola'
import { PKG_PREFIX } from '@eo-cli-pro/constants'
import type { Consola } from 'consola'

// copy from consola LogLevel
enum LogLevel {
  Fatal = 0,
  Error = 0,
  Warn = 1,
  Log = 2,
  Info = 3,
  Success = 3,
  Debug = 4,
  Trace = 5,
  Silent = -Infinity,
  Verbose = Infinity,
}

const LOGGER_LEVEL = LogLevel['Info']

let ConsolaInstance = consola.create({
  level: LOGGER_LEVEL,
})

export function logCreator(pkgName?: string): Consola {
  if (pkgName) {
    ConsolaInstance = ConsolaInstance.withTag(`${PKG_PREFIX}/${pkgName}`)
  } else {
    ConsolaInstance = ConsolaInstance.withTag(`${PKG_PREFIX}`)
  }
  return ConsolaInstance
}

export function logOptionSetter(param: {
  levelName: 'Info' | 'Verbose'
}): void {
  const { levelName } = param
  ConsolaInstance.level = LogLevel[levelName]
}
