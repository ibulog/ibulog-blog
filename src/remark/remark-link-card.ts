import type { Link, Paragraph } from "mdast"
import type { Plugin } from "unified"
import type { Node } from "unist"
import { visit, type Visitor } from "unist-util-visit"

const remarkLinkCard: Plugin = () => {
  return (tree: Node) => {
    const visitor: Visitor<Link> = (node, index, parent) => {
      if (!parent || index === undefined) {
        return
      }

      // リンクのテキストを取得（子ノードからテキストを抽出）
      const linkText = node.children
        .map((child) => {
          if (child.type === "text") {
            return child.value
          }
          return ""
        })
        .join("")
        .trim()

      // link-card 要素に変換
      parent.children.splice(index, 1, {
        type: "paragraph",
        data: {
          hName: "link-card",
          hProperties: {
            url: node.url,
            // テキストがURLと異なる場合のみ title として使用
            ...(linkText && linkText !== node.url ? { title: linkText } : {}),
          },
        },
        children: [],
      } as Paragraph)
    }
    visit(tree, "link", visitor)
  }
}

export default remarkLinkCard

