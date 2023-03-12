import { PluginSimple } from "markdown-it"
import { RuleBlock } from "markdown-it/lib/parser_block"
import { RenderRule } from "markdown-it/lib/renderer"
import { parseBadgeAttr } from "./container-thing"

const LIST_MARKERS = ["*", "-", "+"]

const thingOpenRender: RenderRule = (
  tokens,
  idx,
  _options,
  env,
  slf
): string => {
  const token = tokens[idx]

  // if is order list
  if (!LIST_MARKERS.includes(token.markup)) {
    return slf.renderToken(tokens, idx, _options)
  }

  const attrs = []
  if (token.meta) {
    if (token.meta.get("title")) attrs.push(`name="${token.meta.get("title")}"`)
    if (token.meta.get("link")) attrs.push(`link="${token.meta.get("link")}"`)
    if (token.meta.get("icon")) attrs.push(`icon="${token.meta.get("icon")}"`)
    if (token.meta.get("desc")) attrs.push(`desc="${token.meta.get("desc")}"`)
    if (token.meta.get("badges")) attrs.push(`badges="${parseBadgeAttr(token.meta, token.meta.get("link"))}"`)
  }
  return `<Thing${attrs.reduce((pre, next) => `${pre} ${next}`, "")}>`
}

const thingCloseRender: RenderRule = (tokens, idx, options, env, slf) => {
  const token = tokens[idx]
  if (!LIST_MARKERS.includes(token.markup))
    return slf.renderToken(tokens, idx, options)
  return "</Thing>\n"
}

const gridRender: RenderRule = (tokens, idx, options, env, slf) => {
  return tokens[idx].nesting === 1 ? "<Grid>" : "</Grid>\n"
}

const ListThingPlugin: PluginSimple = (md) => {
  const rules = md.block.ruler.getRules("")
  const listRuler = rules.find((r) => r.name === "list")
  const meta = new Map()

  const listBlockRuler: RuleBlock = (state, startLine, endLine, silent) => {
    
    if (state.listIndent !== -1 && !silent) {
      const token = state.tokens.at(-1)!
      if (token.level + 1 === state.level) {
        const indentOffset = state.tShift[startLine]
        const startIdx = state.bMarks[startLine] + indentOffset
        const endIdx = state.eMarks[startLine]
        const line = state.src.slice(startIdx, endIdx)
        
        let titleExpr: string, content = ""
        const lineRE = /.*\s+-\s+.*/
        if (lineRE.test(line)) {
          ;[titleExpr, content] = line.split(/\s+-\s+/, 2).map((i) => i.trim())
        } else {
          titleExpr = line.trim()
        }
  
        // if list item's name is a markdown link
        const linkRE = /\[(.*)\]\((.*)\)/
        if (linkRE.test(titleExpr)) {
          const [_, title, link] = linkRE.exec(titleExpr)!
          meta.set("title", title)
          meta.set("link", link)
        } else {
          meta.set("title", titleExpr)
        }
  
        if (content) {
          if (content.includes("{")) {
            const desc = content.split("{")[0].trimEnd()
            meta.set("desc", desc)
          } else {
            meta.set("desc", content)
          }
        }
  
        // parse '{foo=bar}'
        const RE = /\{(.*)\}/
        if (RE.test(content)) {
          const matches = RE.exec(content)
          if (matches) {
            const pairs = matches[1]
            pairs
              .split(" ")
              .map((pair) => pair.split("=", 2).map((i) => i.replace(/"/g, "")))
              .forEach(([k, v]) => {
                meta.set(k, v)
              })
          }
        }
        token.meta = new Map(meta)
        meta.clear()
      }
    }

    return listRuler!(state, startLine, endLine, silent)
  }

  const paragraphRuler = rules.find((r) => r.name === "paragraph")
  md.block.ruler.at("paragraph", (state, start, end, silent) => {
    // TODO: should ignore paragraph when in mixed list or deep ident list
    const startIdx = state.bMarks[start]
    const lineFirstChar = state.src[startIdx]

    if (LIST_MARKERS.includes(lineFirstChar)) {
      state.line = start + 1
      return true
    }

    return paragraphRuler!(state, start, end, silent)
  })
  md.block.ruler.at("list", listBlockRuler, { alt: ["paragraph"] })
  md.renderer.rules.bullet_list_open = gridRender
  md.renderer.rules.bullet_list_close = gridRender
  md.renderer.rules.list_item_open = thingOpenRender
  md.renderer.rules.list_item_close = thingCloseRender
}

export default ListThingPlugin
