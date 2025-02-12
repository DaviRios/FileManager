const fs = require('fs').promises;
const path = require('path');
const readline = require('node:readline');

const BASE_DIRECTORY = './files'; // Diretório padrão para os arquivos

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Função para usar rl.question() com async/await
const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

async function start() {
    let option;

    do {
        console.log(` \n \r📌 What would you like to do?
 \x1b[34m
 1) Create File 
 2) List All Files 
 3) Edit File 
 4) Delete File 
 5) Exit 
 \x1b[0m`);

        option = parseInt(await askQuestion(`Choose an option (1-5):`));

        switch (option) {
            case 1:
                await handleCreateFile();
                break;
            case 2:
                await handleListFiles();
                break;
            case 3:
                await handleEditFile();
                break;
            case 4:
                await handleDeleteFile();
                break;
            case 5:
                console.log("\x1b[41m👋 Exiting...\x1b[0m");
                rl.close();
                break;
            default:
                console.log('❌ Invalid option.');
        }
    } while (option !== 5);
}

async function handleCreateFile() {
    const fileName = await askQuestion("\n \r📄 Enter file name: ");
    const content = await askQuestion("✍️ Enter file content: ");
    const filePath = path.join(BASE_DIRECTORY, fileName);

    try {
        await fs.mkdir(BASE_DIRECTORY, { recursive: true }); // Cria a pasta se não existir
        await fs.writeFile(filePath, content);
        console.log(`\x1b[32m✅ File created successfully: ${filePath}\x1b[0m`);
    } catch (err) {
        console.error(`❌ Error creating file: ${err.message}`);
    }
}

async function handleListFiles() {
    try {
        const files = await fs.readdir(BASE_DIRECTORY);
        console.log(files.length ? `\n \r \x1b[32m📂 Files in '${BASE_DIRECTORY}':\n \r${files.join('\n \r')}\x1b[0m` : '📭 No files found.');
    } catch (err) {
        console.error(`\n \r ❌ Error listing files: ${err.message}`);
    }
}

async function handleEditFile() {
    const fileName = await askQuestion("\n\r📄Enter file name to edit: ");
    const filePath = path.join(BASE_DIRECTORY, fileName);

    try {
        await fs.access(filePath); // Verifica se o arquivo existe
        const newContent = await askQuestion("✍️ Enter new content: ");
        await fs.writeFile(filePath, newContent);
        console.log(`\x1b[32m✅ File edited successfully: ${filePath}\x1b[0m`);
    } catch (err) {
        console.error(`\n \r❌ Error editing file: ${err.message}`);
    }
}

async function handleDeleteFile() {
    const fileName = await askQuestion("\n \r🗑️ Enter file name to delete: ");
    const filePath = path.join(BASE_DIRECTORY, fileName);

    try {
        await fs.unlink(filePath);
        console.log(`\x1b[32m✅ File deleted successfully: ${filePath}\x1b[0m`);
    } catch (err) {
        console.error(`\n \r❌ Error deleting file: ${err.message}`);
    }
}

start();
