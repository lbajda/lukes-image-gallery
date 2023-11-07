import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'

/**
 * Renders a link to the Github repository of the image gallery.
 * @returns {JSX.Element} Link to the Github repository.
 */
export default function GithubLink() {
  return (
    <div className='flex items-center justify-end w-full px-4 mt-3'>
      <a
        href='https:github.com/lbajda/lukes-image-gallery'
        target='_blank'
        rel='noopener noreferrer'
        className='text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2 transition-all duration-300 ease-in-out'>
        <GitHubIcon fontSize='small' className='w-4 h-4 mr-2' />
        View on Github
      </a>
    </div>
  )
}
