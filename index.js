import { loadModel, upscale, unloadModel, REALESRGAN_X4PLUS } from '@qvac/sdk';
import fs from 'fs';

const inputPath = process.argv[2] || './sample.jpg';
const outputPath = process.argv[3] || './upscaled.png';

console.log('Loading upscale model...');
const modelId = await loadModel({
  modelSrc: REALESRGAN_X4PLUS,
  modelType: 'diffusion',
  modelConfig: {
    mode: 'upscale',
    upscaler: { tile_size: 128 }
  },
  onProgress: (p) => process.stderr.write(`Downloading model: ${p.percentage?.toFixed(0)}%\r`)
});

console.log('\nModel loaded. Reading input image:', inputPath);
const inputBuffer = fs.readFileSync(inputPath);

console.log('Upscaling...');
const { outputs } = upscale({ modelId, image: inputBuffer });
const result = await outputs;

fs.writeFileSync(outputPath, result[0]);
console.log('Done! Saved to:', outputPath);

await unloadModel({ modelId });