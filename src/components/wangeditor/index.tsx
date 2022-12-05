import { FC, useEffect, useRef } from 'react'
import Editor from 'wangeditor'
import E from 'wangeditor'

interface WangEditorProps {
  value?: string
  onChange?: (htmlText: string) => void
}

let instance: Editor
const WangEditor: FC<WangEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef(null)

  const initEditor = () => {
    instance = new E(editorRef.current)
    instance.config.focus = false
    instance.config.onchange = (html) => {
      onChange && onChange(html)
    }
    instance.create()
  }

  useEffect(() => {
    initEditor()

    return () => {
      instance.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    instance && instance.txt.html(value)
  }, [value])

  return (
    <section
      ref={editorRef}
      style={{ position: 'relative', zIndex: 0 }}
    ></section>
  )
}

export default WangEditor
