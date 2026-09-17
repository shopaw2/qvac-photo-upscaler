# QVAC Photo Upscaler

A small CLI app that upscales low-resolution photos on-device using Tether's QVAC SDK — no cloud API, no data leaves your machine.

## What it does

Takes a low-res image and upscales it 4x using the Real-ESRGAN model running locally via QVAC.

## SDK version

@qvac/sdk ^0.19.1

## Install

npm install

## Run

node index.js <input-image> <output-image>

Example:
node index.js sample-lowres.jpg output.png


On first run, the model downloads automatically (a few hundred MB). Subsequent runs use the cached model.

## License

MIT