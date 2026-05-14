import { useState } from "react";
import "./MarkdownEditor.css";

const DEFAULT_CONTENT = `# Welcome to Markdown Editor

Write **markdown** on the left, see the *formatted* result on the right.

## Supported syntax

- Headings (H1 to H3)
- **Bold** and *italic*
- [Links](https://example.com)
- \`inline code\`
- Lists like this one
- > Blockquotes

\`\`\`
code blocks
work too
\`\`\`

Happy writing!`;

export default function MarkdownEditor() {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  // Feature: Parse markdown to HTML using regex
  const parseMarkdown = (md) => {
    let html = md;

    // Escape HTML to prevent injection
    html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Code blocks (must run before inline code)
    html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");

    // Headings
    html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");

    // Blockquotes
    html = html.replace(/^&gt; (.*$)/gm, "<blockquote>$1</blockquote>");

    // Bold + italic
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

    // Inline code
    html = html.replace(/`(.+?)`/g, "<code>$1</code>");

    // Links
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Unordered lists
    html = html.replace(/^- (.*$)/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

    // Paragraphs (lines that are not other tags)
    html = html
      .split("\n\n")
      .map((block) => {
        if (block.match(/^<(h1|h2|h3|ul|pre|blockquote)/)) return block;
        if (block.trim() === "") return "";
        return `<p>${block.replace(/\n/g, "<br/>")}</p>`;
      })
      .join("\n");

    return html;
  };

  return (
    <div className="markdown-wrapper">
      <h2 className="page-header">Markdown Editor</h2>

      {/* EDITOR + PREVIEW */}
      <div className="markdown-grid">
        {/* EDITOR */}
        <div className="markdown-pane">
          <div className="markdown-pane-header">Editor</div>
          <textarea
            className="markdown-editor"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* PREVIEW */}
        <div className="markdown-pane">
          <div className="markdown-pane-header">Preview</div>
          <div
            className="markdown-preview"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
          />
        </div>
      </div>
    </div>
  );
}
