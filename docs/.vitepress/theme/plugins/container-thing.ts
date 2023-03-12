import { container } from "@mdit/plugin-container"
import { badgeTypes, BadgeType } from "../types"
import { parseBadgeAttr } from "./list-thing"

export function thingRender(name: any, appendEnd = false) {
  return (tokens: any[], idx: number): string => {
    const token = tokens[idx]

    const infos: string[] = token.info.split(" ")
    const title = infos[1]?.trim()

    const map = new Map<string, string>(token.attrs)
    const iconAttr = map.get("icon") ? ` icon="${map.get("icon")}"` : ""
    const linkAttr = map.get("link") ? ` link="${map.get("link")}"` : ""
    const descAttr = map.get("desc") ? ` desc="${map.get("desc")}"` : ""
    const badgeAttr = parseBadgeAttr(linkAttr)
      ? ` badges="${parseBadgeAttr(linkAttr)}"`
      : ""

    const tag = `<Thing name="${
      title ?? name
    }"${iconAttr}${linkAttr}${badgeAttr}${descAttr}>`
    const endTag = "</Thing>\n"
    return appendEnd ? `${tag}${endTag}` : tag
  }
}

const ContainerThingPlugin: markdownit.PluginWithParams = (md, name) =>
  container(md, {
    name,
    openRender: thingRender(name),
    closeRender: () => {
      return "</Thing>\n"
    },
  })

export default ContainerThingPlugin
