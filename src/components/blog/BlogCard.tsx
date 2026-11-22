import Link from 'next/link';
import { ArrowRight, CalendarDays, UserRound } from 'lucide-react';
import type { BlogTeaser } from '@/data/blog';

export function BlogCard({ post }: { post: BlogTeaser }) {
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt)
    : null;

  const updatedDate =
    post.updatedAt &&
    post.updatedAt !== post.publishedAt
      ? new Date(post.updatedAt)
      : null;

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm">
      <div
        className="h-1.5 bg-gradient-to-r from-gold to-gold-light"
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-text">
          {post.category}
        </p>

        <h3 className="mt-2 font-heading text-xl font-bold leading-snug text-navy">
          {post.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>

        {post.published && (
          <div className="mt-4 space-y-2 border-t border-navy/10 pt-4">
            {post.author && (
              <div className="flex items-start gap-2 text-xs text-muted">
                <UserRound
                  size={15}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div className="not-italic">
                  <p className="font-semibold text-navy">
                    By {post.author.name}
                  </p>
                  <p>{post.author.role}</p>
                </div>
              </div>
            )}

            {publishedDate && !Number.isNaN(publishedDate.getTime()) && (
              <div className="flex items-center gap-2 text-xs text-muted">
                <CalendarDays size={15} aria-hidden="true" />
                <time dateTime={post.publishedAt}>
                  Published: {formatDate(publishedDate)}
                </time>
              </div>
            )}

            {updatedDate && !Number.isNaN(updatedDate.getTime()) && (
              <div className="flex items-center gap-2 text-xs text-muted">
                <CalendarDays size={15} aria-hidden="true" />
                <time dateTime={post.updatedAt}>
                  Updated: {formatDate(updatedDate)}
                </time>
              </div>
            )}
          </div>
        )}

        {post.published ? (
          <Link
            href={`/blog/${post.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-text"
          >
            Read the guide
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ) : (
          <p className="mt-5 text-sm font-semibold text-muted">
            Guide in preparation
          </p>
        )}
      </div>
    </article>
  );
}