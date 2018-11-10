import React, {Component} from 'react';

import {PROJECT_NAME, PROJECT_DESC} from 'config';

import {
  XYPlot,
  AreaSeries,
  LineSeries,
  VerticalBarSeries,
  MarkSeries,
  Treemap,
  RadialChart
} from 'react-vis';

const palette = ['#12939A', '#17B8BE', '#1E96BE', '#FF991F', 'transparent'];

const MiniChart = props => {
  const XYProps = {
    colorType: 'literal',
    height: 120,
    margin: {left: 12, right: 12, top: 12, bottom: 12},
    onMouseLeave: () => {
      props.highlight(null);
      props.scrub(null);
    },
    xDomain: [0, props.data[0].length - 1],
    yDomain: [0, 20],
    width: 120
  };
  switch (props.type) {
    case 0:
      // bar charts
      const barData = props.data.map((barseries, s) =>
        barseries.map((d, i) => ({
          ...d,
          color: i === props.x ? palette[3] : palette[s]
        }))
      );
      return (
        <XYPlot {...XYProps} stackBy="y" yDomain={[0, props.data.length * 10]}>
          {barData.map((d, i) => (
            <VerticalBarSeries
              data={d}
              key={i}
              opacity={props.s !== null && props.s !== i ? 0.5 : 1}
              onValueMouseOver={value => {
                props.scrub(value.x);
                props.highlight(value.s);
              }}
            />
          ))}
        </XYPlot>
      );
    case 1:
      // pie charts
      const pieData = props.data
        .reduce((prev, curr) => [...prev, ...curr], [])
        .reduce(
          (result, d, i) => {
            result[i % 3].angle += d.y;
            return result;
          },
          [
            {angle: 0, s: 0, color: props.s === 0 ? palette[3] : palette[0]},
            {angle: 0, s: 1, color: props.s === 1 ? palette[3] : palette[1]},
            {angle: 0, s: 2, color: props.s === 2 ? palette[3] : palette[2]}
          ]
        );
      return (
        <RadialChart
          data={pieData}
          {...XYProps}
          xDomain={[0, 20]}
          center={{x: 10, y: 10}}
          radius={45}
          onValueMouseOver={value => props.highlight(value.s)}
          onSeriesMouseOut={() => props.highlight(null)}
        />
      );
    case 2:
      // area charts
      return (
        <XYPlot {...XYProps} stackBy="y" yDomain={[0, props.data.length * 20]}>
          {props.data.map((d, i) => (
            <AreaSeries
              data={d}
              key={i}
              color={i === props.s ? palette[3] : palette[i]}
              onSeriesMouseOver={() => props.highlight(i)}
            />
          ))}
        </XYPlot>
      );
    case 3:
      // scatterplots
      const scatterData = props.data.map((scatterseries, s) =>
        scatterseries.map((d, j) => ({
          x: d.xS,
          s,
          y: d.yS,
          size: d.size,
          color: s === props.s ? palette[3] : palette[s]
        }))
      );
      return (
        <XYPlot {...XYProps} xDomain={[0, 20]}>
          {scatterData.map((d, i) => (
            <MarkSeries
              data={d}
              key={i}
              onSeriesMouseOver={() => props.highlight(i)}
              opacity={props.s === null || props.s === i ? 0.8 : 0.5}
            />
          ))}
        </XYPlot>
      );
    case 4:
      // treemaps
      const treeMapData = props.data.reduce(
        (prev, treeseries, s) => {
          prev.children.push(
            treeseries.reduce(
              (leaf, d) => {
                leaf.children.push({
                  size: d.yS,
                  index: d.x,
                  series: s,
                  style: {background: props.x === d.x ? palette[3] : palette[s]}
                });
                return leaf;
              },
              {
                title: '',
                style: {background: 'white'},
                children: []
              }
            )
          );
          return prev;
        },
        {
          title: '',
          children: []
        }
      );
      return (
        <Treemap
          {...XYProps}
          data={treeMapData}
          animation={{
            damping: 9,
            stiffness: 300
          }}
          margin={{top: 6, bottom: 6, left: 6, right: 6}}
          onLeafMouseOver={node => {
            props.highlight(node.data.series);
            props.scrub(node.data.index);
          }}
          style={{margin: '6px -6px -6px 6px'}}
        />
      );
    default:
      // Line charts
      return (
        <XYPlot {...XYProps}>
          {props.data.map((d, i) => (
            <LineSeries
              data={d}
              key={i}
              stroke={i === props.s ? palette[3] : palette[i]}
              strokeWidth={3}
              onNearestXY={value => {
                props.scrub(value.x);
              }}
            />
          ))}
          {props.data.map((d, i) => (
            <LineSeries
              data={d}
              key={i}
              stroke="transparent"
              strokeWidth={5}
              onSeriesMouseOver={() => props.highlight(i)}
            />
          ))}
          {props.x !== null && props.x < props.data[0].length ? (
            <LineSeries
              data={[{x: props.x, y: 0}, {x: props.x, y: 20}]}
              stroke="#125C77"
              strokeStyle="dashed"
              opacity={0.5}
            />
          ) : null}
          {props.x !== null && props.x < props.data[0].length ? (
            <MarkSeries
              fillType="literal"
              data={props.data.map((markseries, s) => ({
                x: props.x,
                y: markseries[props.x].y,
                fill: s === props.s ? palette[3] : palette[s]
              }))}
              size={5}
              stroke="white"
            />
          ) : null}
        </XYPlot>
      );
  }
};

function makeData(nbSeries, nbPoints) {
  return [...Array(nbSeries).keys()].map((d, s) => series(nbPoints, s));
}

function series(nbPoints, s) {
  let previousPoint = random({scope: 3, rolls: 4});
  return [...Array(nbPoints).keys()].map(d => {
    const y =
      previousPoint > 17.5
        ? previousPoint - random({scope: 1, rolls: 3})
        : previousPoint < 2.5
          ? previousPoint + random({scope: 1, rolls: 3})
          : previousPoint + random({scope: 1, rolls: 5}) - 2.5;
    previousPoint = y;
    return {
      x: d,
      s,
      size: random({scope: 3, rolls: 3}),
      xS: random({scope: 20, rolls: 1}),
      yS: random({scope: 20, rolls: 1}),
      y
    };
  });
}

function random({scope = 5, rolls = 1, integer = false}) {
  let result = 0;
  let i = 0;
  for (i; i < rolls; i++) {
    result += Math.random() * scope;
  }
  return integer ? Math.floor(result) : result;
}

class Hero extends Component {
  constructor() {
    super();
    this.state = {
      x: null
    };
    this._resize = this._resize.bind(this);
  }

  componentDidMount() {
    const chartsProps = this.generateData(100);
    window.addEventListener('resize', this._resize);
    this._resize();
    this.setState({chartsProps});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  };

  changeType = i => {
    const updatedChartsProps = [...this.state.chartsProps];
    updatedChartsProps[i].type = (updatedChartsProps[i].type + 1) % 6;
    updatedChartsProps[i].changes = updatedChartsProps[i].changes + 1;
    this.setState({chartsProps: updatedChartsProps});
  };

  generateData = nb => {
    return [...Array(nb).keys()].map(d => {
      const nbPoints = 5 + random({scope: 5, rolls: 2, integer: true});
      const nbSeries =
        1 + Number(Math.random() > 0.2) + Number(Math.random() > 0.5);
      const data = makeData(nbSeries, nbPoints);
      const type = random({scope: 6, integer: true});
      return {
        changes: 0,
        type,
        data
      };
    });
  };

  highlight = s => this.setState({s});
  scrub = x => this.setState({x});
  render() {
    const nbChartsInWidth = Math.floor((this.state.width - 24) / 132);
    const nbChartsInHeight = Math.floor(
      (0.65 * (this.state.height - 24)) / 132
    );
    const chartsToRender = nbChartsInWidth * nbChartsInHeight;

    const chartsWidth = nbChartsInWidth * 132;
    const chartsHeight = nbChartsInHeight * 132;
    return (
      <div
        className="Hero"
        style={{
          background: '#eeeeef',
          height: '65vh',
          padding: '14px 12px'
        }}
      >
        <div
          className="charts"
          style={{
            height: chartsHeight,
            width: chartsWidth,
            margin: 'auto',
            position: 'relative'
          }}
        >
          {this.state.chartsProps
            ? this.state.chartsProps.slice(0, chartsToRender).map((d, i) => (
                <div
                  key={i}
                  className="mini-chart"
                  onClick={() => this.changeType(i)}
                  style={{
                    cursor: 'pointer',
                    display: 'inline-block',
                    background: 'white',
                    margin: 6,
                    boxShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                    transition: 'transform 0.5s',
                    transform: `perspective(1000px) rotateY(${d.changes}turn)`
                  }}
                >
                  <MiniChart
                    highlight={this.highlight}
                    scrub={this.scrub}
                    s={this.state.s}
                    x={this.state.x}
                    {...d}
                  />
                </div>
              ))
            : null}
          <a
            className="container"
            style={{
              top: `${6 + Math.floor(nbChartsInHeight / 2) * 138}px`,
              left: `${6 + Math.max(nbChartsInHeight - 3, 1) * 132}px`
            }}
            href="/react-vis/documentation"
          >
            <h1>{PROJECT_NAME}</h1>
            <p id="project-desc">{PROJECT_DESC}</p>
            <p id="get-started">Get started</p>
          </a>
        </div>
      </div>
    );
  }
}

export default Hero;
