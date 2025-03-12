import { TiptapImage, UploadImagesPlugin } from 'novel';
import { NodeViewWrapper, NodeViewWrapperProps, ReactNodeViewRenderer } from '@tiptap/react';
import { cx } from "class-variance-authority";
import { useState } from 'react';


function ImageNode(props: NodeViewWrapperProps) {
  const { updateAttributes } = props
  const { src, alt } = props.node.attrs
  const [readOnly, setReadOnly] = useState(true)

  let className = 'image'
  if (props.selected) { className += ' ProseMirror-selectednode'}

  const onEditAlt = (e) => {
    updateAttributes({alt: e.target.value})
  }

  return (
    <NodeViewWrapper className={className} data-drag-handle>
      <img title={alt} src={src} alt={alt} />
      <span className="alt-text-indicator">
        { alt ?
            <><span className="symbol symbol-positive">✅</span><span className="text">Alt text:</span></> :
            <><span className="symbol symbol-negative">❗</span><span className="text">Alt text:</span></>
        }
        &nbsp;<input title={alt} onMouseDown={() => {setReadOnly(false)}} onBlur={() => setReadOnly(true)} readOnly={readOnly} placeholder='Enter alt text...' value={alt} onChange={onEditAlt} className='bg-transparent outline-none read-only:truncate'/>
      </span>
    </NodeViewWrapper>
  )
}

export default TiptapImage.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageNode)
  },
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
      }),
    ];
  },
})