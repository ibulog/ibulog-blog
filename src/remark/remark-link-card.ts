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

      // 親が paragraph で、リンクが唯一の子要素の場合のみ処理
      // これにより、テキスト中に埋め込まれたリンクは変換されない
      if (parent.type !== "paragraph" || parent.children.length !== 1) {
        return
      }

      // リンクテキストとURLが一致する場合のみ link-card に変換
      if (linkText === node.url) {
        parent.children.splice(index, 1, {
          type: "paragraph",
          data: {
            hName: "link-card",
            hProperties: {
              url: node.url,
            },
          },
          children: [],
        } as Paragraph)
      }
    }
    visit(tree, "link", visitor)
  }
}

export default remarkLinkCard

