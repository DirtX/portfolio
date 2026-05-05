import './Contact.css';

export default function Contact() {
  return (
    <div className="page-placeholder">
      <h2 className="contact-header">Get in Touch.</h2>
      <div className="contact-info-block">
        <div>
          <span className="contact-label">Email</span>
          <a href="mailto:ggdirtxgg@gmail.com" className="contact-link">ggdirtxgg@gmail.com</a>
        </div>
        <div>
          <span className="contact-label">Phone</span>
          <a href="tel:+420xxxxxxxx" className="contact-link">+420 xxx xxx xxx</a>
        </div>
        <div className="contact-location">
          Based in Kolín, Czech Republic.<br/>
          Available to relocate to Prague.
        </div>
      </div>
    </div>
  );
}