import React, {useEffect, useState, useCallback, useRef} from 'react';
import {getCombinedClassName} from '../utils/styling-utils';
import {getAttributeScale} from '../utils/scales-utils';

const DEFAULT_STATE = {
  brushing: false,
  bounds: null,
  startPosition: null
};

const useStateWithGet = initialState => {
  const [state, setState] = useState(initialState);
  const ref = useRef();
  ref.current = state;
  const get = useCallback(() => ref.current, []);
  return [state, setState, get];
};

export default function ZoomHandler(props) {
  const {
    events: {mouseMove, mouseDown, mouseUp, mouseLeave},
    onZoom,
    enableX = true,
    enableY = true,
    marginLeft = 0,
    marginTop = 0,
    innerWidth = 0,
    innerHeight = 0
  } = props;

  const [state, setState, getState] = useStateWithGet(DEFAULT_STATE);

  const convertArea = useCallback(
    area => {
      const xScale = getAttributeScale(props, 'x');
      const yScale = getAttributeScale(props, 'y');

      return {
        bottom: yScale.invert(area.bottom),
        left: xScale.invert(area.left - marginLeft),
        right: xScale.invert(area.right - marginLeft),
        top: yScale.invert(area.top)
      };
    },
    [marginLeft, props]
  );

  const onMouseMove = useCallback(
    e => {
      const state = getState();
      if (!state.brushing) {
        return;
      }
      e.stopPropagation();
      e.preventDefault();
      const position = getPosition(e);

      setState(state => {
        const bounds = {
          left: enableX
            ? Math.min(position.x, state.startPosition.x)
            : marginLeft,
          top: enableY
            ? Math.min(position.y, state.startPosition.y)
            : marginTop,
          right: enableX
            ? Math.max(position.x, state.startPosition.x)
            : innerWidth + marginLeft,
          bottom: enableY
            ? Math.max(position.y, state.startPosition.y)
            : innerHeight + marginTop
        };
        return {
          ...state,
          bounds
        };
      });
    },
    [
      enableX,
      enableY,
      getState,
      innerHeight,
      innerWidth,
      marginLeft,
      marginTop,
      setState
    ]
  );

  const onMouseDown = useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      const {x, y} = getPosition(e);

      const bounds = {left: x, top: y, right: x, bottom: y};

      setState(state => ({
        ...state,
        brushing: true,
        bounds,
        startPosition: {x, y}
      }));
    },
    [setState]
  );

  const onMouseUp = useCallback(
    e => {
      const state = getState();

      if (!state.brushing) {
        return setState(DEFAULT_STATE);
      }

      e.stopPropagation();
      e.preventDefault();

      if (
        state.bounds.bottom - state.bounds.top > 5 &&
        state.bounds.right - state.bounds.left > 5
      ) {
        onZoom && onZoom(convertArea(state.bounds));
      }

      setState(DEFAULT_STATE);
    },
    [convertArea, getState, onZoom, setState]
  );

  const onMouseLeave = useCallback(() => {
    const state = getState();
    if (state.brushing) {
      setState(DEFAULT_STATE);
    }
  }, [getState, setState]);

  useEffect(() => mouseMove.subscribe(onMouseMove), [mouseMove, onMouseMove]);
  useEffect(() => mouseDown.subscribe(onMouseDown), [mouseDown, onMouseDown]);
  useEffect(() => mouseUp.subscribe(onMouseUp), [mouseUp, onMouseUp]);
  useEffect(() => mouseLeave.subscribe(onMouseLeave), [
    mouseLeave,
    onMouseLeave
  ]);

  if (!state.brushing) {
    return null;
  }

  const {bounds} = state;
  const {opacity, color, className} = props;

  return (
    <g className={getCombinedClassName(className, 'rv-highlight-container')}>
      <rect
        className="rv-highlight"
        pointerEvents="none"
        opacity={opacity}
        fill={color}
        x={bounds.left}
        y={bounds.top}
        width={Math.max(0, bounds.right - bounds.left)}
        height={Math.max(0, bounds.bottom - bounds.top)}
      />
    </g>
  );
}
ZoomHandler.requiresSVG = true;

function getPosition(evt) {
  const x = evt.nativeEvent.offsetX ?? evt.nativeEvent.pageX;
  const y = evt.nativeEvent.offsetY ?? evt.nativeEvent.pageY;
  return {x, y};
}
