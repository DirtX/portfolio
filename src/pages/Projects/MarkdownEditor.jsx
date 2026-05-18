import { useState, useRef, useEffect } from "react";
import { useLang } from "../../context/LanguageContext";
import "./MarkdownEditor.css";

const TECH_STACK = ["React", "Regex Parser", "localStorage"];

const STORAGE_KEY = "markdown-editor-content";

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

const TOOLBAR = [
  { id: "h1", label: "H1", insert: "# ", block: true },
  { id: "h2", label: "H2", insert: "## ", block: true },
  { id: "h3", label: "H3", insert: "### ", block: true },
  { id: "bold", label: "B", insert: "**", wrap: true, style: { fontWeight: 700 } },
  { id: "italic", label: "I", insert: "*", wrap: true, style: { fontStyle: "italic" } },
  { id: "code", label: "</>", insert: "`", wrap: true },
  { id: "link", label: "Link", insert: "[text](url)" },
  { id: "list", label: "List", insert: "- ", block: true },
  { id: "quote", label: "Quote", insert: "> ", block: true },
];

export default function MarkdownEditor() {
  const { t } = useLang();

  const STEPS = [
    { num: "01", title: t("me_step1_title"), desc: t("me_step1_desc") },
    { num: "02", title: t("me_step2_title"), desc: t("me_step2_desc") },
    { num: "03", title: t("me_step3_title"), desc: t("me_step3_desc") },
  ];

  const [content, setContent] = useState(DEFAULT_CONTENT);
  const editorRef = useRef(null);

  // Feature: Load saved content from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) setContent(saved);
  }, []);

  // Feature: Auto-save content to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, content);
  }, [content]);

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

  // Feature: Insert markdown syntax at cursor or wrap selection
  const insertSyntax = (item) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end);
    let newContent;
    let cursorPos;

    if (item.wrap) {
      const wrapped = `${item.insert}${selected || "text"}${item.insert}`;
      newContent = content.slice(0, start) + wrapped + content.slice(end);
      cursorPos = start + item.insert.length + (selected || "text").length + item.insert.length;
    } else if (item.block) {
      const before = content.slice(0, start);
      const lineStart = before.lastIndexOf("\n") + 1;
      newContent = content.slice(0, lineStart) + item.insert + content.slice(lineStart);
      cursorPos = start + item.insert.length;
    } else {
      newContent = content.slice(0, start) + item.insert + content.slice(end);
      cursorPos = start + item.insert.length;
    }

    setContent(newContent);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPos, cursorPos);
    });
  };

  // Feature: Clear editor and reset to empty
  const handleClear = () => {
    if (confirm(t("me_confirm_clear"))) {
      setContent("");
    }
  };

  // Feature: Download content as .md file
  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Feature: Count words and characters
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div className="me-page">
      {/* HERO SECTION */}
      <div className="me-hero">
        <div className="me-tech">
          {TECH_STACK.map((tech, i) => (
            <span key={tech} className="me-tech-item">
              {tech}
              {i < TECH_STACK.length - 1 && <span className="me-tech-dot">·</span>}
            </span>
          ))}
        </div>
        <h1 className="me-title">Markdown Editor</h1>
        <p className="me-subtitle">{t("me_subtitle")}</p>
      </div>

      {/* TOOLBAR */}
      <div className="me-toolbar">
        <div className="me-toolbar-group">
          {TOOLBAR.map((item) => (
            <button
              key={item.id}
              className="me-tool-btn"
              onClick={() => insertSyntax(item)}
              style={item.style}
              title={item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="me-toolbar-actions">
          <button className="me-btn-ghost" onClick={handleClear}>
            {t("me_btn_clear")}
          </button>
          <button className="me-btn" onClick={handleDownload}>
            {t("me_btn_download")}
          </button>
        </div>
      </div>

      {/* EDITOR + PREVIEW */}
      <div className="me-grid">
        {/* EDITOR */}
        <div className="me-pane">
          <div className="me-pane-header">
            <span>{t("me_pane_editor")}</span>
            <span className="me-stats">
              {wordCount} {t("me_stats_words")} · {charCount} {t("me_stats_chars")}
            </span>
          </div>
          <textarea
            ref={editorRef}
            className="me-editor"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            placeholder={t("me_placeholder")}
          />
        </div>

        {/* PREVIEW */}
        <div className="me-pane">
          <div className="me-pane-header">
            <span>{t("me_pane_preview")}</span>
            <span className="me-stats">{t("me_stats_live")}</span>
          </div>
          <div
            className="me-preview"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
          />
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="me-how">
        <h2 className="me-how-title">{t("page_how_title")}</h2>
        <div className="me-steps">
          {STEPS.map((s) => (
            <div key={s.num} className="me-step">
              <span className="me-step-num">{s.num}</span>
              <h3 className="me-step-title">{s.title}</h3>
              <p className="me-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TECH NOTE */}
      <div className="me-tech-note">
        {t("page_powered_by")} <strong>regex pipeline</strong> — {t("me_tech_note")}
      </div>
    </div>
  );
}
