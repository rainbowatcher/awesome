import { container } from "@mdit/plugin-container"
import { badgeTypes, BadgeType } from "../types"

export function parseBadgeAttr(map: Map<string, string>, linkAttr: string): string {
  const badges = map.get("badges")
  if (!badges) return ""
  const badgeStrs = []
  if (badges && linkAttr.includes("github")) {
    const splits = map.get("link").split("/")
    const user = splits.at(-2)
    const repo = splits.at(-1)
    const badgeArr = badges.split(",")
    for (const badge of badgeArr) {
      if (badgeTypes.includes(badge as BadgeType)) {
        switch (badge as BadgeType) {
          case "npm_dm":
            badgeStrs.push(`https://img.shields.io/npm/dm/${repo}?label=&style=flat`)
            break
          case "install_size":
            badgeStrs.push(
              `https://packagephobia.com/badge?p=@${user}/${repo}?label=&style=flat`
            )
            break
          case "license":
            badgeStrs.push(
              `https://img.shields.io/github/license/${user}/${repo}?label=&style=flat`
            )
            break
          case "repo_size":
            badgeStrs.push(
              `https://img.shields.io/github/repo-size/${user}/${repo}?label=&style=flat`
            )
            break
          case "stars":
            badgeStrs.push(
              `https://img.shields.io/github/stars/${user}/${repo}?label=&style=flat`
            )
            break
          case "language":
            badgeStrs.push(
              `https://img.shields.io/github/languages/top/${user}/${repo}?label=&style=flat`
            )
        }
      } else {
        console.log(
          `! Bad badge name found: ${badge}, valid badge name is [${badgeTypes}]`
        )
      }
    }
  }

  return badgeStrs.reduce((pre, next) => `${pre}${next};`, "").slice(0, -1)
}

export function thingRender(name: any, appendEnd = false) {
  return (tokens: any[], idx: number): string => {
    const token = tokens[idx]

    const infos: string[] = token.info.split(" ")
    const title = infos[1]?.trim()

    const map = new Map<string, string>(token.attrs)
    const iconAttr = map.get("icon") ? ` icon="${map.get("icon")}"` : ""
    const linkAttr = map.get("link") ? ` link="${map.get("link")}"` : ""
    const descAttr = map.get("desc") ? ` desc="${map.get("desc")}"` : ""
    const badgeAttr = parseBadgeAttr(map, linkAttr)
      ? ` badges="${parseBadgeAttr(map, linkAttr)}"`
      : ""

    const tag = `<Thing name="${title ?? name}"${iconAttr}${linkAttr}${badgeAttr}${descAttr}>`
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
