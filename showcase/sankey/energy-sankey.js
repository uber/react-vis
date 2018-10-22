import React from 'react';

import Sankey from 'sankey';

import Energy from '../datasets/energy.json';
import ShowcaseButton from '../showcase-components/showcase-button';

const MODE = ['justify', 'center', 'left', 'right'];

export default class EnergySankey extends React.Component {
  state = {
    modeIndex: 0
  };

  updateModeIndex = increment => () => {
    const newIndex = this.state.modeIndex + (increment ? 1 : -1);
    const modeIndex =
      newIndex < 0 ? MODE.length - 1 : newIndex >= MODE.length ? 0 : newIndex;
    this.setState({modeIndex});
  };
  render() {
    const {modeIndex} = this.state;

    return (
      <div className="centered-and-flexed">
        <div className="centered-and-flexed-controls">
          <ShowcaseButton
            onClick={this.updateModeIndex(false)}
            buttonContent={'PREV MODE'}
          />
          <div> {MODE[modeIndex]} </div>
          <ShowcaseButton
            onClick={this.updateModeIndex(true)}
            buttonContent={'NEXT MODE'}
          />
        </div>
        <Sankey
          animation
          margin={50}
          nodes={Energy.nodes}
          links={Energy.links}
          width={960}
          align={MODE[modeIndex]}
          height={500}
          layout={24}
          nodeWidth={15}
          nodePadding={10}
          style={{
            links: {
              opacity: 0.3
            },
            labels: {
              fontSize: '8px'
            },
            rects: {
              strokeWidth: 2,
              stroke: '#1A3177'
            }
          }}
        />
      </div>
    );
  }
}
