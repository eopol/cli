import consola from 'consola'
import chalk from 'chalk'
import { PKG_PREFIX } from '@eo-cli-pro/constants'
import type { Consola, ConsolaLogObject, logType } from 'consola'
import type { ColorName } from 'chalk'

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

type LogInfoKey = Exclude<logType, 'silent' | 'verbose'>

interface LogInfoValue {
  emoji: string
  color: ColorName
  textBold: boolean
}

const LOG_INFO: Record<LogInfoKey, LogInfoValue> = {
  fatal: {
    emoji: '',
    color: 'red',
    textBold: true,
  },
  error: {
    emoji: '',
    color: 'red',
    textBold: true,
  },
  warn: {
    emoji: '',
    color: 'yellow',
    textBold: true,
  },
  log: {
    emoji: '📝',
    color: 'white',
    textBold: true,
  },
  info: {
    emoji: '👀',
    color: 'cyan',
    textBold: true,
  },
  start: {
    emoji: '🚗',
    color: 'magenta',
    textBold: true,
  },
  success: {
    emoji: '🎉',
    color: 'green',
    textBold: true,
  },
  ready: {
    emoji: '🎯',
    color: 'blue',
    textBold: true,
  },
  debug: {
    emoji: '🔎',
    color: 'gray',
    textBold: true,
  },
  trace: {
    emoji: '🔎',
    color: 'gray',
    textBold: true,
  },
}

const LOGGER_LEVEL = LogLevel['Info']
const CONSOLA_OPTIONS: Record<string, any> = {
  level: LOGGER_LEVEL,
  defaults: {
    badge: true,
  },
}

let ConsolaInstance = consola.create(CONSOLA_OPTIONS)

export function logCreator(param: {
  openEmoji?: boolean
  emojiPos?: 'prev' | 'post'
  pkgName?: string
}): Consola {
  const { openEmoji = false, emojiPos = 'post', pkgName } = param
  if (pkgName) {
    ConsolaInstance = ConsolaInstance.withTag(`${PKG_PREFIX}/${pkgName}`)
  } else {
    ConsolaInstance = ConsolaInstance.withTag(`${PKG_PREFIX}`)
  }

  for (const [type, info] of Object.entries(LOG_INFO)) {
    const _logType = type as LogInfoKey
    const { emoji, color, textBold } = info
    const originHandle = ConsolaInstance[_logType]
    ConsolaInstance[_logType] = (message: ConsolaLogObject | any) => {
      let content = message
      if (openEmoji && emoji) {
        if (emojiPos === 'post') {
          content = `${content} ${emoji}`
        } else {
          content = `${emoji} ${content}`
        }
      }

      let _chalk = chalk
      if (color) {
        _chalk = _chalk[color]
      }
      if (textBold) {
        _chalk = _chalk['bold']
      }

      originHandle(_chalk(content))
    }
  }

  return ConsolaInstance
}

export function logOptionSetter(param: {
  levelName: 'Info' | 'Verbose'
}): void {
  const { levelName } = param
  ConsolaInstance.level = LogLevel[levelName]
}
