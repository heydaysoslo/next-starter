import React from 'react'
import Editor from './Editor'

type Props = {
  quote: {
    content: any
    source: any
  }
}

const Quote: React.FC<Props> = ({ quote }) => {
  return (
    quote.content && (
      <div className="Quote">
        <blockquote className="Quote__blockquote">
          <Editor blocks={quote.content} />
        </blockquote>
        {quote.source && (
          <cite className="Quote__cite">
            <Editor blocks={quote.source} />
          </cite>
        )}
      </div>
    )
  )
}

export default Quote
