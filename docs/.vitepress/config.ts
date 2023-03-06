import { defineConfig } from "vitepress"
import container from "markdown-it-container"
import contanierThing from "./theme/plugins/contanier-thing"
import containerGrid from "./theme/plugins/container-grid"

export default defineConfig({
  themeConfig: {
    siteTitle: "Awesome",
    socialLinks: [
      {
        icon: "github",
        link: "rainbowatcher/awesome",
      },
    ],
    outline: {
      level: [2, 3],
      label: "menu",
    },
  },
  markdown: {
    config: (md) => {
      md.use(container, "thing", contanierThing)
      md.use(container, "grid", containerGrid)
    },
  },
})

