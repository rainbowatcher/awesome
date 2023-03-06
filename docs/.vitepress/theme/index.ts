import DefaultTheme from 'vitepress/theme'
import Card from "./components/Card.vue"
import Grid from "./components/Grid.vue"
import {Theme} from 'vitepress'
import "./index.css"

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Card', Card)
    app.component('Grid', Grid)

    // @ts-expect-error type
    const icons = import.meta.glob("./icons/*.vue", { eager: true })

    for (const icon in icons) {
      app.component(icon.split("/").at(-1).split('.')[0], icons[icon].default)
    }
  },
} as Theme