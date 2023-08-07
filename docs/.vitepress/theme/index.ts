import DefaultTheme from 'vitepress/theme'
import Thing from "./components/Thing.vue"
import Grid from "./components/Grid.vue"
import "./index.css"
import "hint.css"

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Thing', Thing)
    app.component('Grid', Grid)
  },
}