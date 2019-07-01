import React from 'react'
import {bpMaxSM} from 'lib/breakpoints'

function TheSpectrumOfAbstraction() {
  return (
    <div css={{width: '100%', marginTop: 10, marginBottom: 40}}>
      <div
        css={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '1.5em',
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: 4,
          '& small, & strong': {
            display: 'block',
          },
          '& small': {
            fontSize: '0.5em',
          },
        }}
      >
        <div css={{color: 'rgb(94, 49, 220)'}}>
          <strong>ANA</strong>
          <small>(Absolutely No Abstraction)</small>
        </div>
        <div css={{color: 'rgb(71,67,220)'}}>
          <strong>AHA</strong>
          <small>(Avoid Hasty Abstraction)</small>
        </div>
        <div css={{color: 'rgb(49, 85, 220)'}}>
          <strong>DRY</strong>
          <small>{`(Don't Repeat Yourself)`}</small>
        </div>
      </div>
      <div
        css={{
          width: '100%',
          height: 20,
          backgroundImage:
            'linear-gradient(-213deg, rgb(94, 49, 220) 0%, rgb(49, 85, 220) 100%)',
        }}
      />
      <div
        css={{
          marginTop: 10,
          color: 'rgb(71,67,220)',
          background:
            'linear-gradient(-213deg, rgb(94, 49, 220) 0%, rgb(49, 85, 220) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '1.8em',
          [bpMaxSM]: {
            fontSize: '1em',
          },
        }}
      >
        <strong>T</strong>
        <strong>h</strong>
        <strong>e</strong>
        <strong />
        <strong>S</strong>
        <strong>p</strong>
        <strong>e</strong>
        <strong>c</strong>
        <strong>t</strong>
        <strong>r</strong>
        <strong>u</strong>
        <strong>m</strong>
        <strong />
        <strong>o</strong>
        <strong>f</strong>
        <strong />
        <strong>A</strong>
        <strong>b</strong>
        <strong>s</strong>
        <strong>t</strong>
        <strong>r</strong>
        <strong>a</strong>
        <strong>c</strong>
        <strong>t</strong>
        <strong>i</strong>
        <strong>o</strong>
        <strong>n</strong>
      </div>
    </div>
  )
}

export default TheSpectrumOfAbstraction
