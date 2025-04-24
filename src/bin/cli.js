#!/usr/bin/env node

import path from "path"
import { fileURLToPath } from 'url'
import inquirer from "inquirer"
import chalk from "chalk"
import { copyTemplate } from "./copyTemplate.js"


const ARCHTECTURES = {
    basic: 'basic',
    typescriptFSDWebpack: 'TypeScript-FSD-WebPack'
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
copyTemplate(templateDir, targetDir)
console.log(chalk.green(`\n✅ Project created in ${targetDir}`))
