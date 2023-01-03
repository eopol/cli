import importLocal from 'import-local'
import chalk from 'chalk'
import consola from 'consola'
import core from './lib'

if (importLocal(import.meta.url)) {
  consola.info(chalk.green('正在使用本地版本'))
} else {
  core(process.argv.slice(2))
}
