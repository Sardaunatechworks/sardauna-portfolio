import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { usePortfolio } from '../hooks/usePortfolio';
import { useSEO } from '../hooks/useSEO';
import { Users, Heart, Sparkles, MapPin, Calendar, Award } from 'lucide-react';

export default function CommunityPage() {
    useSEO({
        title: 'Community Leadership & Ecosystem Impact | Muhammad Auwal Abubakar',
        description: 'Explore community leadership initiatives, Google Developer Groups Dutse involvement, Techfort programmes, and youth tech education.'
    });

    const { community } = usePortfolio();

    const initiatives = [
        {
            title: "Techfort Community",
            role: "Director of Projects and Programs",
            period: "2025 – Present",
            category: "Ecosystem Leadership",
            description: "Directing technology-driven initiatives focused on digital literacy, tech empowerment, and youth development across northern Nigeria. Coordinating cross-functional teams in frontend, backend, and UI/UX design.",
            highlights: [
                "Spearheaded regional workshops and technical skills bootcamps",
                "Built structured mentorship pipelines for aspiring developers",
                "Coordinated curriculum delivery and project review sessions"
            ]
        },
        {
            title: "Google Developer Groups (GDG) Dutse",
            role: "Active Member & Contributor",
            period: "2024 – Present",
            category: "Developer Community",
            description: "Participating actively in GDG Dutse developer activities, technical knowledge exchanges, and community meetups to foster collaborative learning in the state.",
            highlights: [
                "Contributed to tech talks on modern web development practices",
                "Supported local developer ecosystem onboarding",
                "Promoted open-source contribution and developer tooling"
            ]
        },
        {
            title: "DevFest",
            role: "Volunteer & Community Supporter",
            period: "2024 – Present",
            category: "Conference Volunteering",
            description: "Volunteering during annual DevFest gatherings to facilitate attendee experience, session logistics, and developer networking.",
            highlights: [
                "Assisted in technical track logistics and coordination",
                "Engaged with developers and speakers from across the country",
                "Advocated for inclusive tech participation"
            ]
        },
        {
            title: "Coding Technology Digital Learning School",
            role: "Teaching Staff — Web & Digital Systems",
            period: "2026 – Present",
            category: "Technical Instruction",
            description: "Teaching core programming languages, web fundamentals, and software creation to students eager to build technical careers.",
            highlights: [
                "Hands-on instruction in HTML5, CSS3, JavaScript, PHP, and databases",
                "Guiding students through real-world portfolio project creation",
                "Fostering algorithmic problem-solving habits"
            ]
        }
    ];

    return (
        <div className="community-page">
            <header className="page-header bg-surface-alt">
                <div className="container">
                    <span className="eyebrow text-gold" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
                        ECOSYSTEM &amp; MENTORSHIP
                    </span>
                    <h1 className="h1 font-serif" style={{ marginBottom: 'var(--space-4)' }}>
                        Community Leadership &amp; Impact
                    </h1>
                    <p className="body-lg text-secondary" style={{ maxWidth: '720px' }}>
                        Believing that individual engineering growth is inseparable from community progress. An overview of grassroots developer initiatives, mentorship programs, and ecosystem volunteering.
                    </p>
                </div>
            </header>

            <div className="container" style={{ padding: 'var(--space-16) var(--space-4)' }}>
                {/* Community Philosophy Callout */}
                <div className="community-quote-block">
                    <div className="container--sm text-center">
                        <Sparkles size={24} className="text-gold" style={{ marginBottom: 'var(--space-3)' }} aria-hidden="true" />
                        <h2 className="h3 font-serif" style={{ marginBottom: 'var(--space-3)' }}>
                            Grassroots Empowerment as a Core Duty
                        </h2>
                        <p className="body-base text-secondary" style={{ lineHeight: 'var(--leading-relaxed)' }}>
                            In emerging tech hubs, the gap between having interest in technology and having access to mentors, structured curricula, and community support is substantial. By investing time in developer groups, hands-on teaching, and programmatic leadership, we help bridge that divide for the next wave of builders.
                        </p>
                    </div>
                </div>

                {/* Initiatives Grid */}
                <div className="community-initiatives" style={{ marginTop: 'var(--space-16)' }}>
                    <SectionHeading
                        kicker="APPOINTMENTS &amp; ENGAGEMENTS"
                        title="Active Community Roles"
                        subtitle="Organizations and movements where I actively contribute time, leadership, and technical guidance."
                    />

                    <div className="initiatives-grid">
                        {initiatives.map((item, idx) => (
                            <Card key={idx} padded hoverable className="initiative-card">
                                <div className="initiative-card__header">
                                    <div>
                                        <Badge variant="accent">{item.category}</Badge>
                                        <h3 className="h3 font-serif" style={{ margin: 'var(--space-3) 0 var(--space-1)' }}>
                                            {item.title}
                                        </h3>
                                        <p className="body-sm font-medium text-gold">
                                            {item.role}
                                        </p>
                                    </div>
                                    <span className="caption font-mono text-tertiary">
                                        {item.period}
                                    </span>
                                </div>

                                <p className="body-base text-secondary" style={{ margin: 'var(--space-4) 0', lineHeight: 'var(--leading-normal)' }}>
                                    {item.description}
                                </p>

                                <div className="initiative-card__highlights">
                                    <h4 className="caption text-tertiary" style={{ marginBottom: 'var(--space-2)' }}>
                                        Key Highlights
                                    </h4>
                                    <ul className="initiative-bullets">
                                        {item.highlights.map((h, hIdx) => (
                                            <li key={hIdx} className="caption text-secondary">
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Speaking & Workshop Invitation */}
                <div className="community-cta" style={{ marginTop: 'var(--space-20)' }}>
                    <Card padded className="community-cta-box bg-surface-alt">
                        <div style={{ maxWidth: '640px' }}>
                            <span className="eyebrow text-gold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                                INVITATION
                            </span>
                            <h3 className="h2 font-serif" style={{ marginBottom: 'var(--space-3)' }}>
                                Invite Muhammad to Speak or Facilitate
                            </h3>
                            <p className="body-base text-secondary" style={{ marginBottom: 'var(--space-6)' }}>
                                Open to participating in developer conferences, student bootcamps, youth entrepreneurship panels, and community tech workshops.
                            </p>
                            <Button to="/contact" variant="primary" size="md">
                                Request a Speaking Engagement
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            <style>{`
                .community-quote-block {
                    background-color: var(--color-surface);
                    border: 1px solid var(--color-border-light);
                    border-radius: var(--radius-md);
                    padding: var(--space-10) var(--space-6);
                }
                .initiatives-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: var(--space-8);
                }
                @media (min-width: 768px) {
                    .initiatives-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                .initiative-card {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .initiative-card__header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: var(--space-4);
                }
                .initiative-bullets {
                    list-style: none;
                    padding-left: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-2);
                }
                .initiative-bullets li {
                    position: relative;
                    padding-left: var(--space-4);
                }
                .initiative-bullets li::before {
                    content: "•";
                    position: absolute;
                    left: 0;
                    color: var(--color-gold);
                }
                .community-cta-box {
                    border: 1px dashed var(--color-border);
                }
            `}</style>
        </div>
    );
}
