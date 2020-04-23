// @ts-check

const path = require("path");
const fse = require("fs-extra");
const commander = require("commander");
const chalk = require("chalk");
const { spawnSync } = require("child_process");

/** 源项目编译后的 dist 目录 */
const DIST_PATH = path.join(__dirname, "../../../../dist");
/** 软连接创建路径 */
const DEST_PATH = path.join(__dirname, "../node_modules/sim-redux");
/** 判断是否是 windows */
const IS_WINDOWS = process.platform === "win32";

commander
  .command("create-link")
  .description("创建 dist 目录软链接到 node_modules/sim-redux 目录下")
  .action(createLink);

commander
  .command("install")
  .description(
    "依赖安装结束后, 自动创建 dist 目录软链接到 node_modules/sim-redux 目录下"
  )
  .action(install);

commander.parse(process.argv);

/** 创建 dist 目录软链接到 node_modules/sim-redux 目录下 */
async function createLink() {
  const isDistExists = await fse.pathExists(DIST_PATH);
  if (isDistExists) {
    if (!IS_WINDOWS) {
      spawnSync(`ln -s ${DIST_PATH} ${DEST_PATH}`, {
        shell: true,
        stdio: "inherit"
      });
    } else {
      console.log(
        chalk.red("暂不支持 windows 系统下调试, 请尝试在 wsl 环境下运行"),
        chalk.yellow("npm run link")
      );
    }
  } else {
    console.log(
      chalk.red("请先编译 sim-redux 源码到 dist 目录下, 再执行"),
      chalk.yellow("npm run link")
    );
  }
}

/** 依赖安装结束后, 自动创建 dist 目录软链接到 node_modules/sim-redux 目录下 */
async function install() {
  console.log(
    chalk.green("开始创建软链接到 node_modules/sim-redux 目录下 ...")
  );
  await createLink();
}

// ln -s /Users/hnq/Documents/公司项目/ArgoJS/packages/sim-redux/dist ./node_modules/sim-redux
// rimraf -rf ./node_modules/sim-redux && ln -s /Users/hnq/Documents/公司项目/ArgoJS/packages/sim-redux/dist ./node_modules/sim-redux
