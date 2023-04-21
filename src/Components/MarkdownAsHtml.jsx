import { marked } from 'marked';

function MarkdownAsHtml({ markdown, htmlBefore, htmlAfter, markedOptions = { sanitize: false } }) {

  if (!markdown) { return null }
  
  function markdownToHtml(markdownString) {
    const valueWithPreviewHtml = `${htmlBefore ?? ''}${markdownString ?? ''}${htmlAfter ?? ''}`
    return marked(valueWithPreviewHtml, markedOptions)
  }
  
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: markdownToHtml(markdown),
      }}
    />
  );
}

export default MarkdownAsHtml;
