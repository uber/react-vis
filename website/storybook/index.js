import {setAddon} from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
setAddon(JSXAddon);

import '../../dist/style.css';
import '../.storybook/storybook.css';

import './areaseries-story';
import './axis-story';
import './barseries-story';
import './lineseries-story';
import './markseries-story';
import './legend-story';
