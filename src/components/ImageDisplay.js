import React from 'react'
import LaunchIcon from '@mui/icons-material/Launch'
import DownloadIcon from '@mui/icons-material/Download'

/**
 * Renders a list of images with additional information.
 * @param {Object[]} images - An array of image objects.
 * @param {string} images[].id - The unique identifier of the image.
 * @param {Object} images[].urls - The URLs of the image in different sizes.
 * @param {string} images[].urls.regular - The URL of the regular size image.
 * @param {string} images[].alt_description - The alternative description of the image.
 * @param {Object} images[].user - The user who uploaded the image.
 * @param {string} images[].user.name - The name of the user.
 * @param {string} images[].user.links.self - The URL of the user's profile.
 * @param {Object} images[].user.profile_image - The profile image of the user.
 * @param {string} images[].user.profile_image.medium - The URL of the medium size profile image.
 * @returns {JSX.Element[]} An array of JSX elements representing the images.
 */
function ImageDisplay({ images }) {
  return images.map((image) => (
    <div
      key={image.id}
      className='rounded-lg shadow-md overflow-hidden flex-1 w-auto min-w-[100%] md:min-w-[50%] lg:min-w-[30%] max-w-sm lg:max-w-none lg:max-h-[50vh] relative'>
      {image.urls && (
        <>
          <img
            className='object-cover w-full h-full'
            src={image.urls.regular}
            alt={image.alt_description}
          />
          <div className='absolute top-3 left-3'>
            <div className='blur-md absolute -inset-2 rounded-3xl bg-gray-500/40 z-0 invert-0'></div>
            <a
              className='flex items-center space-x-4 relative'
              href={image.user.links.html}
              target='_blank'
              rel='noopener noreferrer'>
              <img
                className='w-8 h-8 rounded-full'
                src={image.user.profile_image.medium}
                alt=''
              />
              <div className='relative text-white text-base'>
                {image.user.name}
                <LaunchIcon fontSize='small' className='ml-2' />
              </div>
            </a>
          </div>
          <div className='absolute bottom-2 right-2 flex items-center gap-2 justify-center'>
            <a
              className='text-white bg-[#24292F]/70 hover:bg-[#24292F]/95 transition-colors duration-300 rounded-full p-2'
              href={`${image.links.download}&force=true`}
              target='_blank'
              rel='noopener noreferrer'>
              <DownloadIcon fontSize='medium' />
            </a>
          </div>
        </>
      )}
    </div>
  ))
}

export default ImageDisplay
