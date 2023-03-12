import { container } from "@mdit/plugin-container"

const ContainerGridPlugin: markdownit.PluginSimple = (md) =>
  container(md, {
    name: "grid",
    marker: "`",
    openRender: (tokens, idx): string => {
      const token = tokens[idx]

      const map = new Map<string, string>(token.attrs)

      const widthAttr = map.get("width") ? `width="${map.get("width")}"` : ""

      return `<Grid ${widthAttr}>`
    },
    closeRender: () => "</Grid>\n",
  })

export default ContainerGridPlugin
