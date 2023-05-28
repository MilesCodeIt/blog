import { defineConfig, presetTypography, presetUno } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
  ],

  transformers: [
    transformerVariantGroup()
  ]
});

