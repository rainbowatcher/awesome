import { defineConfig } from "vitepress"
import ContainerThingPlugin from "./theme/plugins/container-thing"
import ContainerGridPlugin from "./theme/plugins/container-grid"
import InlineThingPlugin from "./theme/plugins/inline-thing"
import { imgLazyload } from "@mdit/plugin-img-lazyload"

export default defineConfig({
  base: "/awesome",
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
      md.use(imgLazyload)
      md.use(ContainerThingPlugin, "thing")
      md.use(ContainerGridPlugin, "grid")
      md.use(InlineThingPlugin, "thing")
    },
  },
  vue: {
    template: {
      compilerOptions: {
        // treat all tags with a dash as custom elements
        isCustomElement: (tag) => tag.includes("-"),
      },
    },
  },
})
