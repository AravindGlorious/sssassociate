import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { BlogTeaser } from '@/data/blog';

export function BlogCard({ post }: { post: BlogTeaser }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm">
      <div className="h-1.5 bg-gradient-to-r from-gold to-gold-light" aria-hidden="true" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-text">{post.category}</p>
        <h3 className="mt-2 font-heading text-xl font-bold leading-snug text-navy">{post.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        {post.published ? (
          <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-text">Read the guide <ArrowRight size={16} aria-hidden="true" /></Link>
        ) : (
          <p className="mt-5 text-sm font-semibold text-muted">Guide in preparation</p>
        )}
      </div>
    </article>
  );
}
