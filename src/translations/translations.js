export const translations = {
  en: {
    // ============ NAVBAR ============
    nav_about: "About",
    nav_projects: "Projects",
    back_to_projects: "Back to projects",
    back_home: "Back home",
    nav_contact: "Contact",

    // ============ HERO ============
    hero_eyebrow: "Available for work",
    hero_role: "Frontend Developer & UI/UX Designer.",
    hero_desc:
      "Translating visual concepts into clean, functional code. Bridging design and engineering without friction.",
    hero_btn_projects: "View Projects",
    hero_btn_cv: "Download CV",
    hero_btn_figma: "Figma File ↗",

    // ============ STATS ============
    stat_years: "Years freelancing",
    stat_projects: "Freelance projects",

    // ============ LANGUAGES ============
    lang_en: "Upper Intermediate",
    lang_ua: "Native",
    lang_cz: "Beginner",

    // ============ SKILLS ============
    skills_eyebrow: "Expertise",
    skills_title: "What I work with.",
    skill_confident: "Confident",
    skill_intermediate: "Intermediate",

    // ============ HOME PROJECTS CAROUSEL ============
    projects_eyebrow: "Selected Works",
    projects_title: "Things I've built.",
    projects_subtitle:
      "A collection of small but functional tools — each one a focused exploration of a specific web technology. All running entirely client-side.",
    fig_label: "Fig.",
    proj_dict_stat_words: "words and phrases",
    proj_dict_stat_modes: "practice modes",
    proj_dict_stat_ui: "interface",
    proj_dict_live: "Live product",
    proj_dict_pos: "noun · web app",
    proj_dict_desc:
      "Czech vocabulary for Ukrainian and English speakers: 15,000 words from A1 to C2 with audio and spaced repetition.",
    proj_dict_long:
      "Czech vocabulary for Ukrainian and English speakers: about 15,000 words and phrases from A1 to C2, each with an example sentence and native Czech audio. 15 practice modes with spaced repetition, lessons with level tests, an interactive atlas, and progress sync across devices.",
    proj_dict_example_tr: "Our family lives in a big city.",
    proj_video_desc: "Client-side video compression without any server interaction.",
    proj_video_long:
      "Make video files up to 90% smaller without visible quality loss. Runs entirely in your browser via FFmpeg.wasm — no server uploads.",
    proj_audio_desc: "Extract audio from any video file in your browser.",
    proj_audio_long:
      "Extract audio from video files in MP3, M4A or WAV format. All processing happens in the browser.",
    proj_palette_desc: "Extract dominant colors from any image instantly.",
    proj_palette_long:
      "Drop an image and instantly extract its dominant colors. Click any swatch to copy the hex code to clipboard.",

    proj_toolkit_desc: "Visual generators for gradients, shadows, glassmorphism and more.",
    proj_toolkit_long:
      "Five visual generators in one: gradients, box shadows, glassmorphism, border radius and CSS filters. Tweak controls, copy code.",

    proj_markdown_desc:
      "Write Markdown on the left, see formatted output on the right. Notes saved locally.",
    proj_markdown_long:
      "Live markdown editor with auto-save. Write on the left, see formatted output on the right. Notes persist via localStorage.",
    proj_svg_desc: "Import existing SVG files or draw from scratch.",
    proj_svg_long:
      "Import existing SVG files or draw from scratch. Recolor, resize, delete shapes — then export the result as a clean SVG.",

    // ============ ABOUT ============
    about_eyebrow: "About",
    about_title: "Who I am.",
    about_p1:
      "Frontend developer with 4 years of freelance experience building responsive websites and interfaces.",
    about_p2:
      "My background in UI/UX design gives me an edge — I can go from mockup to working code without handoff friction.",
    about_p3:
      "Always eager to learn — I pick up new tools and frameworks fast and treat every project as a chance to grow. Comfortable jumping into unfamiliar codebases and stacks.",
    about_p4:
      "Actively learning Czech and ready to join a Czech-speaking team — I see immersion as the fastest way to level up both professionally and linguistically. Based in Kolín, open to relocation.",

    // ============ CONTACT ============
    contact_eyebrow: "Get in touch",
    contact_title: "Let's talk.",
    contact_email: "Email",
    contact_phone: "Phone",
    contact_location: "Location",
    contact_languages: "Languages",
    contact_location_val: "Kolín, Czechia",

    // ============ FOOTER ============
    footer_built: "Built with React",

    // ============ CONTACT MODAL ============
    modal_eyebrow: "Reach out",
    modal_title: "How would you like to connect?",
    modal_whatsapp_desc: "Chat or call instantly",
    modal_cancel: "Cancel",

    // ============ SHARED PROJECT PAGE STRINGS ============
    page_how_title: "How it works",
    page_powered_by: "Powered by",

    // ============ VIDEO COMPRESSOR ============
    vc_subtitle:
      "Reduce video file size by up to 90% without visible quality loss. Runs entirely in your browser — your files never leave your device.",
    vc_drop: "Drop your video here",
    vc_drop_sub: "or click to browse · MP4, MOV, MKV, AVI, WEBM",
    vc_target_size: "Target size (MB)",
    vc_resolution: "Resolution",
    vc_res_original: "Original",
    vc_btn_compress: "Compress video",
    vc_btn_compressing: "Compressing...",
    vc_btn_loading: "Loading engine...",
    vc_stat_original: "Original",
    vc_stat_compressed: "Compressed",
    vc_stat_saved: "Saved",
    vc_btn_download: "Download",
    vc_btn_another: "Compress another",
    vc_step1_title: "Select your video",
    vc_step1_desc: "Drop any MP4, MOV, MKV, AVI or WEBM file. Nothing leaves your device.",
    vc_step2_title: "Set target size",
    vc_step2_desc: "Pick how small you want the output. Adjust resolution if needed.",
    vc_step3_title: "Download",
    vc_step3_desc: "Compression runs entirely in your browser via FFmpeg WebAssembly.",
    vc_tech_note:
      "the same engine used in professional video tools, running entirely in your browser.",
    vc_err_format: "Invalid format. Accepted: MP4, WEBM, MOV, MKV, AVI.",
    vc_err_compression: "Compression failed:",
    vc_err_mobile_size:
      "File too large for mobile (max {mb} MB). Open this tool on a computer for larger files.",
    vc_mobile_notice:
      "Mobile limit: {mb} MB max. Files are processed locally in your browser and never uploaded.",
    vc_eta_calc: "Calculating...",
    vc_eta_remaining: "remaining",

    // ============ AUDIO EXTRACTOR ============
    ae_subtitle:
      "Extract audio from any video file. Convert MP4, MOV, MKV to MP3, M4A or WAV directly in your browser — no server, no uploads.",
    ae_drop: "Drop your video here",
    ae_drop_sub: "or click to browse · MP4, MOV, MKV, AVI, WEBM",
    ae_bitrate: "Bitrate",
    ae_btn_extract: "Extract audio",
    ae_btn_extracting: "Extracting...",
    ae_btn_loading: "Loading engine...",
    ae_stat_source: "Source",
    ae_stat_audio: "Audio",
    ae_stat_format: "Format",
    ae_btn_download: "Download",
    ae_btn_another: "Extract another",
    ae_step1_title: "Select your video",
    ae_step1_desc: "Drop any MP4, MOV, MKV, AVI or WEBM file. Nothing leaves your device.",
    ae_step2_title: "Choose format & bitrate",
    ae_step2_desc: "Pick MP3, M4A or WAV. Higher bitrate = better quality, larger file.",
    ae_step3_title: "Download audio",
    ae_step3_desc: "Audio is extracted in your browser via FFmpeg WebAssembly.",
    ae_tech_note: "professional audio processing running entirely in your browser.",
    ae_err_format: "Invalid format. Accepted: MP4, WEBM, MOV, MKV, AVI.",
    ae_err_extraction: "Extraction failed:",
    ae_err_mobile_size:
      "File too large for mobile (max {mb} MB). Open this tool on a computer for larger files.",
    ae_mobile_notice:
      "Mobile limit: {mb} MB max. Files are processed locally in your browser and never uploaded.",
    ae_fmt_mp3_desc: "Universal format, works everywhere",
    ae_fmt_m4a_desc: "Better quality at same bitrate",
    ae_fmt_wav_desc: "Lossless, uncompressed audio",

    // ============ COLOR PALETTE ============
    color_palette_subtitle:
      "Extract the dominant colors from any image instantly. Perfect for finding color schemes, matching brand colors, or just exploring.",
    color_palette_drop: "Drop an image here",
    color_palette_drop_sub: "or click to browse · PNG, JPG, WEBP, GIF",
    color_palette_colors: "Colors",
    color_palette_upload_new: "Upload new image",
    color_palette_copied: "Copied!",
    color_palette_copy: "Copy",
    color_palette_step1_title: "Drop any image",
    color_palette_step1_desc: "PNG, JPG, WEBP, GIF — any image format works.",
    color_palette_step2_title: "Adjust color count",
    color_palette_step2_desc: "From 2 to 10 dominant colors extracted by pixel sampling.",
    color_palette_step3_title: "Copy & use",
    color_palette_step3_desc: "Click any color to copy HEX to clipboard instantly.",
    color_palette_tech_note: "no server, no library, pure browser technology.",

    // ============ CSS TOOLKIT ============
    ct_copy: "Copy",
    ct_copied: "Copied!",
    ct_color: "Color",
    ct_type: "Type",
    ct_blur: "Blur",
    ct_opacity: "Opacity",
    ct_br_sync: "Edit all corners together",
    ct_br_sync_tip:
      "When checked, changing one corner changes all four. Uncheck to set each independently.",
    ct_br_tl: "Top left",
    ct_br_tr: "Top right",
    ct_br_br: "Bottom right",
    ct_br_bl: "Bottom left",
    ct_bs_layers: "Layers",
    ct_bs_layers_tip:
      "You can stack multiple shadows on the same element to create depth or complex effects.",
    ct_bs_layer_inset: "Inset shadow",
    ct_bs_layer_drop: "Drop shadow",
    ct_bs_type_tip:
      "Outset puts the shadow outside the element. Inset puts it inside, making the element look pressed in.",
    ct_bs_outset: "Outset",
    ct_bs_inset: "Inset",
    ct_bs_x: "X offset",
    ct_bs_x_tip: "Horizontal shadow position. Positive moves right, negative moves left.",
    ct_bs_y: "Y offset",
    ct_bs_y_tip: "Vertical shadow position. Positive moves down, negative moves up.",
    ct_bs_blur_tip:
      "How soft the shadow edges are. 0 = sharp edge, higher = smoother and more spread out.",
    ct_bs_spread: "Spread",
    ct_bs_spread_tip:
      "Makes the shadow bigger or smaller than the element. Negative shrinks it, positive expands it.",
    ct_bs_color_tip: "The base color of the shadow before opacity is applied.",
    ct_bs_opacity_tip: "How transparent the shadow is. 0% = invisible, 100% = fully solid color.",
    ct_ft_image: "Image",
    ct_ft_image_tip: "Pick a preset image or upload your own to see how the filter looks.",
    ct_ft_blur_tip: "Softens the image, making it look out of focus. Higher = more blurred.",
    ct_ft_brightness: "Brightness",
    ct_ft_brightness_tip:
      "How light or dark the image is. 100% = original, 0% = pure black, 200% = very bright.",
    ct_ft_contrast: "Contrast",
    ct_ft_contrast_tip:
      "Difference between dark and bright areas. 0% = all gray, 100% = original, 200% = very contrasty.",
    ct_ft_saturate: "Saturate",
    ct_ft_saturate_tip:
      "Color intensity. 0% = black and white, 100% = original, 200% = very vivid colors.",
    ct_ft_hue: "Hue rotate",
    ct_ft_hue_tip: "Shifts all colors around the color wheel. Try 180° to invert colors.",
    ct_ft_sepia: "Sepia",
    ct_ft_sepia_tip: "Old-photo brownish tint. 100% = full vintage look.",
    ct_ft_grayscale: "Grayscale",
    ct_ft_grayscale_tip: "Removes color. 100% = pure black and white.",
    ct_ft_invert: "Invert",
    ct_ft_invert_tip: "Flips all colors to their opposite. 100% = negative photo effect.",
    ct_ft_reset: "Reset all filters",
    ct_gm_bg: "Background",
    ct_gm_bg_tip:
      "Glassmorphism only works on top of a colorful background. Try different presets to see the effect.",
    ct_gm_blur_tip:
      "How much the background behind the glass gets blurred. Higher = more frosted look.",
    ct_gm_bg_opacity: "Background opacity",
    ct_gm_bg_opacity_tip:
      "How see-through the glass card is. Lower values let more background show through.",
    ct_gm_saturation: "Saturation",
    ct_gm_saturation_tip:
      "Boosts color intensity of what's behind the glass. Makes the effect more vivid.",
    ct_gm_radius: "Border radius",
    ct_gm_radius_tip: "How rounded the corners of the glass card are.",
    ct_gm_border_opacity: "Border opacity",
    ct_gm_border_opacity_tip: "A thin outline that gives the glass card definition and depth.",
    ct_gm_color_tip:
      "Tint color of the glass effect. White gives a neutral frosted look, other colors give a tinted glass.",
    ct_gr_type_tip:
      "Linear goes in a straight line. Radial spreads from the center outwards. Conic wraps around like a pie chart.",
    ct_gr_angle: "Angle",
    ct_gr_angle_tip:
      "Direction the gradient flows. 0° goes upward, 90° to the right, 180° downward.",
    ct_gr_colors: "Colors",
    ct_gr_colors_tip:
      "Drag the dots on the timeline to reposition. Tap empty space on the bar to add a stop.",
    ct_gr_remove_stop: "Remove stop",
    ct_sub_gradient:
      "Create linear, radial and conic gradients with multiple color stops. Drag stops along the bar and adjust the angle.",
    ct_sub_shadow:
      "Build complex shadows by stacking multiple layers. Each with its own color, offset, blur and spread.",
    ct_sub_glass:
      "The frosted glass effect. Combine background blur, transparency and a subtle border.",
    ct_sub_radius: "Round each corner independently: drag the handles or use the four sliders.",
    ct_sub_filter:
      "Apply CSS filter functions: blur, brightness, contrast, saturate, hue-rotate, grayscale, sepia and invert.",

    // ============ MARKDOWN EDITOR ============
    me_subtitle:
      "A live markdown editor with auto-save. Write on the left, see formatted output on the right. Everything stays in your browser.",
    me_pane_editor: "Editor",
    me_pane_preview: "Preview",
    me_stats_live: "Live",
    me_stats_words: "words",
    me_stats_chars: "chars",
    me_btn_clear: "Clear",
    me_btn_download: "Download .md",
    me_placeholder: "Start typing markdown...",
    me_confirm_clear: "Clear all content? This cannot be undone.",
    me_step1_title: "Type or paste markdown",
    me_step1_desc: "Write in the editor on the left. All standard markdown syntax is supported.",
    me_step2_title: "See live preview",
    me_step2_desc: "The right panel updates instantly as you type — no compile step, no delay.",
    me_step3_title: "Save or download",
    me_step3_desc: "Your text is auto-saved in the browser. Download as .md when ready.",
    me_tech_note: "no external library, no server roundtrip.",

    // ============ SVG EDITOR ============
    svg_subtitle:
      "Import an existing SVG to edit, or draw new shapes from scratch. Recolor, resize, delete — export when done.",
    svg_tool: "Tool",
    svg_tool_tooltip: "Hand to pan, Select to edit shapes, others to draw.",
    svg_tool_hand: "Hand",
    svg_tool_select: "Select",
    svg_tool_rect: "Rectangle",
    svg_tool_circle: "Circle",
    svg_tool_line: "Line",
    svg_tool_pen: "Pen",
    svg_selected: "Selected",
    svg_fill: "Fill",
    svg_fill_tooltip: "Inside color of the shape.",
    svg_stroke: "Stroke",
    svg_stroke_tooltip: "Outline color of the shape.",
    svg_stroke_width: "Stroke width",
    svg_stroke_width_tooltip: "How thick the outline is.",
    svg_opacity: "Opacity",
    svg_delete: "Delete shape",
    svg_zoom: "Zoom",
    svg_actions: "Actions",
    svg_undo: "Undo",
    svg_clear: "Clear",
    svg_import: "Import SVG",
    svg_export: "Export SVG",
    svg_shape: "shape",
    svg_shapes: "shapes",
    svg_shapes_many: "shapes",
    svg_hint_hand: "Drag the canvas to pan around.",
    svg_hint_empty: "Import a SVG or draw something to start editing.",
    svg_hint_select: "Click any shape to edit its properties.",
    svg_confirm_import: "Replace current canvas with imported SVG? This cannot be undone.",
    svg_alert_no_shapes: "No supported shapes found in this SVG file.",
    svg_step1_title: "Import or draw",
    svg_step1_desc:
      "Upload an existing SVG to edit, or draw new shapes from scratch with the toolset.",
    svg_step2_title: "Select & edit",
    svg_step2_desc:
      "Click any shape with the Select tool to change fill, stroke, opacity or delete it.",
    svg_step3_title: "Export as SVG",
    svg_step3_desc: "Save your work as a clean SVG file ready for any design tool.",
    svg_tech_note:
      "SVG files are parsed with DOMParser and rendered as native React elements — no canvas raster, infinitely scalable output.",

    // ============ MARKDOWN PREVIEW LABELS (Projects card) ============

    // ============ DESKTOP ONLY ============
    desktop_only_badge: "Desktop only",
    desktop_only_title: "Best on desktop",
    desktop_only_desc:
      "The SVG Editor needs precise mouse input and a wide canvas. Please open this project on a laptop or desktop computer for the full experience.",
    desktop_only_back: "Back to projects",

    // ============ MOBILE SIDEBAR WITH LINKS ============
    sidebar_find_me: "Socials",
  },

  cs: {
    // ============ NAVBAR ============
    nav_about: "O mně",
    nav_projects: "Projekty",
    back_to_projects: "Zpět na projekty",
    back_home: "Zpět domů",
    nav_contact: "Kontakt",

    // ============ HERO ============
    hero_eyebrow: "Hledám práci",
    hero_role: "Frontend Developer & UI/UX Designer.",
    hero_desc:
      "Převádím vizuální koncepty do čistého, funkčního kódu. Propojuji design a vývoj bez zbytečných překážek.",
    hero_btn_projects: "Zobrazit projekty",
    hero_btn_cv: "Stáhnout CV",
    hero_btn_figma: "Figma soubor ↗",

    // ============ STATS ============
    stat_years: "Let na volné noze",
    stat_projects: "Projektů na volné noze",

    // ============ LANGUAGES ============
    lang_en: "Vyšší středně pokročilý",
    lang_ua: "Rodilý mluvčí",
    lang_cz: "Začátečník",

    // ============ SKILLS ============
    skills_eyebrow: "Dovednosti",
    skills_title: "S čím pracuji.",
    skill_confident: "Pokročilý",
    skill_intermediate: "Středně pokročilý",

    // ============ HOME PROJECTS CAROUSEL ============
    projects_eyebrow: "Vybrané práce",
    projects_title: "Co jsem vytvořil.",
    projects_subtitle:
      "Sbírka malých, ale funkčních nástrojů — každý je zaměřený průzkum konkrétní webové technologie. Vše běží zcela na straně klienta.",

    fig_label: "Obr.",
    proj_dict_stat_words: "slov a frází",
    proj_dict_stat_modes: "režimů procvičování",
    proj_dict_stat_ui: "rozhraní",
    proj_dict_live: "Živý produkt",
    proj_dict_pos: "podst. jm. · webová aplikace",
    proj_dict_desc:
      "Česká slovní zásoba pro Ukrajince a anglicky mluvící: 15 000 slov od A1 do C2 se zvukem a opakováním v intervalech.",
    proj_dict_long:
      "Česká slovní zásoba pro Ukrajince a anglicky mluvící: asi 15 000 slov a frází od A1 do C2, každé s ukázkovou větou a nahrávkou rodilého mluvčího. 15 režimů procvičování s opakováním v intervalech, lekce s testy úrovní, interaktivní atlas a synchronizace postupu mezi zařízeními.",
    proj_dict_example_tr: "Наша родина живе у великому місті.",
    proj_video_desc: "Komprese videa na straně klienta bez jakékoli serverové interakce.",
    proj_video_long:
      "Zmenšete video soubory až o 90 % bez viditelné ztráty kvality. Běží celé ve vašem prohlížeči přes FFmpeg.wasm — nic se nenahrává na server.",

    proj_audio_desc: "Extrahujte zvuk z libovolného videa přímo v prohlížeči.",
    proj_audio_long:
      "Extrahujte zvuk z video souborů ve formátu MP3, M4A nebo WAV. Veškeré zpracování probíhá v prohlížeči.",

    proj_palette_desc: "Extrahujte dominantní barvy z libovolného obrázku okamžitě.",
    proj_palette_long:
      "Přetáhněte obrázek a okamžitě extrahujte jeho dominantní barvy. Kliknutím na vzorek zkopírujete hex kód do schránky.",

    proj_toolkit_desc: "Vizuální generátory pro gradienty, stíny, glassmorphism a další.",
    proj_toolkit_long:
      "Pět vizuálních generátorů v jednom: gradienty, stíny, glassmorphism, zaoblení rohů a CSS filtry. Upravujte ovládací prvky, kopírujte kód.",

    proj_markdown_desc:
      "Pište Markdown vlevo, formátovaný výstup vpravo. Poznámky se ukládají lokálně.",
    proj_markdown_long:
      "Živý markdown editor s automatickým ukládáním. Pište vlevo, formátovaný výstup vidíte vpravo. Poznámky přetrvávají přes localStorage.",
    proj_svg_desc: "Importujte existující SVG soubory nebo kreslete od nuly.",
    proj_svg_long:
      "Importujte existující SVG soubory nebo kreslete od nuly. Přebarvujte, měňte velikost, mažte tvary — pak exportujte jako čistý SVG.",

    // ============ ABOUT ============
    about_eyebrow: "O mně",
    about_title: "Kdo jsem.",
    about_p1:
      "Frontend developer se 4 lety zkušeností na volné noze — tvorba responzivních webů a rozhraní.",
    about_p2: "Zázemí v UI/UX designu mi dává výhodu — od návrhu ke kódu bez zbytečného předávání.",
    about_p3:
      "Rád se učím nové věci — nové nástroje a frameworky zvládám rychle a každý projekt beru jako příležitost k růstu. Nevadí mi pustit se do neznámého kódu nebo stacku.",
    about_p4:
      "Aktivně se učím česky a jsem připraven nastoupit do česky mluvícího týmu — vidím to jako nejrychlejší způsob, jak se posunout profesně i jazykově. Bydlím v Kolíně, ochoten přestěhovat se za prací.",

    // ============ CONTACT ============
    contact_eyebrow: "Spojte se se mnou",
    contact_title: "Pojďme si promluvit.",
    contact_email: "E-mail",
    contact_phone: "Telefon",
    contact_location: "Místo",
    contact_languages: "Jazyky",
    contact_location_val: "Kolín, Česko",

    // ============ FOOTER ============
    footer_built: "Vytvořeno v Reactu",

    // ============ CONTACT MODAL ============
    modal_eyebrow: "Kontaktujte mě",
    modal_title: "Jak se chcete spojit?",
    modal_whatsapp_desc: "Chat nebo hovor okamžitě",
    modal_cancel: "Zrušit",

    // ============ SHARED PROJECT PAGE STRINGS ============
    page_how_title: "Jak to funguje",
    page_powered_by: "Běží na",

    // ============ VIDEO COMPRESSOR ============
    vc_subtitle:
      "Zmenšete velikost video souboru až o 90 % bez viditelné ztráty kvality. Běží zcela ve vašem prohlížeči — vaše soubory nikdy neopustí zařízení.",
    vc_drop: "Přetáhněte video sem",
    vc_drop_sub: "nebo klikněte pro výběr · MP4, MOV, MKV, AVI, WEBM",
    vc_target_size: "Cílová velikost (MB)",
    vc_resolution: "Rozlišení",
    vc_res_original: "Původní",
    vc_btn_compress: "Komprimovat video",
    vc_btn_compressing: "Komprimuji...",
    vc_btn_loading: "Načítám engine...",
    vc_stat_original: "Původní",
    vc_stat_compressed: "Zkomprimováno",
    vc_stat_saved: "Ušetřeno",
    vc_btn_download: "Stáhnout",
    vc_btn_another: "Komprimovat další",
    vc_step1_title: "Vyberte video",
    vc_step1_desc:
      "Přetáhněte libovolný MP4, MOV, MKV, AVI nebo WEBM soubor. Nic neopustí vaše zařízení.",
    vc_step2_title: "Nastavte cílovou velikost",
    vc_step2_desc: "Vyberte, jak malý má být výstup. V případě potřeby upravte rozlišení.",
    vc_step3_title: "Stáhnout",
    vc_step3_desc: "Komprese probíhá zcela ve vašem prohlížeči přes FFmpeg WebAssembly.",
    vc_tech_note:
      "stejný engine, jaký používají profesionální video nástroje, běžící zcela ve vašem prohlížeči.",
    vc_err_format: "Neplatný formát. Akceptováno: MP4, WEBM, MOV, MKV, AVI.",
    vc_err_compression: "Komprese selhala:",
    vc_err_mobile_size:
      "Soubor je pro mobil příliš velký (max. {mb} MB). Pro větší soubory otevřete tento nástroj na počítači.",
    vc_mobile_notice:
      "Mobilní limit: max. {mb} MB. Soubory se zpracovávají lokálně ve vašem prohlížeči a nikam se neodesílají.",
    vc_eta_calc: "Počítám...",
    vc_eta_remaining: "zbývá",

    // ============ AUDIO EXTRACTOR ============
    ae_subtitle:
      "Extrahujte zvuk z libovolného video souboru. Převádějte MP4, MOV, MKV na MP3, M4A nebo WAV přímo v prohlížeči — žádný server, žádné nahrávání.",
    ae_drop: "Přetáhněte video sem",
    ae_drop_sub: "nebo klikněte pro výběr · MP4, MOV, MKV, AVI, WEBM",
    ae_bitrate: "Bitrate",
    ae_btn_extract: "Extrahovat zvuk",
    ae_btn_extracting: "Extrahuji...",
    ae_btn_loading: "Načítám engine...",
    ae_stat_source: "Zdroj",
    ae_stat_audio: "Audio",
    ae_stat_format: "Formát",
    ae_btn_download: "Stáhnout",
    ae_btn_another: "Extrahovat další",
    ae_step1_title: "Vyberte video",
    ae_step1_desc:
      "Přetáhněte libovolný MP4, MOV, MKV, AVI nebo WEBM soubor. Nic neopustí vaše zařízení.",
    ae_step2_title: "Vyberte formát a bitrate",
    ae_step2_desc: "Vyberte MP3, M4A nebo WAV. Vyšší bitrate = lepší kvalita, větší soubor.",
    ae_step3_title: "Stáhněte audio",
    ae_step3_desc: "Audio je extrahováno ve vašem prohlížeči přes FFmpeg WebAssembly.",
    ae_tech_note: "profesionální zpracování zvuku běžící zcela ve vašem prohlížeči.",
    ae_err_format: "Neplatný formát. Akceptováno: MP4, WEBM, MOV, MKV, AVI.",
    ae_err_extraction: "Extrakce selhala:",
    ae_err_mobile_size:
      "Soubor je pro mobil příliš velký (max. {mb} MB). Pro větší soubory otevřete tento nástroj na počítači.",
    ae_mobile_notice:
      "Mobilní limit: max. {mb} MB. Soubory se zpracovávají lokálně ve vašem prohlížeči a nikam se neodesílají.",
    ae_fmt_mp3_desc: "Univerzální formát, funguje všude",
    ae_fmt_m4a_desc: "Lepší kvalita při stejném bitrate",
    ae_fmt_wav_desc: "Bezztrátový, nekomprimovaný zvuk",

    // ============ COLOR PALETTE ============
    color_palette_subtitle:
      "Extrahujte dominantní barvy z libovolného obrázku okamžitě. Ideální pro hledání barevných schémat, přizpůsobení značkovým barvám nebo jen pro průzkum.",
    color_palette_drop: "Přetáhněte obrázek sem",
    color_palette_drop_sub: "nebo klikněte pro výběr · PNG, JPG, WEBP, GIF",
    color_palette_colors: "Barvy",
    color_palette_upload_new: "Nahrát nový obrázek",
    color_palette_copied: "Zkopírováno!",
    color_palette_copy: "Kopírovat",
    color_palette_step1_title: "Přetáhněte libovolný obrázek",
    color_palette_step1_desc: "PNG, JPG, WEBP, GIF — funguje jakýkoli formát obrázku.",
    color_palette_step2_title: "Upravte počet barev",
    color_palette_step2_desc: "Od 2 do 10 dominantních barev extrahovaných vzorkováním pixelů.",
    color_palette_step3_title: "Kopírujte a používejte",
    color_palette_step3_desc:
      "Klikněte na libovolnou barvu pro okamžité zkopírování HEX do schránky.",
    color_palette_tech_note: "žádný server, žádná knihovna, čistá technologie prohlížeče.",

    // ============ CSS TOOLKIT ============
    ct_copy: "Kopírovat",
    ct_copied: "Zkopírováno!",
    ct_color: "Barva",
    ct_type: "Typ",
    ct_blur: "Rozostření",
    ct_opacity: "Krytí",
    ct_br_sync: "Upravovat všechny rohy najednou",
    ct_br_sync_tip:
      "Když je zaškrtnuto, změna jednoho rohu změní všechny čtyři. Odškrtněte pro nastavení každého zvlášť.",
    ct_br_tl: "Vlevo nahoře",
    ct_br_tr: "Vpravo nahoře",
    ct_br_br: "Vpravo dole",
    ct_br_bl: "Vlevo dole",
    ct_bs_layers: "Vrstvy",
    ct_bs_layers_tip:
      "Na jeden prvek můžete vrstvit více stínů a vytvořit tak hloubku nebo složitější efekty.",
    ct_bs_layer_inset: "Vnitřní stín",
    ct_bs_layer_drop: "Vnější stín",
    ct_bs_type_tip:
      "Vnější stín je mimo prvek. Vnitřní stín je uvnitř, takže prvek vypadá zamáčknutý.",
    ct_bs_outset: "Vnější",
    ct_bs_inset: "Vnitřní",
    ct_bs_x: "Posun X",
    ct_bs_x_tip: "Vodorovná poloha stínu. Kladná hodnota posouvá doprava, záporná doleva.",
    ct_bs_y: "Posun Y",
    ct_bs_y_tip: "Svislá poloha stínu. Kladná hodnota posouvá dolů, záporná nahoru.",
    ct_bs_blur_tip:
      "Jak měkké jsou okraje stínu. 0 = ostrý okraj, vyšší = jemnější a rozptýlenější.",
    ct_bs_spread: "Rozprostření",
    ct_bs_spread_tip:
      "Zvětší nebo zmenší stín oproti prvku. Záporná hodnota ho zmenšuje, kladná zvětšuje.",
    ct_bs_color_tip: "Základní barva stínu před použitím krytí.",
    ct_bs_opacity_tip: "Jak průhledný je stín. 0 % = neviditelný, 100 % = plná barva.",
    ct_ft_image: "Obrázek",
    ct_ft_image_tip:
      "Vyberte přednastavený obrázek nebo nahrajte vlastní a uvidíte, jak filtr vypadá.",
    ct_ft_blur_tip: "Změkčí obrázek, takže působí neostře. Vyšší = rozmazanější.",
    ct_ft_brightness: "Jas",
    ct_ft_brightness_tip:
      "Jak světlý nebo tmavý je obrázek. 100 % = originál, 0 % = černá, 200 % = velmi světlý.",
    ct_ft_contrast: "Kontrast",
    ct_ft_contrast_tip:
      "Rozdíl mezi tmavými a světlými místy. 0 % = vše šedé, 100 % = originál, 200 % = velmi kontrastní.",
    ct_ft_saturate: "Sytost",
    ct_ft_saturate_tip:
      "Intenzita barev. 0 % = černobílý, 100 % = originál, 200 % = velmi syté barvy.",
    ct_ft_hue: "Posun odstínu",
    ct_ft_hue_tip: "Posune všechny barvy po barevném kruhu. Zkuste 180° pro opačné barvy.",
    ct_ft_sepia: "Sépie",
    ct_ft_sepia_tip: "Hnědavý nádech staré fotografie. 100 % = plný vintage vzhled.",
    ct_ft_grayscale: "Odstíny šedi",
    ct_ft_grayscale_tip: "Odstraní barvy. 100 % = čistě černobílý.",
    ct_ft_invert: "Inverze",
    ct_ft_invert_tip: "Převrátí všechny barvy na opačné. 100 % = efekt negativu.",
    ct_ft_reset: "Obnovit všechny filtry",
    ct_gm_bg: "Pozadí",
    ct_gm_bg_tip:
      "Glassmorphism funguje jen na barevném pozadí. Vyzkoušejte různé předvolby a uvidíte efekt.",
    ct_gm_blur_tip: "Jak moc se rozostří pozadí za sklem. Vyšší = matnější vzhled.",
    ct_gm_bg_opacity: "Krytí pozadí",
    ct_gm_bg_opacity_tip: "Jak průhledná je skleněná karta. Nižší hodnoty propustí víc pozadí.",
    ct_gm_saturation: "Sytost",
    ct_gm_saturation_tip: "Zvýší sytost barev za sklem. Efekt pak působí živěji.",
    ct_gm_radius: "Zaoblení rohů",
    ct_gm_radius_tip: "Jak moc jsou zaoblené rohy skleněné karty.",
    ct_gm_border_opacity: "Krytí okraje",
    ct_gm_border_opacity_tip: "Tenký okraj, který skleněné kartě dodá obrys a hloubku.",
    ct_gm_color_tip:
      "Barva tónování skla. Bílá dává neutrální matný vzhled, ostatní barvy tónované sklo.",
    ct_gr_type_tip:
      "Lineární vede v přímce. Radiální se šíří ze středu ven. Kuželový se otáčí kolem středu jako koláčový graf.",
    ct_gr_angle: "Úhel",
    ct_gr_angle_tip: "Směr gradientu. 0° vede nahoru, 90° doprava, 180° dolů.",
    ct_gr_colors: "Barvy",
    ct_gr_colors_tip:
      "Přetažením bodů na liště změníte jejich pozici. Klepnutím na prázdné místo přidáte nový bod.",
    ct_gr_remove_stop: "Odebrat bod",
    ct_sub_gradient:
      "Vytvářejte lineární, radiální a kuželové gradienty s více barevnými body. Posouvejte body po liště a upravujte úhel.",
    ct_sub_shadow:
      "Vytvářejte komplexní stíny skládáním více vrstev. Každá s vlastní barvou, posunem, rozostřením a rozprostřením.",
    ct_sub_glass: "Efekt matného skla. Kombinujte rozostření pozadí, průhlednost a jemný okraj.",
    ct_sub_radius: "Zaoblete každý roh zvlášť: táhněte za úchyty nebo použijte čtyři posuvníky.",
    ct_sub_filter:
      "Aplikujte CSS filter funkce: blur, brightness, contrast, saturate, hue-rotate, grayscale, sepia a invert.",

    // ============ MARKDOWN EDITOR ============
    me_subtitle:
      "Živý markdown editor s automatickým ukládáním. Pište vlevo, formátovaný výstup vidíte vpravo. Vše zůstává ve vašem prohlížeči.",
    me_pane_editor: "Editor",
    me_pane_preview: "Náhled",
    me_stats_live: "Živě",
    me_stats_words: "slov",
    me_stats_chars: "znaků",
    me_btn_clear: "Vymazat",
    me_btn_download: "Stáhnout .md",
    me_placeholder: "Začněte psát markdown...",
    me_confirm_clear: "Vymazat veškerý obsah? Tuto akci nelze vrátit.",
    me_step1_title: "Pište nebo vložte markdown",
    me_step1_desc: "Pište v editoru vlevo. Podporována je veškerá standardní markdown syntaxe.",
    me_step2_title: "Sledujte živý náhled",
    me_step2_desc:
      "Pravý panel se aktualizuje okamžitě při psaní — žádné kompilování, žádné zpoždění.",
    me_step3_title: "Uložte nebo stáhněte",
    me_step3_desc:
      "Váš text se automaticky ukládá v prohlížeči. Stáhněte jako .md, až budete hotovi.",
    me_tech_note: "žádná externí knihovna, žádná komunikace se serverem.",

    // ============ SVG EDITOR ============
    svg_subtitle:
      "Importujte existující SVG pro úpravy nebo kreslete nové tvary od nuly. Přebarvujte, měňte velikost, mažte — exportujte, až budete hotovi.",
    svg_tool: "Nástroj",
    svg_tool_tooltip: "Ruka pro posun, Výběr pro úpravy tvarů, ostatní pro kreslení.",
    svg_tool_hand: "Ruka",
    svg_tool_select: "Výběr",
    svg_tool_rect: "Obdélník",
    svg_tool_circle: "Kruh",
    svg_tool_line: "Čára",
    svg_tool_pen: "Pero",
    svg_selected: "Vybráno",
    svg_fill: "Výplň",
    svg_fill_tooltip: "Vnitřní barva tvaru.",
    svg_stroke: "Obrys",
    svg_stroke_tooltip: "Barva obrysu tvaru.",
    svg_stroke_width: "Šířka obrysu",
    svg_stroke_width_tooltip: "Jak tlustý je obrys.",
    svg_opacity: "Krytí",
    svg_delete: "Smazat tvar",
    svg_zoom: "Přiblížení",
    svg_actions: "Akce",
    svg_undo: "Zpět",
    svg_clear: "Vymazat",
    svg_import: "Importovat SVG",
    svg_export: "Exportovat SVG",
    svg_shape: "tvar",
    svg_shapes: "tvary",
    svg_shapes_many: "tvarů",
    svg_hint_hand: "Přetáhněte plátno pro posun.",
    svg_hint_empty: "Importujte SVG nebo něco nakreslete pro zahájení úprav.",
    svg_hint_select: "Klikněte na libovolný tvar pro úpravu jeho vlastností.",
    svg_confirm_import: "Nahradit aktuální plátno importovaným SVG? Tuto akci nelze vrátit.",
    svg_alert_no_shapes: "V tomto SVG souboru nebyly nalezeny žádné podporované tvary.",
    svg_step1_title: "Importujte nebo kreslete",
    svg_step1_desc:
      "Nahrajte existující SVG pro úpravy nebo kreslete nové tvary od nuly pomocí sady nástrojů.",
    svg_step2_title: "Vyberte a upravujte",
    svg_step2_desc:
      "Klikněte na libovolný tvar nástrojem Výběr pro změnu výplně, obrysu, průhlednosti nebo jeho smazání.",
    svg_step3_title: "Exportujte jako SVG",
    svg_step3_desc:
      "Uložte svou práci jako čistý SVG soubor připravený pro jakýkoli designový nástroj.",
    svg_tech_note:
      "SVG soubory jsou parsovány pomocí DOMParser a renderovány jako nativní React elementy — žádný canvas raster, nekonečně škálovatelný výstup.",

    // ============ MARKDOWN PREVIEW LABELS ============

    // ============ DESKTOP ONLY ============
    desktop_only_badge: "Pouze desktop",
    desktop_only_title: "Nejlépe na počítači",
    desktop_only_desc:
      "SVG Editor vyžaduje přesné ovládání myší a široké plátno. Otevřete tento projekt na notebooku nebo počítači pro plnohodnotný zážitek.",
    desktop_only_back: "Zpět na projekty",

    // ============ MOBILE SIDEBAR WITH LINKS ============
    sidebar_find_me: "Sítě",
  },
};
