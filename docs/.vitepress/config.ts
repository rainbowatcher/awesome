import { defineConfig } from "vitepress"
import ContainerThingPlugin from "./theme/plugins/container-thing"
import ContainerGridPlugin from "./theme/plugins/container-grid"
import InlineThingPlugin from "./theme/plugins/inline-thing"
import { imgLazyload } from "@mdit/plugin-img-lazyload"
import ListThingPlugin from "./theme/plugins/list-thing"

export default defineConfig({
  base: "/awesome",
  cleanUrls: true,
  themeConfig: {
    siteTitle: "Awesome",
    socialLinks: [
      {
        icon: "github",
        link: "http://github.com/rainbowatcher/awesome",
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
        .use(ContainerThingPlugin, "thing")
        .use(ContainerGridPlugin, "grid")
        .use(InlineThingPlugin, "thing")
        .use(ListThingPlugin)
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
