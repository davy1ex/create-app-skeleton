#!/usr/bin/env node

import path from "path"
import { fileURLToPath } from 'url'
import inquirer from "inquirer"
import chalk from "chalk"
import { copyTemplate } from "./copyTemplate.js"
import { makePackageJSON } from "./makePackageJSON.js"


const ARCHTECTURES = {
    basic: 'basic',
    typescriptFSDWebpack: 'typescript-fsd-webpack'
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

if (architecture == ARCHTECTURES.typescriptFSDWebpack) {
    console.log(`\n${chalk.cyan('Now you can do the next steps:')}`);
    console.log(chalk.gray('----------------------'));

    console.log(`${chalk.gray('1. Change to your project directory:')}`);
    console.log(`${chalk.yellow('cd')} ${chalk.white.bold(projectName)}`);
    console.log(chalk.gray('----------------------'));

    console.log(`${chalk.gray('2. Install dependencies for React and ReactDOM:')}`);
    console.log(`${chalk.yellow('npm install react react-dom')}`);
    console.log(chalk.gray('----------------------'));

    console.log(`${chalk.gray('3. Install development dependencies for Webpack, Babel, TypeScript, etc.:')}`);
    console.log(`${chalk.yellow('npm install --save-dev typescript @types/react @types/react-dom webpack webpack-cli webpack-dev-server ts-loader babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript style-loader css-loader html-webpack-plugin clean-webpack-plugin')}`);
    console.log(chalk.gray('----------------------'));

    console.log(`${chalk.gray('4. Add the "start" script to package.json:')}`);
    console.log(`${chalk.cyan('"start": "webpack serve --mode development"')}`);
    console.log(`${chalk.cyan('"build": "webpack --mode production"')}`);
    console.log(chalk.gray('----------------------'));

    console.log(`${chalk.gray('4. Run the project:')}`);
    console.log(`${chalk.yellow('npm run start')} ${chalk.gray('# Put your dev server and have fun :)')}`);

}

