import React from 'react'
import {css} from '@emotion/core'
import theme from '../../config/theme'
import {bpMaxMD, bpMaxSM} from '../lib/breakpoints'
import {rhythm, headerFontFamily} from '../lib/typography'
import Markdown from 'react-markdown'
import Container from 'components/container'
import {Sunburst, LabelSeries} from 'react-vis'

import D3FlareData from './flare-data'

const LABEL_STYLE = {
  fontSize: '8px',
  textAnchor: 'middle',
}

/**
 * Recursively work backwards from highlighted node to find path of valud nodes
 * @param {Object} node - the current node being considered
 * @returns {Array} an array of strings describing the key route to the current node
 */
function getKeyPath(node) {
  if (!node.parent) {
    return ['root']
  }
  return [(node.data && node.data.name) || node.name].concat(
    getKeyPath(node.parent),
  )
}

function updateData(data, keyPath) {
  if (data.children) {
    data.children.map(child => updateData(child, keyPath))
  }
  // add a fill to all the uncolored cells
  if (!data.hex) {
    data.style = {
      fill: '#223F9A',
    }
  }
  data.style = {
    ...data.style,
    fillOpacity: keyPath && !keyPath[data.name] ? 0.2 : 1,
  }

  return data
}

const decoratedData = updateData(D3FlareData, false)

class BasicSunburst extends React.Component {
  state = {
    data: decoratedData,
    finalValue: 'SUNBURST',
    clicked: false,
  }

  render() {
    const {clicked, data, finalValue} = this.state
    return (
      <div className="basic-sunburst-example-wrapper">
        <Sunburst
          animation
          className="basic-sunburst-example"
          hideRootNode
          onValueMouseOver={node => {
            if (clicked) {
              return
            }
            const path = getKeyPath(node).reverse()
            const pathAsMap = path.reduce((res, row) => {
              res[row] = true
              return res
            }, {})
            this.setState({
              finalValue: path[path.length - 1],
              data: updateData(decoratedData, pathAsMap),
            })
          }}
          onValueMouseOut={() =>
            clicked
              ? () => {}
              : this.setState({
                  finalValue: false,
                  data: updateData(decoratedData, false),
                })
          }
          onValueClick={() => this.setState({clicked: !clicked})}
          style={{
            stroke: '#ddd',
            strokeOpacity: 0.3,
            strokeWidth: '0.5',
          }}
          colorType="literal"
          getSize={d => d.value}
          getColor={d => d.hex}
          data={data}
          height={300}
          width={350}
        >
          {finalValue && (
            <LabelSeries
              data={[{x: 0, y: 0, label: finalValue, style: LABEL_STYLE}]}
            />
          )}
        </Sunburst>
      </div>
    )
  }
}

function Hero({
  children,
  title = `Components for
modular charting and data visualization`,
  text,
  // background = `url(${heroImageRight}), url(${heroImageLeft}),
  // linear-gradient(-213deg, #5e31dc 0%, #3155dc 100%)`,
}) {
  return (
    <section
      css={css`
        * {
          color: ${theme.colors.black};
        }
        color: black;
        width: 100%;
        background-position: center right, center left;
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 0;
        position: relative;
        align-items: center;
        display: flex;
        padding-top: 40px;

        ${bpMaxMD} {
          background-size: cover;
        }
        ${bpMaxSM} {
          padding-top: 60px;
        }
      `}
    >
      {children}
      <Container
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          //justify-content: center;
          padding-bottom: 0;
          ${bpMaxMD} {
            flex-direction: column;
            align-items: center;
          }
        `}
      >
        <div
          css={css`
            display: none;
            visibility: hidden;
            ${bpMaxMD} {
              display: block;
              visibility: visible;
              width: 250px;
              height: 250px;
              //background: #241d44;
              background-size: cover;
              background-position-y: 10px;
              background-repeat: no-repeat;
              margin-bottom: 25px;
            }
          `}
        />
        <div
          css={css`
            display: flex;
            padding-top: 2rem;
            flex-direction: row;
            align-items: center;
          `}
        >
          <BasicSunburst />
          <h1
            css={css`
              position: relative;
              z-index: 5;
              line-height: 1.5;
              margin: 0;
              max-width: ${rhythm(17)};
              font-size: 30px;
              height: 100%;
              display: flex;
              //align-self: center;
            `}
          >
            {title}
          </h1>
        </div>
      </Container>
    </section>
  )
}

export default Hero
