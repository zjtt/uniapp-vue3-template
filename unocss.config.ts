import presetWeapp from "unocss-preset-weapp"
import { extractorAttributify, transformerClass } from "unocss-preset-weapp/transformer"
import { defineConfig } from "unocss"
// 可以写属性会自动增加class,也可以写class
const prefix = "uno-"
const { presetWeappAttributify, transformerAttributify } = extractorAttributify({ classPrefix: prefix })

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp({ prefix }),
    // attributify autocomplete
    presetWeappAttributify()
  ],
  shortcuts: [
    {
      "uno-center": "uno-flex uno-justify-center uno-items-center"
    }
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass()
  ]
})
