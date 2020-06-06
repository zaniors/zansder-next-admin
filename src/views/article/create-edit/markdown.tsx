import React, { FC, useContext } from 'react';
import MarkDown from 'react-simplemde-editor';
import showdown from 'showdown';
import 'easymde/dist/easymde.min.css';
import { ArticleCreateEditContext } from './index';

const ArticleMarkDown: FC = () => {
  const converter = new showdown.Converter();
  const context = useContext(ArticleCreateEditContext)

  const onChange = (value: string) => {
    context.onUpdateContent && context.onUpdateContent(converter.makeHtml(value));
  }

  return (
    <MarkDown onChange={onChange} value={converter.makeMarkdown(context.content)} />
  )
}

export default ArticleMarkDown;