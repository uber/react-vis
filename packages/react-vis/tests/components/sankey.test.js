import React from 'react';
import {mount} from 'enzyme';

import Sankey from '~/sankey';
import Hint from '~/plot/hint';
import BasicSankey from '../../../showcase/sankey/basic';
import VoronoiSankey from '../../../showcase/sankey/voronoi';
import EnergySankey from '../../../showcase/sankey/energy-sankey';
import LinkEventSankey from '../../../showcase/sankey/link-event';
import LinkHintSankey from '../../../showcase/sankey/link-hint';

const SANKEY_PROPS = {
  nodes: [],
  links: [],
  width: 200,
  height: 200,
  strokeWidth: 1
};

import {testRenderWithProps} from '../test-utils';

describe('Sankey', () => {
  // make sure that the components render at all
  testRenderWithProps(Sankey, SANKEY_PROPS);

  test('labels', () => {
    const wrap = mount(
      <Sankey
        height={100}
        width={100}
        nodes={[{name: 'a'}, {name: 'b'}]}
        links={[{source: 0, target: 1, value: 10}]}
      />
    );

    expect(wrap.find('text').length).toBe(2);
    wrap.setProps({hideLabels: true});
    expect(wrap.find('text').length).toBe(0);
  });

  test('children', () => {
    const $ = mount(
      <Sankey
        height={100}
        width={100}
        nodes={[{name: 'a'}, {name: 'b'}]}
        links={[{source: 0, target: 1, value: 10}]}
      >
        <Hint x={0} y={0} value={{test: 123}} />
      </Sankey>
    );
    expect($.find(Hint).length).toBe(1);
  });

  test('Showcase Example - BasicSankey', () => {
    const $ = mount(<BasicSankey />);
    expect($.find('.rv-sankey__link').length).toBe(3);
    expect($.find('.rv-sankey__node rect').length).toBe(3);
  });

  test('Showcase Example - VoronoiSankey', () => {
    const $ = mount(<VoronoiSankey />);

    expect($.find('.rv-sankey__link').length).toBe(3);
    expect($.find('.rv-sankey__node rect').length).toBe(3);
    expect($.find('.rv-voronoi').length).toBe(1);
    expect($.find('.rv-voronoi__cell').length).toBe(3);

    expect($.text()).toBe('None selectedabc');
    $.find('.rv-voronoi__cell')
      .at(0)
      .simulate('mouseOver');
    expect($.text()).toBe('a selected!a!bc');
    $.find('.rv-voronoi__cell')
      .at(0)
      .simulate('mouseLeave');
  });

  test('Showcase Example - LinkEventSankey', () => {
    const $ = mount(<LinkEventSankey />);

    expect($.find('.rv-sankey__link').length).toBe(3);
    expect($.find('.rv-sankey__node rect').length).toBe(3);

    expect($.text()).toBe('None selectedabc');
    $.find('.rv-sankey__link')
      .at(0)
      .simulate('mouseOver');
    expect($.text()).toBe('a -> b selectedabc');
    $.find('.rv-sankey__link')
      .at(0)
      .simulate('mouseOut');
    expect($.text()).toBe('None selectedabc');
  });

  test('Showcase Example - EnergySankey', () => {
    const $ = mount(<EnergySankey />);

    [
      "PREV MODE justify NEXT MODEAgricultural 'waste'Bio-conversionLiquidLossesSolidGasBiofuel importsBiomass importsCoal importsCoalCoal reservesDistrict heatingIndustryHeating and cooling - commercialHeating and cooling - homesElectricity gridOver generation / exportsH2 conversionRoad transportAgricultureRail transportLighting & appliances - commercialLighting & appliances - homesGas importsNgasGas reservesThermal generationGeothermalH2HydroInternational shippingDomestic aviationInternational aviationNational navigationMarine algaeNuclearOil importsOilOil reservesOther wastePumped heatSolar PVSolar ThermalSolarTidalUK land based bioenergyWaveWind",
      "PREV MODE center NEXT MODEAgricultural 'waste'Bio-conversionLiquidLossesSolidGasBiofuel importsBiomass importsCoal importsCoalCoal reservesDistrict heatingIndustryHeating and cooling - commercialHeating and cooling - homesElectricity gridOver generation / exportsH2 conversionRoad transportAgricultureRail transportLighting & appliances - commercialLighting & appliances - homesGas importsNgasGas reservesThermal generationGeothermalH2HydroInternational shippingDomestic aviationInternational aviationNational navigationMarine algaeNuclearOil importsOilOil reservesOther wastePumped heatSolar PVSolar ThermalSolarTidalUK land based bioenergyWaveWind",
      "PREV MODE left NEXT MODEAgricultural 'waste'Bio-conversionLiquidLossesSolidGasBiofuel importsBiomass importsCoal importsCoalCoal reservesDistrict heatingIndustryHeating and cooling - commercialHeating and cooling - homesElectricity gridOver generation / exportsH2 conversionRoad transportAgricultureRail transportLighting & appliances - commercialLighting & appliances - homesGas importsNgasGas reservesThermal generationGeothermalH2HydroInternational shippingDomestic aviationInternational aviationNational navigationMarine algaeNuclearOil importsOilOil reservesOther wastePumped heatSolar PVSolar ThermalSolarTidalUK land based bioenergyWaveWind",
      "PREV MODE right NEXT MODEAgricultural 'waste'Bio-conversionLiquidLossesSolidGasBiofuel importsBiomass importsCoal importsCoalCoal reservesDistrict heatingIndustryHeating and cooling - commercialHeating and cooling - homesElectricity gridOver generation / exportsH2 conversionRoad transportAgricultureRail transportLighting & appliances - commercialLighting & appliances - homesGas importsNgasGas reservesThermal generationGeothermalH2HydroInternational shippingDomestic aviationInternational aviationNational navigationMarine algaeNuclearOil importsOilOil reservesOther wastePumped heatSolar PVSolar ThermalSolarTidalUK land based bioenergyWaveWind"
    ].forEach(testMessage => {
      expect($.text()).toBe(testMessage);
      $.find('.showcase-button')
        .at(1)
        .simulate('click');

      expect($.find('.rv-sankey__link').length).toBe(68);
      expect($.find('.rv-sankey__node rect').length).toBe(48);
    });
  });

  test('Showcase Example - LinkHintSankey', () => {
    const $ = mount(<LinkHintSankey />);

    expect($.find('.rv-sankey__link').length).toBe(3);
    expect($.find('.rv-sankey__node rect').length).toBe(3);

    expect($.find(Hint).length).toBe(0);
    $.find('.rv-sankey__link')
      .at(0)
      .simulate('mouseOver');
    expect($.find(Hint).length).toBe(1);
    $.find('.rv-sankey__link')
      .at(0)
      .simulate('mouseOut');
    expect($.find(Hint).length).toBe(0);
  });
});
