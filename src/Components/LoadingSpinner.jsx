import {
  ArrowPathIcon,
} from '@heroicons/react/24/outline'

function LoadingSpinner({ className, height, width, loaded = false, fullPage = false, ...rest }) {
  let spinnerStyle = rest?.style || {};

  if (parseInt(height) > 0) { spinnerStyle.height = `${height}px`; }
  if (parseInt(width) > 0) { spinnerStyle.width = `${width}px`; }

  return (
    <div
      style={spinnerStyle}
      className={`flex justify-center items-center${loaded ? ' hidden' : ''}${fullPage ? ' h-screen' : ''}${className ? ` ${className}` : ''}`}
      {...rest}
    >

      {/* Spinner Container */}
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
        <ArrowPathIcon className="h-32 w-32 text-gray-900 dark:text-gray-100" />
      </div>

    </div>
  )
}

export default LoadingSpinner;
