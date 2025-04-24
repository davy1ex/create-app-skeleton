import fs from 'fs'
import path from "path"
import { execSync } from 'child_process'

export const makePackageJSON = async (projectName, targetDir) => {
    // const pkg = {
    //     name: projectName === '.' ? path.basename(process.cwd()) : projectName,
    //     version: '1.0.0',
    //     scripts: {
    //         start: '',
    //         build: ''
    //     },
    //     dependencies: {},
    //     devDependencies: {}
    // }

    execSync('npm init -y', {
        cwd: targetDir,
        stdio: 'inherit'
    })

    // fs.writeFileSync(
    //     path.join(targetDir, 'package.json'),
    //     JSON.stringify(pkg, null, 2)
    // )
}
