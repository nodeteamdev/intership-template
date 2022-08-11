const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const dotenvPath = path.resolve(process.cwd(), '.env');

if (fs.existsSync(dotenvPath, { encoding: 'utf8' }) !== true) {
    const dotenvExamplePath = path.resolve(process.cwd(), '.env.example');
    fs.copyFileSync(dotenvExamplePath, dotenvPath);
}

dotenv.config({ path: dotenvPath });
