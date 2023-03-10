import { debug } from "console"
import MarkdownIt from "markdown-it"
import { RuleBlock } from "markdown-it/lib/parser_block"
import Renderer from "markdown-it/lib/renderer"
import Token from "markdown-it/lib/token"
import { thingRender } from "./container-thing"

type Opts = {
  name: string
  markup?: string
  validate?: (param: string, markup: string) => boolean
  render?: Renderer.RenderRule
}

const InlinePlugin: (opts: Opts) => MarkdownIt.PluginSimple = (opts) => (md) => {
  const {
    name,
    markup = "::",
    validate = (params: string) => params.trim().split(" ", 2)[0] === name,
    render = renderDefault,
  } = opts || {}

  function renderDefault(
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    _env: any,
    slf: any
  ) {
    // add a class to the opening tag
    if (tokens[idx].nesting === 1) {
      tokens[idx].attrJoin("class", name)
    }

    return slf.renderToken(tokens, idx, options);
  }

  const containerRuler: RuleBlock = (state, startline, endline, silent) => {
    const indentOffset = state.sCount[startline]
    const startIdx = state.bMarks[startline] + indentOffset
    const endIdx = state.eMarks[startline]
    const markupFirstChar = markup[0]
    const lineFirstChar = state.src[startIdx]

    if (markupFirstChar !== lineFirstChar) return false

    const lineMarkup = state.src.slice(startIdx, startIdx + markup.length)
    const params = state.src.slice(startIdx + markup.length, endIdx)
    if (lineMarkup !== markup) return false
    if (!validate(params, markup)) return false
    if (silent) return true

    // @ts-expect-error type
    state.parentType = "container"

    let token = state.push("thing", "div", 0)
    token.markup = markup
    token.block = true
    token.info = params
    token.map = [startline, startline + 1]

    state.line = startline + 1;
    state.lineMax = startline + 1
    return true
  }

  md.block.ruler.before("fence", `container_${name}`, containerRuler, {
    alt: ["paragraph", "reference", "blockquote", "list"],
  })
  md.renderer.rules["thing"] = render
}

const InlineThingPlugin = InlinePlugin({
  name: "thing",
  render: (() => thingRender("thing", true))()
})

export default InlineThingPlugin