import fs from 'fs/promises'
import path from 'path'

export async function copyTemplate(src, dest) {
    await fs.mkdir(dest, { recursive: true })
    const entries = await fs.readdir(src, { withFileTypes: true })

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name)
        const destPath = path.join(dest, entry.name)

        if (entry.isDirectory()) {
            await copyTemplate(srcPath, destPath)
        } else {
            const content = await fs.readFile(srcPath)
            await fs.writeFile(destPath, content)
        }
    }
}
