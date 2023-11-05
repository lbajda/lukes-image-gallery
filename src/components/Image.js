import React from 'react'

/**
 * A memoized component that renders an image with a cover class.
 * @param {Object} props - The component props.
 * @param {string} props.src - The image source URL.
 * @param {string} props.alt - The image alternative text.
 * @returns {JSX.Element} - The rendered component.
 */
const Image = React.memo(({ src, alt }) => (
  <div>
    <img className='img-cover' src={src} alt={alt} />
  </div>
))

export default Image
