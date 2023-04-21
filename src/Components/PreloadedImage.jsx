import { useState } from "react";
import LoadingSpinner from './LoadingSpinner';

function PreloadedImage({ height, width, src, alt, className, ...rest }) {
  const [loaded, setLoaded] = useState(false)

  function handleOnLoad() { setLoaded(true); } 

  return (
    <>
    
      <LoadingSpinner
        height={height}
        width={width}
        loaded={loaded}
      />

      <img
        src={src}
        alt={alt}
        onLoad={handleOnLoad}
        className={`${className ? `${className}` : ''}${loaded ? '' : ' hidden'}`}
        {...{ rest, height, width }}
      />
    </>
  )

}

export default PreloadedImage;
