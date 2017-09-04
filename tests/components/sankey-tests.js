import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';

import Sankey from 'sankey';
import BasicSankey from '../../showcase/sankey/basic';
import VoronoiSankey from '../../showcase/sankey/voronoi';
import EnergySankey from '../../showcase/sankey/energy-sankey';

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
  t.equal($.find('.rv-sankey__node rect').length, 3, 'should find the right number of nodes');

  t.end();
});

test('Sankey: Showcase Example - VoronoiSankey', t => {
  const $ = mount(<VoronoiSankey />);

  t.equal($.find('.rv-sankey__link').length, 3, 'should find the right number of links');
  t.equal($.find('.rv-sankey__node rect').length, 3, 'should find the right number of nodes');
  t.equal($.find('.rv-voronoi').length, 1, 'should find the right number of voronoi wrappers');
  t.equal($.find('.rv-voronoi__cell').length, 3, 'should find the right number of voronoi cells');

  t.equal($.text(), 'None selectedabc', 'should find that no bar is hovered');
  $.find('.rv-voronoi__cell').at(0).simulate('mouseOver');
  t.equal($.text(), 'a selectedabc', 'should find that the first bar is hovered bar is hovered');
  $.find('.rv-voronoi__cell').at(0).simulate('mouseLeave');

  t.end();
});

test('Sankey: Showcase Example - EnergySankey', t => {
  const $ = mount(<EnergySankey />);

  [
    'PREV MODE justify NEXT MODEAgricultural \'waste\'Bio-conversionLiquidLossesSolidGasBiofuel importsBiomass importsCoal importsCoalCoal reservesDistrict heatingIndustryHeating and cooling - commercialHeating and cooling - homesElectricity gridOver generation / exportsH2 conversionRoad transportAgricultureRail transportLighting & appliances - commercialLighting & appliances - homesGas importsNgasGas reservesThermal generationGeothermalH2HydroInternational shippingDomestic aviationInternational aviationNational navigationMarine algaeNuclearOil importsOilOil reservesOther wastePumped heatSolar PVSolar ThermalSolarTidalUK land based bioenergyWaveWind',
    'PREV MODE center NEXT MODEAgricultural \'waste\'Bio-conversionLiquidLossesSolidGasBiofuel importsBiomass importsCoal importsCoalCoal reservesDistrict heatingIndustryHeating and cooling - commercialHeating and cooling - homesElectricity gridOver generation / exportsH2 conversionRoad transportAgricultureRail transportLighting & appliances - commercialLighting & appliances - homesGas importsNgasGas reservesThermal generationGeothermalH2HydroInternational shippingDomestic aviationInternational aviationNational navigationMarine algaeNuclearOil importsOilOil reservesOther wastePumped heatSolar PVSolar ThermalSolarTidalUK land based bioenergyWaveWind',
    'PREV MODE left NEXT MODEAgricultural \'waste\'Bio-conversionLiquidLossesSolidGasBiofuel importsBiomass importsCoal importsCoalCoal reservesDistrict heatingIndustryHeating and cooling - commercialHeating and cooling - homesElectricity gridOver generation / exportsH2 conversionRoad transportAgricultureRail transportLighting & appliances - commercialLighting & appliances - homesGas importsNgasGas reservesThermal generationGeothermalH2HydroInternational shippingDomestic aviationInternational aviationNational navigationMarine algaeNuclearOil importsOilOil reservesOther wastePumped heatSolar PVSolar ThermalSolarTidalUK land based bioenergyWaveWind',
    'PREV MODE right NEXT MODEAgricultural \'waste\'Bio-conversionLiquidLossesSolidGasBiofuel importsBiomass importsCoal importsCoalCoal reservesDistrict heatingIndustryHeating and cooling - commercialHeating and cooling - homesElectricity gridOver generation / exportsH2 conversionRoad transportAgricultureRail transportLighting & appliances - commercialLighting & appliances - homesGas importsNgasGas reservesThermal generationGeothermalH2HydroInternational shippingDomestic aviationInternational aviationNational navigationMarine algaeNuclearOil importsOilOil reservesOther wastePumped heatSolar PVSolar ThermalSolarTidalUK land based bioenergyWaveWind'
  ].forEach(testMessage => {
    t.equal($.text(), testMessage, 'should find that no bar is hovered');
    $.find('.showcase-button').at(1).simulate('click');

    t.equal($.find('.rv-sankey__link').length, 68, 'should find the right number of links');
    t.equal($.find('.rv-sankey__node rect').length, 48, 'should find the right number of nodes');
  });

  t.end();
});
