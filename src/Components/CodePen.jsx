
function CodePen({ height = 300, width = "100%", embedUrl, children, ...rest }) {

  return (
    <iframe
      height={height}
      width={width}
      src={`${embedUrl}?default-tab=result&theme-id=dark`}
      loading="lazy"
      allowtransparency="true"
      allowFullScreen={true}
      {...rest}
    >
      {children}
</iframe>
  )
};

export default CodePen;
