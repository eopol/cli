import { join, resolve } from 'node:path'
import chalk from 'chalk'
// import consola from 'consola'
import semver from 'semver'
import rootCheck from 'root-check'
import minimist from 'minimist'
import dotenv from 'dotenv'
import {
  getNpmInfoVersions,
  logCreator,
  logOptionSetter,
  pathExistsSync,
  userHome,
} from '@eo-cli-pro/utils'
import {
  DEFAULT_ENV_CLI_HOME,
  LOWEST_NODE_VERSION as lowestVersion,
} from '@eo-cli-pro/constants'
import pkg from '../package.json'

// require: .js/.json/.node
// .js => module.exports/exports
// .json => JSON.parse
// .node => c++ addons 扩展插件通过 preocess.dlopen 运行
// 其他 => 默认都走 .js 解析器
// .wasm => 新增实验特性
// const pkg = require('../package.json')
// const readme = require('../README.md')

/* 日志实例 */
const log = logCreator('cli')

async function core(args: string[]) {
  // log.info(chalk.green('core exec'))
  try {
    checkPkgVersion()
    checkNodeVersion()
    checkRoot()
    checkUserHome()
    checkInputArgs()
    checkEnv()
    await checkCliVersion()
  } catch (error: any) {
    log.error(error.message)
  }
}

/**
 * @description
 * 如果用户本地使用的是老版本脚手架，这里要进行提示说发现新版本
 * 1. 获取当前版本号和包名
 * 2. 调用 npm api，获取该包下包含所有版本号的列表
 * 3. 提取全部版本号并进行比对
 * 4. 获取最新版本号提示用户更新
 */
async function checkCliVersion() {
  const currentVersion = pkg.version
  // const currentName = pkg.name
  const currentName = '@google-translate-select/vue3'
  const versions = await getNpmInfoVersions(currentName)
  if (versions) {
    console.log(versions)
  }
}

/**
 * @description
 * 将敏感信息保存在环境变量中而不是写死在代码里
 * 1. 从 .env 文件中读取配置并加载进入环境变量
 */
function checkEnv() {
  const path = resolve(userHome, '.env')
  if (pathExistsSync(path)) {
    dotenv.config({
      path: resolve(userHome, '.env'),
    })
  }

  createDefaultEnv()
  log.debug(chalk.blue.bold(`本机脚手架缓存地址：${process.env.CLI_HOME}`))
}

/**
 * @description 如果本机 userhome 下无配置文件需要生成一份提供给脚手架使用
 */
function createDefaultEnv() {
  const config: Record<string, any> = {
    home: userHome,
  }

  if (process.env.CLI_HOME) {
    config['cliHome'] = join(userHome, process.env.CLI_HOME)
  } else {
    config['cliHome'] = join(userHome, DEFAULT_ENV_CLI_HOME)
  }

  process.env.CLI_HOME = config.cliHome
  return config
}

/**
 * @description 检查脚手架入参
 * @example
  ```
  console.log(minimist(process.argv.slice(2)));
  // => { _: [], debug: true }
  ```
 */
function checkInputArgs() {
  const args = minimist(process.argv.slice(2))
  checkDebugArg(args)
}

/**
 * @description
 * 满足 --debug 模式，开启 debug 模式后，日志会全部展示
 * 1. 根据传入的参数来确定 log 的级别
 * @param args minimist 解析后的参数
 */
function checkDebugArg(args: minimist.ParsedArgs) {
  if (args.debug) {
    process.env.LOG_LEVEL = 'Verbose'
  } else {
    process.env.LOG_LEVEL = 'Info'
  }

  logOptionSetter({
    levelName: process.env.LOG_LEVEL,
  })
}

/**
 * @description
 * 记录用户主目录，方便文件/缓存操作。mac 下为：/Users/i7eo
 * - 跨操作系统获取用户主目录
 * - 删除 user-home 依赖，使用详情见：https://github.com/sindresorhus/user-home#readme
 */
function checkUserHome() {
  if (!userHome || !pathExistsSync(userHome)) {
    throw new Error(chalk.red.bold(`当前用户主目录不存在！`))
  }
}

/**
 * @description
 * 检查 root 权限，避免普通用户修改不了 root 用户创建的文件
 * 1. 使用 root-check 将 root 用户降级为普通用户
 * 2. 使用 process.geteuid() 来判断是普通（501）/root（0）用户
 */
function checkRoot() {
  rootCheck()
}

/**
 * @description
 * 检查 node 版本号，避免某些方法不兼容不同的版本
 * 1. 获取当前 node 版本号
 * 2. 对比最低版本号
 */
function checkNodeVersion() {
  const currentVersion = process.version

  if (!semver.gte(currentVersion, lowestVersion)) {
    throw new Error(
      chalk.red.bold(`需要安装 v${lowestVersion} 以上版本的 Node.js`)
    )
  }
}

/**
 * @description 输出当前脚手架版本号
 */
function checkPkgVersion() {
  log.info(chalk.green.bold(`Cli ${pkg.version}`))
}

export default core
