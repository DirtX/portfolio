import { useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import "./ContactModal.css";

const PHONE = "+420739984652";
const PHONE_DISPLAY = "+420 739 984 652";

export default function ContactModal({ open, onClose }) {
  const { t } = useLang();

  // Feature: Translated contact options
  const OPTIONS = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      desc: t("modal_whatsapp_desc"),
      href: `https://wa.me/${PHONE.replace("+", "")}`,
      color: "#25D366",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0020.464 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
        </svg>
      ),
    },
    {
      id: "telegram",
      label: "Telegram",
      desc: "@XDirtX",
      href: "https://t.me/XDirtX",
      color: "#26A5E4",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
    {
      id: "viber",
      label: "Viber",
      desc: t("modal_viber_desc"),
      href: `viber://chat?number=%2B${PHONE.replace("+", "")}`,
      color: "#7360F2",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.776 6.13 20.36h.008l-.005 2.42s-.037.98.61 1.18c.78.243 1.24-.502 1.987-1.303.41-.44.973-1.087 1.4-1.578 3.85.323 6.812-.418 7.15-.528.78-.253 5.187-.82 5.905-6.67.738-6.032-.36-9.85-2.34-11.568l-.013-.005c-.6-.55-3.005-2.3-8.375-2.32 0 0-.395-.025-1.057-.012zm.063 1.69c.56-.004.898.014.898.014 4.543.014 6.717 1.38 7.227 1.84 1.673 1.434 2.534 4.873 1.91 9.91-.6 4.886-4.17 5.197-4.83 5.41-.28.09-2.882.733-6.155.522l-3.272 3.76c-.512.62-.96.6-.953-.13l.014-4.082c-.005 0-.012 0 0 0-4.77-1.323-4.49-6.297-4.435-8.9.052-2.6.547-4.732 1.998-6.165 1.958-1.78 5.48-2.04 7.115-2.07.16-.005.32-.01.483-.01zm.733 2.453c-.4 0-.4.608 0 .61 3.107.022 5.666 2.143 5.694 6.035 0 .42.62.42.615 0v-.005c-.034-4.188-2.823-6.617-6.305-6.64h-.004zM6.625 5.61a.892.892 0 00-.628.165h-.005c-.42.247-.798.566-1.094 1.012-.246.376-.378.748-.418 1.111-.022.215.005.43.062.638l.022.013c.295.873.683 1.711 1.158 2.494.611 1.131 1.363 2.18 2.235 3.124v.004c.876.886 1.826 1.624 2.766 2.27a13.083 13.083 0 002.886 1.49l.012.018c.276.13.578.198.882.21a2.097 2.097 0 001.13-.32c.43-.286.748-.668.984-1.118v-.008c.222-.424.147-.825-.176-1.097-.65-.563-1.353-1.063-2.098-1.493-.5-.288-1.005-.122-1.21.151l-.435.55c-.226.272-.635.235-.635.235l-.012.007c-3.057-.78-3.873-3.876-3.873-3.876s-.037-.422.243-.637l.547-.437c.262-.213.448-.717.155-1.216-.426-.748-.928-1.45-1.488-2.102-.123-.146-.305-.232-.5-.232l.005.004zm5.13 1.482c-.39.005-.385.6 0 .606 1.78.025 3.207 1.222 3.222 3.43.004.392.6.39.605 0v-.004c-.014-2.5-1.685-3.886-3.815-3.91h-.013zm.953 1.61c-.4-.013-.412.595-.018.61.797.04 1.205.475 1.275 1.305.04.397.62.376.612-.025h.005a2.044 2.044 0 00-1.84-1.886l-.034-.005zM4.43 13.755z" />
        </svg>
      ),
    },
  ];

  // Feature: Close modal on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Feature: Lock body scroll while modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="contact-modal-header">
          <p className="contact-modal-eyebrow">{t("modal_eyebrow")}</p>
          <h3 className="contact-modal-title">{t("modal_title")}</h3>
        </div>

        {/* OPTIONS */}
        <div className="contact-modal-options">
          {OPTIONS.map((opt) => (
            <a
              key={opt.id}
              href={opt.href}
              target={opt.id === "call" || opt.id === "viber" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="contact-modal-option"
              onClick={onClose}
            >
              <span className="contact-modal-option-icon" style={{ color: opt.color }}>
                {opt.icon}
              </span>
              <span className="contact-modal-option-text">
                <span className="contact-modal-option-label">{opt.label}</span>
                <span className="contact-modal-option-desc">{opt.desc}</span>
              </span>
              <span className="contact-modal-option-arrow">→</span>
            </a>
          ))}
        </div>

        {/* CANCEL */}
        <button className="contact-modal-cancel" onClick={onClose}>
          {t("modal_cancel")}
        </button>
      </div>
    </div>
  );
}
