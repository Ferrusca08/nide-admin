import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import path from 'path';

const pipe = promisify(pipeline);

async function decompressFile(inputPath) {
  const outputPath = inputPath.replace('.br', '');
  console.log(`Decompressing ${inputPath} to ${outputPath}...`);
  await pipe(
    createReadStream(inputPath),
    createBrotliDecompress(),
    createWriteStream(outputPath)
  );
  console.log(`Successfully decompressed ${outputPath}`);
}

async function main() {
  const basePath = 'public/unity/Build';
  const files = ['game.data.br', 'game.wasm.br', 'game.framework.js.br'];
  for (const file of files) {
    await decompressFile(path.join(basePath, file));
  }
}

main().catch(console.error);
