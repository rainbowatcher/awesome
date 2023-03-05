export const badgeTypes = [
  "license",
  "repo_size",
  "install_size",
  "stars",
  "npm_dm",
] as const

export type BadgeType = typeof badgeTypes[number]

export type Icon =
"github"
| "apple"
| "electron"
| 'javascript'
| "java"
| "typescript"
| "python"
| "rust"
| "go"
