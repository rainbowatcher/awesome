import DefaultTheme from 'vitepress/theme'
import Thing from "./components/Thing.vue"
import Grid from "./components/Grid.vue"
import {Theme} from 'vitepress'
import "./index.css"
import "hint.css"

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Thing', Thing)
    app.component('Grid', Grid)

    // const icons = import.meta.glob("./icons/*.vue", { eager: true })

    // for (const icon in icons) {
    //   app.component(icon.split("/").at(-1).split('.')[0], icons[icon].default)
    // }
  },
} as Theme