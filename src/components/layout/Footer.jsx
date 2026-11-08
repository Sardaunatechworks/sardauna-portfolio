import { Link } from 'react-router-dom';
import { usePortfolio } from '../../hooks/usePortfolio';

export default function Footer() {
    const { personalInfo } = usePortfolio();
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <Link to="/" className="footer__wordmark">MA.</Link>
                        <p className="footer__tagline body-sm">
                            Building technology. Leading people.<br />Creating meaningful impact.
                        </p>
                    </div>

                    <div className="footer__nav-group">
                        <h4 className="footer__nav-title">Navigate</h4>
                        <nav aria-label="Footer navigation">
                            <Link to="/about" className="footer__link">About</Link>
                            <Link to="/experience" className="footer__link">Experience</Link>
                            <Link to="/projects" className="footer__link">Projects</Link>
                            <Link to="/community" className="footer__link">Community</Link>
                        </nav>
                    </div>

                    <div className="footer__nav-group">
                        <h4 className="footer__nav-title">Connect</h4>
                        <nav aria-label="Connect links">
                            <Link to="/contact" className="footer__link">Contact</Link>
                            <Link to="/insights" className="footer__link">Insights</Link>
                            {personalInfo.github && (
                                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="footer__link">
                                    GitHub ↗
                                </a>
                            )}
                        </nav>
                    </div>
                </div>

                <hr className="divider" />

                <div className="footer__bottom">
                    <p className="caption">
                        © {year} Muhammad Auwal Abubakar. All rights reserved.
                    </p>
                    <p className="caption">
                        Dutse, Jigawa State, Nigeria
                    </p>
                </div>
            </div>

            <style>{`
                .footer {
                    background-color: var(--color-white);
                    border-top: 1px solid var(--color-border-light);
                    padding: var(--space-16) 0 var(--space-8);
                    margin-top: var(--space-24);
                }

                .footer__top {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-10);
                    margin-bottom: var(--space-10);
                }

                .footer__wordmark {
                    font-family: var(--font-serif);
                    font-size: var(--text-2xl);
                    font-weight: var(--weight-bold);
                    color: var(--color-ink);
                    text-decoration: none;
                    display: inline-block;
                    margin-bottom: var(--space-3);
                }

                .footer__tagline {
                    max-width: 280px;
                }

                .footer__nav-group {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-3);
                }

                .footer__nav-title {
                    font-size: var(--text-xs);
                    font-weight: var(--weight-semibold);
                    letter-spacing: var(--tracking-widest);
                    text-transform: uppercase;
                    color: var(--color-ink);
                    margin-bottom: var(--space-1);
                }

                .footer__link {
                    display: block;
                    font-size: var(--text-sm);
                    color: var(--color-secondary);
                    text-decoration: none;
                    padding: var(--space-1) 0;
                    transition: color var(--duration-fast) var(--ease-out);
                }

                .footer__link:hover {
                    color: var(--color-ink);
                }

                .footer__bottom {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-2);
                    padding-top: var(--space-6);
                }

                @media (min-width: 768px) {
                    .footer__top {
                        grid-template-columns: 2fr 1fr 1fr;
                    }

                    .footer__bottom {
                        flex-direction: row;
                        justify-content: space-between;
                    }
                }
            `}</style>
        </footer>
    );
}
