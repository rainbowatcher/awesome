import { defineConfig } from "vitepress"
import ContainerThingPlugin from "./theme/plugins/container-thing"
import ContainerGridPlugin from "./theme/plugins/container-grid"
import InlineThingPlugin from "./theme/plugins/inline-thing"
import { imgLazyload } from "@mdit/plugin-img-lazyload"
import ListThingPlugin from "./theme/plugins/list-thing"

export default defineConfig({
  base: "/",
  cleanUrls: true,
  themeConfig: {
    siteTitle: "Awesome",
    returnToTopLabel: "Top",
    socialLinks: [
      {
        icon: "github",
        link: "http://github.com/rainbowatcher/awesome",
      },
    ],
    outline: {
      level: [2, 3],
      label: "Menu 菜单",
    },
  },
  markdown: {
    config: (md) => {
      md.use(imgLazyload)
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
