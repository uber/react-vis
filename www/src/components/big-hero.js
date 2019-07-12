import React from 'react'
import {css} from '@emotion/core'
import theme from '../../config/theme'
import {bpMaxMD, bpMaxSM} from '../lib/breakpoints'
import {rhythm, headerFontFamily} from '../lib/typography'
import Markdown from 'react-markdown'
import Container from 'components/container'

import {Sunburst, LabelSeries} from 'react-vis'

const D3FlareData = {
  children: [
    {
      name: 'analytics',
      hex: '#12939A',
      children: [
        {
          name: 'cluster',
          children: [
            {name: 'AgglomerativeCluster', hex: '#12939A', value: 3938},
            {name: 'CommunityStructure', hex: '#12939A', value: 3812},
            {name: 'HierarchicalCluster', hex: '#12939A', value: 6714},
            {name: 'MergeEdge', hex: '#12939A', value: 743},
          ],
        },
        {
          name: 'graph',
          children: [
            {name: 'BetweennessCentrality', hex: '#12939A', value: 3534},
            {name: 'LinkDistance', hex: '#12939A', value: 5731},
            {name: 'MaxFlowMinCut', hex: '#12939A', value: 7840},
            {name: 'ShortestPaths', hex: '#12939A', value: 5914},
            {name: 'SpanningTree', hex: '#12939A', value: 3416},
          ],
        },
        {
          name: 'optimization',
          children: [{name: 'AspectRatioBanker', hex: '#12939A', value: 7074}],
        },
      ],
    },
    {
      name: 'animate',
      children: [
        {name: 'Easing', hex: '#12939A', value: 17010},
        {name: 'FunctionSequence', hex: '#12939A', value: 5842},
        {
          name: 'interpolate',
          children: [
            {name: 'ArrayInterpolator', hex: '#12939A', value: 1983},
            {name: 'hexInterpolator', hex: '#12939A', value: 2047},
            {name: 'DateInterpolator', hex: '#12939A', value: 1375},
            {name: 'Interpolator', hex: '#12939A', value: 8746},
            {name: 'MatrixInterpolator', hex: '#12939A', value: 2202},
            {name: 'NumberInterpolator', hex: '#12939A', value: 1382},
            {name: 'ObjectInterpolator', hex: '#12939A', value: 1629},
            {name: 'PointInterpolator', hex: '#12939A', value: 1675},
            {name: 'RectangleInterpolator', hex: '#12939A', value: 2042},
          ],
        },
        {name: 'ISchedulable', hex: '#12939A', value: 1041},
        {name: 'Parallel', hex: '#12939A', value: 5176},
        {name: 'Pause', hex: '#12939A', value: 449},
        {name: 'Scheduler', hex: '#12939A', value: 5593},
        {name: 'Sequence', hex: '#12939A', value: 5534},
        {name: 'Transition', hex: '#12939A', value: 9201},
        {name: 'Transitioner', hex: '#12939A', value: 19975},
        {name: 'TransitionEvent', hex: '#12939A', value: 1116},
        {name: 'Neonate', hex: '#12939A', value: 6006},
      ],
    },
    {
      name: 'data',
      children: [
        {
          name: 'converters',
          children: [
            {name: 'Converters', hex: '#12939A', value: 721},
            {name: 'DelimitedTextConverter', hex: '#12939A', value: 4294},
            {name: 'GraphMLConverter', hex: '#12939A', value: 9800},
            {name: 'IDataConverter', hex: '#12939A', value: 1314},
            {name: 'JSONConverter', hex: '#12939A', value: 2220},
          ],
        },
        {name: 'DataField', hex: '#12939A', value: 1759},
        {name: 'DataSchema', hex: '#12939A', value: 2165},
        {name: 'DataSet', hex: '#12939A', value: 586},
        {name: 'DataSource', hex: '#12939A', value: 3331},
        {name: 'DataTable', hex: '#12939A', value: 772},
        {name: 'DataUtil', hex: '#12939A', value: 3322},
      ],
    },
    {
      name: 'display',
      children: [
        {name: 'DirtySprite', hex: '#12939A', value: 8833},
        {name: 'LineSprite', hex: '#12939A', value: 1732},
        {name: 'RectSprite', hex: '#12939A', value: 3623},
        {name: 'TextSprite', hex: '#12939A', value: 10066},
      ],
    },
    {
      name: 'flex',
      children: [{name: 'FlareVis', hex: '#12939A', value: 4116}],
    },
    {
      name: 'physics',
      children: [
        {name: 'DragForce', hex: '#12939A', value: 1082},
        {name: 'GravityForce', hex: '#12939A', value: 1336},
        {name: 'IForce', hex: '#12939A', value: 319},
        {name: 'NBodyForce', hex: '#12939A', value: 10498},
        {name: 'Particle', hex: '#12939A', value: 2822},
        {name: 'Simulation', hex: '#12939A', value: 9983},
        {name: 'Spring', hex: '#12939A', value: 2213},
        {name: 'SpringForce', hex: '#12939A', value: 1681},
      ],
    },
    {
      name: 'query',
      children: [
        {name: 'AggregateExpression', hex: '#12939A', value: 1616},
        {name: 'And', hex: '#12939A', value: 1027},
        {name: 'Arithmetic', hex: '#12939A', value: 3891},
        {name: 'Average', hex: '#12939A', value: 891},
        {name: 'BinaryExpression', hex: '#12939A', value: 2893},
        {name: 'Comparison', hex: '#12939A', value: 5103},
        {name: 'CompositeExpression', hex: '#12939A', value: 3677},
        {name: 'Count', hex: '#12939A', value: 781},
        {name: 'DateUtil', hex: '#12939A', value: 4141},
        {name: 'Distinct', hex: '#12939A', value: 933},
        {name: 'Expression', hex: '#12939A', value: 5130},
        {name: 'ExpressionIterator', hex: '#12939A', value: 3617},
        {name: 'Fn', hex: '#12939A', value: 3240},
        {name: 'If', hex: '#12939A', value: 2732},
        {name: 'IsA', hex: '#12939A', value: 2039},
        {name: 'Literal', hex: '#12939A', value: 1214},
        {name: 'Match', hex: '#12939A', value: 3748},
        {name: 'Maximum', hex: '#12939A', value: 843},
        {
          name: 'methods',
          children: [
            {name: 'add', hex: '#12939A', value: 593},
            {name: 'and', hex: '#12939A', value: 330},
            {name: 'average', hex: '#12939A', value: 287},
            {name: 'count', hex: '#12939A', value: 277},
            {name: 'distinct', hex: '#12939A', value: 292},
            {name: 'div', hex: '#12939A', value: 595},
            {name: 'eq', hex: '#12939A', value: 594},
            {name: 'fn', hex: '#12939A', value: 460},
            {name: 'gt', hex: '#12939A', value: 603},
            {name: 'gte', hex: '#12939A', value: 625},
            {name: 'iff', hex: '#12939A', value: 748},
            {name: 'isa', hex: '#12939A', value: 461},
            {name: 'lt', hex: '#12939A', value: 597},
            {name: 'lte', hex: '#12939A', value: 619},
            {name: 'max', hex: '#12939A', value: 283},
            {name: 'min', hex: '#12939A', value: 283},
            {name: 'mod', hex: '#12939A', value: 591},
            {name: 'mul', hex: '#12939A', value: 603},
            {name: 'neq', hex: '#12939A', value: 599},
            {name: 'not', hex: '#12939A', value: 386},
            {name: 'or', hex: '#12939A', value: 323},
            {name: 'orderby', hex: '#12939A', value: 307},
            {name: 'range', hex: '#12939A', value: 772},
            {name: 'select', hex: '#12939A', value: 296},
            {name: 'stddev', hex: '#12939A', value: 363},
            {name: 'sub', hex: '#12939A', value: 600},
            {name: 'sum', hex: '#12939A', value: 280},
            {name: 'update', hex: '#12939A', value: 307},
            {name: 'variance', hex: '#12939A', value: 335},
            {name: 'where', hex: '#12939A', value: 299},
            {name: 'xor', hex: '#12939A', value: 354},
            {name: '_', hex: '#12939A', value: 264},
          ],
        },
        {name: 'Minimum', hex: '#12939A', value: 843},
        {name: 'Not', hex: '#12939A', value: 1554},
        {name: 'Or', hex: '#12939A', value: 970},
        {name: 'Query', hex: '#12939A', value: 13896},
        {name: 'Range', hex: '#12939A', value: 1594},
        {name: 'StringUtil', hex: '#12939A', value: 4130},
        {name: 'Sum', hex: '#12939A', value: 791},
        {name: 'Variable', hex: '#12939A', value: 1124},
        {name: 'Variance', hex: '#12939A', value: 1876},
        {name: 'Xor', hex: '#12939A', value: 1101},
      ],
    },
    {
      name: 'scale',
      children: [
        {name: 'IScaleMap', hex: '#FF9833', value: 2105},
        {name: 'LinearScale', hex: '#FF9833', value: 1316},
        {name: 'LogScale', hex: '#FF9833', value: 3151},
        {name: 'OrdinalScale', hex: '#FF9833', value: 3770},
        {name: 'QuantileScale', hex: '#1A3177', value: 2435},
        {name: 'QuantitativeScale', hex: '#FF9833', value: 4839},
        {name: 'RootScale', hex: '#FF9833', value: 1756},
        {name: 'Scale', hex: '#FF9833', value: 4268},
        {name: 'ScaleType', hex: '#FF9833', value: 1821},
        {name: 'TimeScale', hex: '#FF9833', value: 5833},
      ],
    },
    {
      name: 'util',
      children: [
        {name: 'Arrays', hex: '#12939A', value: 8258},
        {name: 'hexs', hex: '#12939A', value: 10001},
        {name: 'Dates', hex: '#12939A', value: 8217},
        {name: 'Displays', hex: '#12939A', value: 12555},
        {name: 'Filter', hex: '#12939A', value: 2324},
        {name: 'Geometry', hex: '#12939A', value: 10993},
        {
          name: 'heap',
          children: [
            {name: 'FibonacciHeap', hex: '#12939A', value: 9354},
            {name: 'HeapNode', hex: '#12939A', value: 1233},
          ],
        },
        {name: 'IEvaluable', hex: '#12939A', value: 335},
        {name: 'IPredicate', hex: '#12939A', value: 383},
        {name: 'IValueProxy', hex: '#12939A', value: 874},
        {
          name: 'math',
          children: [
            {name: 'DenseMatrix', hex: '#12939A', value: 3165},
            {name: 'IMatrix', hex: '#12939A', value: 2815},
            {name: 'SparseMatrix', hex: '#12939A', value: 3366},
          ],
        },
        {name: 'Maths', hex: '#12939A', value: 17705},
        {name: 'Orientation', hex: '#12939A', value: 1486},
        {
          name: 'palette',
          children: [
            {name: 'hexPalette', hex: '#12939A', value: 6367},
            {name: 'Palette', hex: '#12939A', value: 1229},
            {name: 'ShapePalette', hex: '#12939A', value: 2059},
            {name: 'valuePalette', hex: '#12939A', value: 2291},
          ],
        },
        {name: 'Property', hex: '#12939A', value: 5559},
        {name: 'Shapes', hex: '#12939A', value: 19118},
        {name: 'Sort', hex: '#12939A', value: 6887},
        {name: 'Stats', hex: '#12939A', value: 6557},
        {name: 'Strings', hex: '#12939A', value: 22026},
      ],
    },
    {
      name: 'vis',
      children: [
        {
          name: 'axis',
          children: [
            {name: 'Axes', hex: '#12939A', value: 1302},
            {name: 'Axis', hex: '#12939A', value: 24593},
            {name: 'AxisGridLine', hex: '#12939A', value: 652},
            {name: 'AxisLabel', hex: '#12939A', value: 636},
            {name: 'CartesianAxes', hex: '#12939A', value: 6703},
          ],
        },
        {
          name: 'controls',
          children: [
            {name: 'AnchorControl', hex: '#12939A', value: 2138},
            {name: 'ClickControl', hex: '#12939A', value: 3824},
            {name: 'Control', hex: '#12939A', value: 1353},
            {name: 'ControlList', hex: '#12939A', value: 4665},
            {name: 'DragControl', hex: '#12939A', value: 2649},
            {name: 'ExpandControl', hex: '#12939A', value: 2832},
            {name: 'HoverControl', hex: '#12939A', value: 4896},
            {name: 'IControl', hex: '#12939A', value: 763},
            {name: 'PanZoomControl', hex: '#12939A', value: 5222},
            {name: 'SelectionControl', hex: '#12939A', value: 7862},
            {name: 'TooltipControl', hex: '#12939A', value: 8435},
          ],
        },
        {
          name: 'data',
          children: [
            {name: 'Data', hex: '#12939A', value: 20544},
            {name: 'DataList', hex: '#12939A', value: 19788},
            {name: 'DataSprite', hex: '#12939A', value: 10349},
            {name: 'EdgeSprite', hex: '#12939A', value: 3301},
            {name: 'NodeSprite', hex: '#12939A', value: 19382},
            {
              name: 'render',
              children: [
                {name: 'ArrowType', hex: '#12939A', value: 698},
                {name: 'EdgeRenderer', hex: '#12939A', value: 5569},
                {name: 'IRenderer', hex: '#12939A', value: 353},
                {name: 'ShapeRenderer', hex: '#12939A', value: 2247},
              ],
            },
            {name: 'ScaleBinding', hex: '#12939A', value: 11275},
            {name: 'Tree', hex: '#12939A', value: 7147},
            {name: 'TreeBuilder', hex: '#12939A', value: 9930},
          ],
        },
        {
          name: 'events',
          children: [
            {name: 'DataEvent', hex: '#12939A', value: 2313},
            {name: 'SelectionEvent', hex: '#12939A', value: 1880},
            {name: 'TooltipEvent', hex: '#12939A', value: 1701},
            {name: 'VisualizationEvent', hex: '#12939A', value: 1117},
          ],
        },
        {
          name: 'legend',
          children: [
            {name: 'Legend', hex: '#12939A', value: 20859},
            {name: 'LegendItem', hex: '#12939A', value: 4614},
            {name: 'LegendRange', hex: '#12939A', value: 10530},
          ],
        },
        {
          name: 'operator',
          children: [
            {
              name: 'distortion',
              children: [
                {name: 'BifocalDistortion', hex: '#12939A', value: 4461},
                {name: 'Distortion', hex: '#12939A', value: 6314},
                {name: 'FisheyeDistortion', hex: '#12939A', value: 3444},
              ],
            },
            {
              name: 'encoder',
              children: [
                {name: 'hexEncoder', hex: '#12939A', value: 3179},
                {name: 'Encoder', hex: '#12939A', value: 4060},
                {name: 'PropertyEncoder', hex: '#12939A', value: 4138},
                {name: 'ShapeEncoder', hex: '#12939A', value: 1690},
                {name: 'valueEncoder', hex: '#12939A', value: 1830},
              ],
            },
            {
              name: 'filter',
              children: [
                {name: 'FisheyeTreeFilter', hex: '#12939A', value: 5219},
                {name: 'GraphDistanceFilter', hex: '#12939A', value: 3165},
                {name: 'VisibilityFilter', hex: '#12939A', value: 3509},
              ],
            },
            {name: 'IOperator', hex: '#12939A', value: 1286},
            {
              name: 'label',
              children: [
                {name: 'Labeler', hex: '#12939A', value: 9956},
                {name: 'RadialLabeler', hex: '#12939A', value: 3899},
                {name: 'StackedAreaLabeler', hex: '#12939A', value: 3202},
              ],
            },
            {
              name: 'layout',
              children: [
                {name: 'AxisLayout', hex: '#12939A', value: 6725},
                {name: 'BundledEdgeRouter', hex: '#12939A', value: 3727},
                {name: 'CircleLayout', hex: '#12939A', value: 9317},
                {name: 'CirclePackingLayout', hex: '#12939A', value: 12003},
                {name: 'DendrogramLayout', hex: '#12939A', value: 4853},
                {name: 'ForceDirectedLayout', hex: '#12939A', value: 8411},
                {name: 'IcicleTreeLayout', hex: '#12939A', value: 4864},
                {name: 'IndentedTreeLayout', hex: '#12939A', value: 3174},
                {name: 'Layout', hex: '#12939A', value: 7881},
                {name: 'NodeLinkTreeLayout', hex: '#12939A', value: 12870},
                {name: 'PieLayout', hex: '#12939A', value: 2728},
                {name: 'RadialTreeLayout', hex: '#12939A', value: 12348},
                {name: 'RandomLayout', hex: '#12939A', value: 870},
                {name: 'StackedAreaLayout', hex: '#12939A', value: 9121},
                {name: 'TreeMapLayout', hex: '#12939A', value: 9191},
              ],
            },
            {name: 'Operator', hex: '#12939A', value: 2490},
            {name: 'OperatorList', hex: '#12939A', value: 5248},
            {name: 'OperatorSequence', hex: '#12939A', value: 4190},
            {name: 'OperatorSwitch', hex: '#12939A', value: 2581},
            {name: 'SortOperator', hex: '#12939A', value: 2023},
          ],
        },
        {name: 'Visualization', hex: '#12939A', value: 16540},
      ],
    },
  ],
}

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

const EXTENDED_DISCRETE_COLOR_RANGE = [
  '#19CDD7',
  '#DDB27C',
  '#88572C',
  '#FF991F',
  '#F15C17',
  '#223F9A',
  '#DA70BF',
  '#125C77',
  '#4DC19C',
  '#776E57',
  '#12939A',
  '#17B8BE',
  '#F6D18A',
  '#B7885E',
  '#FFCB99',
  '#F89570',
  '#829AE3',
  '#E79FD5',
  '#1E96BE',
  '#89DAC1',
  '#B3AD9E',
]

function updateData(data, keyPath) {
  if (data.children) {
    data.children.map(child => updateData(child, keyPath))
  }
  // add a fill to all the uncolored cells
  if (!data.hex) {
    data.style = {
      fill: [
        '#19CDD7',
        '#DDB27C',
        '#88572C',
        '#FF991F',
        '#F15C17',
        '#223F9A',
        '#DA70BF',
        '#125C77',
        '#4DC19C',
        '#776E57',
        '#12939A',
        '#17B8BE',
        '#F6D18A',
        '#B7885E',
        '#FFCB99',
        '#F89570',
        '#829AE3',
        '#E79FD5',
        '#1E96BE',
        '#89DAC1',
        '#B3AD9E',
      ][5],
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
    pathValue: false,
    data: decoratedData,
    finalValue: 'SUNBURST',
    clicked: false,
  }

  render() {
    const {clicked, data, finalValue, pathValue} = this.state
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
              pathValue: path.join(' > '),
              data: updateData(decoratedData, pathAsMap),
            })
          }}
          onValueMouseOut={() =>
            clicked
              ? () => {}
              : this.setState({
                  pathValue: false,
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
        <div className="basic-sunburst-example-path-name">{pathValue}</div>
      </div>
    )
  }
}

// import heroImageRight from '../images/hero/path-right.svg'
// import heroImageLeft from '../images/hero/path-left.svg'

function Hero({
  children,
  title = `React.js components for
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
            flex-direction: column;
          `}
        >
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
          <BasicSunburst />
          {text && (
            <Markdown
              css={css`
                padding-bottom: 30px;
                p {
                  color: hsla(0, 100%, 0%, 0.9);
                  font-family: ${headerFontFamily};
                  font-weight: 300;
                }
                max-width: 400px;
                margin-top: ${rhythm(0.5)};
                a {
                  text-decoration: underline;
                  color: hsla(0, 100%, 0%, 1);
                  :hover {
                    color: hsla(0, 100%, 0%, 0.9);
                  }
                }
              `}
            >
              {text}
            </Markdown>
          )}
        </div>
      </Container>
    </section>
  )
}

export default Hero
