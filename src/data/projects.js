// Single source of truth for project cards (Home carousel + Projects page).
// tag  = "Category · Core technology" (top line of a card)
// tech = what the project is actually built with (bottom pills)

export const FEATURED_PROJECT = {
  id: "slovniczech",
  url: "https://slovniczech.com",
  domain: "slovniczech.com",
  title: "Slovniczech",
  headword: "Slov·ni·czech",
  tech: ["React", "TypeScript", "Cloudflare Workers", "D1"],
  stats: [
    { value: "15 000", key: "proj_dict_stat_words" },
    { value: "15", key: "proj_dict_stat_modes" },
    { value: "UA / EN", key: "proj_dict_stat_ui" },
  ],
};

export function getProjects(t) {
  return [
    {
      id: "video-compressor",
      tag: "Media Tool · WebAssembly",
      title: "Video Compressor",
      desc: t("proj_video_desc"),
      long: t("proj_video_long"),
      tech: ["React", "FFmpeg.wasm", "H.264"],
      preview: "video",
    },
    {
      id: "audio-extractor",
      tag: "Media Tool · WebAssembly",
      title: "Audio Extractor",
      desc: t("proj_audio_desc"),
      long: t("proj_audio_long"),
      tech: ["React", "FFmpeg.wasm", "MP3/M4A/WAV"],
      preview: "audio",
    },
    {
      id: "color-palette",
      tag: "Image Tool · Canvas API",
      title: "Color Palette",
      desc: t("proj_palette_desc"),
      long: t("proj_palette_long"),
      tech: ["React", "Canvas API", "Clipboard API"],
      preview: "palette",
    },
    {
      id: "css-toolkit",
      tag: "CSS Tool · 5 Generators",
      title: "CSS Toolkit",
      desc: t("proj_toolkit_desc"),
      long: t("proj_toolkit_long"),
      tech: ["React", "CSS", "Clipboard API"],
      preview: "css",
    },
    {
      id: "markdown-editor",
      tag: "Text Tool · Live Preview",
      title: "Markdown Editor",
      desc: t("proj_markdown_desc"),
      long: t("proj_markdown_long"),
      tech: ["React", "Custom Parser", "localStorage"],
      preview: "markdown",
    },
    {
      id: "svg-editor",
      tag: "Vector Tool · SVG",
      title: "SVG Editor",
      desc: t("proj_svg_desc"),
      long: t("proj_svg_long"),
      tech: ["React", "SVG", "DOMParser"],
      preview: "svg",
    },
  ];
}
