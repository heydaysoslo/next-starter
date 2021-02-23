/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React, { useState, useEffect } from 'react'
import Select from 'react-select'

const PREVIEW_SECRET = 'pse.bond5WACH5gict'
const ACCESS_TOKEN =
  'skib4dmWZNJeCpWQQncchCGNPZ1cuIpLVjvk9uTilfmJCbAHjWlmsjpZK5YzNzbjvJyFw7vVcE8n7KrR734Z4OlCaP4uHvjVQAEQYi5t50x2Ri9eM2Q749IZ1TvdFieTKN8BRkAShpZHk5ss8CtXfOMHvNCLDQf9ulMW4Stq4ED8ccW1DUM9'

const BASEURL = {
  development: 'http://localhost:3000',
  production: 'https://heydays-starter.vercel.app'
}

const Preview = ({ document }) => {
  const [size, setSize] = useState('full')
  const [shouldRender, setShouldRender] = useState(true)
  const { displayed } = document

  useEffect(() => {
    setShouldRender(false)
    setTimeout(() => {
      setShouldRender(true)
    })
  }, [document])

  const env = window.location.host.includes('localhost')
    ? 'development'
    : 'production'
  const url = `${BASEURL[env]}/preview/${displayed?._id}?&secret=${PREVIEW_SECRET}&access_token=${ACCESS_TOKEN}`

  if (!displayed._id) return null

  const sizes = {
    full: '100%',
    mobile: '375px',
    tablet: '768px',
    laptop: '1200px'
  }

  const icons = {
    full: '💯',
    mobile: '📱',
    tablet: '🏓',
    laptop: '💻'
  }

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: '0',
          left: '0',
          width: '100%',
          borderBottom: '1px solid black'
        }}
      >
        <h3>👀 Preview</h3>
        <div style={{ width: '200px' }}>
          <Select
            label="Select device…"
            options={Object.keys(sizes).map(size => ({
              label: `${icons[size]} ${size}`,
              value: size
            }))}
            width="200px"
            placeholder="Select device…"
            onChange={value => setSize(value.value)}
            // defaultValue={size}
          ></Select>
        </div>
      </header>
      {shouldRender && (
        <iframe
          style={{
            width: sizes[size],
            border: size === 'full' ? 'none' : '1px solid black',
            margin: '0 auto',
            transition: 'width .3s ease',
            height: '100%',
            display: 'block'
          }}
          src={url}
          frameBorder="0"
        ></iframe>
      )}
    </div>
  )
}

export default Preview
