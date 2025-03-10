import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'

// Main function that takes a markdown string and returns a tiptap-like JSON object.
export async function markdownToJson(markdown: string) {
    debugger
  // Parse the markdown into a Markdown AST
  const tree = unified()
    .use(remarkParse)
    .use(remarkMath) // enables math support if needed
    .parse(markdown)

  // Convert the AST to the desired JSON structure
  const json = {
    type: 'doc',
    content: transformNodes(tree.children)
  }
  return json
}

// Recursively transform an array of markdown AST nodes.
function transformNodes(nodes) {
  return nodes.map(transformNode).flat().filter(Boolean)
}

// Transform a single markdown AST node.
function transformNode(node) {
  switch (node.type) {
    case 'heading':
      return {
        type: 'heading',
        attrs: { level: node.depth },
        content: transformNodes(node.children)
      }
    case 'paragraph':
      return {
        type: 'paragraph',
        content: transformNodes(node.children)
      }
    case 'text':
      return { type: 'text', text: node.value }
    case 'link':
      // Transform link node: attach link marks to its children.
      return node.children.map(child => {
        const transformed = transformNode(child)
        // Ensure marks exist (or add them) for inline elements.
        if (transformed && transformed.type === 'text') {
          transformed.marks = (transformed.marks || []).concat({
            type: 'link',
            attrs: { href: node.url, target: '_blank' }
          })
        }
        return transformed
      })
    case 'list':
      return {
        type: node.ordered ? 'orderedList' : 'bulletList',
        attrs: node.ordered
          ? { tight: node.spread === false, start: node.start || 1 }
          : { tight: node.spread === false },
        content: transformNodes(node.children)
      }
    case 'listItem':
      return {
        type: 'listItem',
        content: transformNodes(node.children)
      }
    case 'code':
      return {
        type: 'codeBlock',
        attrs: { language: node.lang || null },
        content: [{ type: 'text', text: node.value }]
      }
    case 'inlineCode':
      return {
        type: 'text',
        marks: [{ type: 'code' }],
        text: node.value
      }
    case 'thematicBreak':
      return { type: 'horizontalRule' }
    case 'image':
      return {
        type: 'image',
        attrs: {
          src: node.url,
          alt: node.alt || '',
          title: node.title || null,
          width: null,
          height: null
        }
      }
    // Math support from remark-math (both inline and block)
    case 'math':
      return {
        type: 'math',
        attrs: { latex: node.value }
      }
    case 'inlineMath':
      return {
        type: 'math',
        attrs: { latex: node.value }
      }
    default:
      // For any unhandled node types, try to process its children.
      if (node.children) {
        return transformNodes(node.children)
      }
      return null
  }
}
