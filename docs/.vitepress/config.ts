import { defineConfig } from "vitepress"
import container from "markdown-it-container"
import { BadgeType, badgeTypes } from "./theme/types"

export default defineConfig({
  themeConfig: {
    siteTitle: "Awesome",
    socialLinks: [
      {
        icon: "github",
        link: "rainbowatcher/awesome",
      },
    ],
    outline: {
      level: [2, 3],
      label: "menu",
    },
  },
  markdown: {
    config: (md) => {
      md.use(container, "thing", {
        render: (tokens, idx): string => {
          const token = tokens[idx]

          const name = token.info.trim().slice(5).trim()
          const map = new Map<string, string>(token.attrs)

          const iconAttr = map.get("icon") ? `icon="${map.get("icon")}"` : ""
          const linkAttr = map.get("link") ? `link="${map.get("link")}"` : ""
          const badgeAttr = parseBadgeAttr(map, linkAttr)
          const f = `<Card name="${name}" ${iconAttr} ${linkAttr} ${badgeAttr}>`

          return token.nesting === 1 ? f : "</Card>\n"
        },
      })
    },
  },
})

function parseBadgeAttr(map: Map<string, string>, linkAttr: string) {
  const badges = map.get("badges")
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
            badgeStrs.push(`https://img.shields.io/npm/dm/${repo}?label=dlm`)
            break
          case "install_size":
            badgeStrs.push(
              `https://packagephobia.com/badge?p=@${user}/${repo}?label=isi`
            )
            break
          case "license":
            badgeStrs.push(
              `https://img.shields.io/github/license/${user}/${repo}?label=lic`
            )
            break
          case "repo_size":
            badgeStrs.push(
              `https://img.shields.io/github/repo-size/${user}/${repo}?label=rsi`
            )
            break
          case "stars":
            badgeStrs.push(
              `https://img.shields.io/github/stars/${user}/${repo}?label=sta`
            )
            break
        }
      } else {
        console.log(
          `! Bad badge name found: ${badge}, valid badge name is [${badgeTypes}]`
        )
      }
    }
  }

  return `badges="${badgeStrs.join(";")}"`
}
