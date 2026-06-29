import { useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ContentItem } from '../../data/content';
import './detail.css';

interface DetailProps {
  item: ContentItem;
  onClose: () => void;
}

function renderMarkdown(content: string) {
  function renderInlineMarkdown(line: string): ReactNode[] {
    const parts: ReactNode[] = [];
    const inlinePattern = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = inlinePattern.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }

      if (match[2]) {
        parts.push(<strong key={`${match.index}-strong`}>{match[2]}</strong>);
      }

      if (match[4] && match[5]) {
        parts.push(
          <a key={`${match.index}-link`} href={match[5]} target="_blank" rel="noreferrer">
            {match[4]}
          </a>
        );
      }

      lastIndex = inlinePattern.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }

    return parts;
  }

  return content.split('\n').map((line, index) => {
    const key = `${index}-${line}`;

    if (line.startsWith('# ')) {
      return <h3 className="detail-markdown__h1" key={key}>{renderInlineMarkdown(line.slice(2))}</h3>;
    }

    if (line.startsWith('## ')) {
      return <h4 className="detail-markdown__h2" key={key}>{renderInlineMarkdown(line.slice(3))}</h4>;
    }

    if (line.startsWith('- ')) {
      return <p className="detail-markdown__li" key={key}>{renderInlineMarkdown(line.slice(2))}</p>;
    }

    if (line.trim() === '---') {
      return <hr className="detail-markdown__hr" key={key} />;
    }

    if (line.trim() === '') {
      return null;
    }

    return <p className="detail-markdown__p" key={key}>{renderInlineMarkdown(line)}</p>;
  });
}

function Detail({ item, onClose }: DetailProps) {
  const visualImage = item.type === 'article' ? item.image : undefined;
  const visualVideo = item.type === 'article' ? item.video : undefined;
  const hasVisual = item.type === 'article' && Boolean(visualImage || visualVideo);
  const projectImages = item.type === 'project' ? item.images ?? [] : [];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <section className="detail-page" aria-label={`${item.title} detail`}>
      <button className="detail-close" onClick={onClose}>[ esc ]</button>

      <div className={`detail-layout${hasVisual ? '' : ' detail-layout--no-visual'}`}>
        <header className="detail-heading">
          <span className="detail-id">{item.id} — {item.type}</span>
          <h2 className="detail-title">{item.title}</h2>
          <p className="detail-meta">
            {item.type === 'article' ? item.date : `${item.year} — ${item.medium}`}
          </p>

          {item.type === 'project' && (
            <div className="detail-heading__project-copy">
              <p className="detail-desc">{item.description}</p>
              {item.links && item.links.length > 0 && (
                <div className="detail-links" aria-label={`${item.title} links`}>
                  {item.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {hasVisual && (
            <div
              className="detail-visual"
              style={{
                background: visualImage ? `url(${visualImage}) center / cover` : item.image ? `url(${item.image}) center / cover` : item.color,
              }}
            >
              {visualVideo ? (
                <video
                  className="detail-visual__video"
                  src={visualVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                null
              )}
            </div>
          )}
        </header>

        <main className="detail-body">
          {item.type === 'article' ? (
            <div className="detail-markdown">{renderMarkdown(item.content)}</div>
          ) : projectImages.length > 0 ? (
            <div className="detail-gallery" aria-label={`${item.title} gallery`}>
              {projectImages.map((image) => (
                <img key={image} src={image} alt="" loading="lazy" />
              ))}
            </div>
          ) : (
            null
          )}
        </main>
      </div>
    </section>
  );
}

export default Detail;
