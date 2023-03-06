export default {
  render: (tokens, idx): string => {
    const token = tokens[idx]

    const map = new Map<string, string>(token.attrs)

    const widthAttr = map.get("width") ? `width="${map.get("width")}"` : ""

    return token.nesting === 1 ? `<Grid ${widthAttr}>` : "</Grid>\n"
  }
}