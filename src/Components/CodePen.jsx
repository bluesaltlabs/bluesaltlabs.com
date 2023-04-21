import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

function CodePen({ height = 300, width, embedUrl, children, ...rest }) {
  const [loaded, setLoaded] = useState(false);

  function handleIframeLoad() {
    setLoaded(true);
  }

  return (
    <>
      <LoadingSpinner
        {...{ width, height, loaded }}
      />
      <iframe
        height={!loaded ? 0 : height}
        width={width}
        src={`${embedUrl}?default-tab=result&theme-id=dark`}
        loading="lazy"
        allowtransparency="true"
        allowFullScreen={true}
        onLoad={handleIframeLoad}
        {...rest}
      >
        {children}
      </iframe>
    </>
  )
};

export default CodePen;
