#!/usr/bin/env node

import path from "path"
import { fileURLToPath } from 'url'
import inquirer from "inquirer"
import chalk from "chalk"
import { copyTemplate } from "./copyTemplate.js"
import { makePackageJSON } from "./makePackageJSON.js"


const ARCHTECTURES = {
    basic: 'basic',
    typescriptFSDWebpack: '(coming soon! (not available now) TypeScript-FSD-WebPack'
}
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const { projectName, architecture } = await inquirer.prompt([
    {
        name: 'projectName',
        message: 'Project name:',
        default: '.',
    },
    {
        type: 'list',
        name: 'architecture',
        message: 'Choose project architecture:',
        choices: [ARCHTECTURES.basic, ARCHTECTURES.typescriptFSDWebpack],
    },
])

let targetDir = (
    projectName == '.'
        ? process.cwd()
        : path.resolve(process.cwd(), projectName)
)



const templateDir = path.resolve(__dirname, '../templates', architecture)
await copyTemplate(templateDir, targetDir)
await makePackageJSON(projectName, targetDir)

console.log(chalk.green(`\n✅Your ${architecture} project created in ${chalk.bold(targetDir)}!`))
if (architecture == ARCHTECTURES.basic) {
    console.log(`\n${chalk.cyan('Now u can do next steps:')}`)
    console.log(chalk.gray('----------------------'))
    console.log(`${chalk.yellow('cd')} ${chalk.white.bold(projectName)}`)
    console.log(`${chalk.yellow('npm install react react-dom react-scripts')}`)
    console.log(`${chalk.gray('and add to generated package.json script: "start": "react-scripts start",')}`)
    console.log(`${chalk.yellow('npm run dev')} ${chalk.gray('# put your and have fun :)')}`)
}

