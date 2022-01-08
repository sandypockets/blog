import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from "react";

export default function CoverImage({ title, src, slug, height, width, coverImagePriority }) {
  const [loading, setLoading] = useState(true)
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm object-cover', {
        'hover:shadow-md transition-shadow duration-200': slug,
      }, {'force-grayscale': !loading})}
      layout="responsive"
      width={width}
      height={height}
      priority={coverImagePriority ? coverImagePriority : false}
      blurDataURL={src}
      placeholder="blur"
      onLoadingComplete={() => setLoading(false)}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
