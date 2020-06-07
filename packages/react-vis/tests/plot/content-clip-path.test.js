import React from 'react';
import {shallow} from 'enzyme';
import ContentClipPath from '../../src/plot/content-clip-path';

describe('content-clip-path', () => {
  it('should render', () => {
    const wrapper = shallow(
      <ContentClipPath id="foo" innerWidth={300} innerHeight={200} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should default id to content-area', () => {
    const wrapper = shallow(
      <ContentClipPath innerWidth={300} innerHeight={200} />
    );
    const clip = wrapper.find('clipPath');
    expect(clip.prop('id')).toEqual('content-area');
  });
});
