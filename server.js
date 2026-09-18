import express from 'express';
import multer from 'multer';
import { loadModel, upscale, REALESRGAN_X4PLUS } from '@qvac/sdk';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static('public'));

console.log('Loading upscale model, please wait...');
const modelId = await loadModel({
  modelSrc: REALESRGAN_X4PLUS,
  modelType: 'diffusion',
  modelConfig: {
    mode: 'upscale',
    upscaler: { tile_size: 128 }
  },
  onProgress: (p) => process.stderr.write(`Downloading model: ${p.percentage?.toFixed(0)}%\r`)
});
console.log('\nModel loaded. Server ready.');

app.post('/upscale', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

    console.log('Upscaling uploaded image...');
    const { outputs } = upscale({ modelId, image: req.file.buffer });
    const result = await outputs;

    res.set('Content-Type', 'image/png');
    res.send(Buffer.from(result[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});