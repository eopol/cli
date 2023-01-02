import chalk from 'chalk'
import consola from 'consola'

function core(argvs: string[]) {
  consola.info(chalk.green('core exec'))
  // consola.info(chalk.green(argvs))
}

export default core
