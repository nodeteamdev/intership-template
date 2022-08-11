import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const dotenvPath = path.resolve(__dirname, '../..', '.env');

if (fs.existsSync(dotenvPath) !== true) {
    const dotenvExamplePath = path.resolve(__dirname, '../..', '.env.example');
    fs.copyFileSync(dotenvExamplePath, dotenvPath);
}

export default function dotenvConfig() {
    dotenv.config({ path: dotenvPath });
}
