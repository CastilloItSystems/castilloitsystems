import React, { useState } from 'react';
import { Play } from 'lucide-react';
import Badge from './Badge';

type Provider = 'youtube' | 'loom' | 'vimeo';

interface VideoEmbedProps {
  provider: Provider;
  id?: string;
  title: string;
  thumbFile?: string;
  duration?: string;
  badge?: string;
}

const buildSrc = (provider: Provider, id: string) => {
  switch (provider) {
    case 'youtube':
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    case 'loom':
      return `https://www.loom.com/embed/${id}?autoplay=1`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1`;
  }
};

const buildThumbUrl = (provider: Provider, id?: string) => {
  if (!id) return undefined;
  if (provider === 'youtube') return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  return undefined;
};

const VideoEmbed: React.FC<VideoEmbedProps> = ({
  provider,
  id,
  title,
  thumbFile,
  duration,
  badge,
}) => {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(id);
  const thumbSrc = thumbFile ? `/img/videos/${thumbFile}` : buildThumbUrl(provider, id);

  if (playing && hasVideo && id) {
    return (
      <div className="relative w-full aspect-video bg-surface-2 rounded-md overflow-hidden border border-emphasis">
        <iframe
          src={buildSrc(provider, id)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => hasVideo && setPlaying(true)}
      disabled={!hasVideo}
      aria-label={`Reproducir video: ${title}`}
      className="group relative w-full aspect-video bg-surface-2 rounded-md overflow-hidden border border-emphasis hover:border-brand transition-colors disabled:cursor-default"
    >
      {thumbSrc ? (
        <img
          src={thumbSrc}
          alt={title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-grid-tech opacity-50" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/20" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span
          className={`size-16 rounded-full flex items-center justify-center mb-4 transition-all ${
            hasVideo
              ? 'bg-brand text-text-1 group-hover:scale-110 shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)]'
              : 'bg-surface-3 text-text-mute'
          }`}
        >
          <Play size={22} className={hasVideo ? 'translate-x-0.5' : ''} fill="currentColor" />
        </span>
        <p className="text-sm font-semibold text-text-1 mb-2 max-w-xs">{title}</p>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {duration && (
            <Badge variant="mono">{duration}</Badge>
          )}
          {badge && <Badge variant="brand">{badge}</Badge>}
          {!hasVideo && (
            <Badge variant="warn">Video pendiente · grabar en Loom/YouTube</Badge>
          )}
        </div>
      </div>
    </button>
  );
};

export default VideoEmbed;
