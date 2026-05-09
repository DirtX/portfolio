import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
    children,
    variant = 'primary',
    to,
    href,
    ...props
}) {
    const btnClass = `base-btn btn-${variant}`;

    if (to) {
        return (
            <Link to={to} className={btnClass} {...props}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={btnClass} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button className={btnClass} {...props}>
            {children}
        </button>
    )
}