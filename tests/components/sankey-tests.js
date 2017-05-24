import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';

import Sankey from 'sankey';
import BasicSankey from '../../showcase/sankey/basic';
import VoronoiSankey from '../../showcase/sankey/voronoi';

const SANKEY_PROPS = {
  nodes: [],
  links: [],
  width: 200,
  height: 200
};

import {testRenderWithProps} from '../test-utils';

// make sure that the components render at all
testRenderWithProps(Sankey, SANKEY_PROPS);

test('Sankey: labels', t => {
  const wrap = mount(
    <Sankey
      height={100}
      width={100}
      nodes={[{name: 'one'}, {name: 'two'}]}
      links={[{source: 0, target: 1}]} />
  );

  t.equal(wrap.find('text').length, 2, 'there should be two node labels');
  wrap.setProps({hideLabels: true});
  t.equal(wrap.find('text').length, 0, 'the labels should now be hidden');

  t.end();

});

test('Sankey: Showcase Example - BasicSankey', t => {
  const $ = mount(<BasicSankey />);
  t.equal($.find('.rv-sankey__link').length, 3, 'should find the right number of links');
  t.equal($.find('.rv-sankey__node').length, 3, 'should find the right number of nodes');

  t.end();
});

test('Sankey: Showcase Example - VoronoiSankey', t => {
  const $ = mount(<VoronoiSankey />);

  t.equal($.find('.rv-sankey__link').length, 3, 'should find the right number of links');
  t.equal($.find('.rv-sankey__node').length, 3, 'should find the right number of nodes');
  t.equal($.find('.rv-voronoi').length, 1, 'should find the right number of voronoi wrappers');
  t.equal($.find('.rv-voronoi__cell').length, 3, 'should find the right number of voronoi cells');
  t.end();
});
