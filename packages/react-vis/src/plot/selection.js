import React, {useEffect, useState, useCallback, useRef} from 'react';
import {getAttributeScale} from '../utils/scales-utils';

const DEFAULT_STATE = {
  brushing: false,
  bounds: null,
  startPosition: null
};

export default function Selection(props) {
  const {
    events: {mouseMove, mouseDown, mouseUp, mouseLeave},
    onSelecting,
    onSelected,
    enableX = true,
    enableY = true,
    marginLeft = 0,
    marginTop = 0,
    innerWidth = 0,
    innerHeight = 0,
    xDomain,
    yDomain
  } = props;

  const [state, setState] = useState(DEFAULT_STATE);
  // The 'state' is being assigned to the 'ref' so that the `useCallback`s can
  // reference the value without directly depending on it.
  // This is important for performance reasons, as directly depending on the state,
  // will cause the event handlers to be added and removed for each move of the mouse.
  // The lifecycle of the callbacks isn't affected by the value of the 'state', so
  // there is no harm in using the `stateRef` to get the latest value of the `state`
  const stateRef = useRef();
  stateRef.current = state;

  const convertArea = useCallback(
    area => {
      const xScale = getAttributeScale(props, 'x');
      const yScale = getAttributeScale(props, 'y');

      // If the axis isn't enabled, then use the domain to ensure
      // that the entire space is selected.
      return {
        left: enableX ? xScale.invert(area.left - marginLeft) : xDomain[0],
        top: enableY ? yScale.invert(area.top - marginTop) : yDomain[1],
        right: enableX ? xScale.invert(area.right - marginLeft) : yDomain[1],
        bottom: enableY ? yScale.invert(area.bottom - marginTop) : yDomain[0]
      };
    },
    [enableX, enableY, marginLeft, marginTop, props, xDomain, yDomain]
  );

  const onMouseMove = useCallback(
    e => {
      // Get the current value of 'state'
      const state = stateRef.current;
      if (!state.brushing) {
        return;
      }
      e.stopPropagation();
      e.preventDefault();
      const position = getPosition(e);

      const bounds = {
        left: enableX
          ? Math.min(position.x, state.startPosition.x)
          : marginLeft,
        top: enableY ? Math.min(position.y, state.startPosition.y) : marginTop,
        right: enableX
          ? Math.max(position.x, state.startPosition.x)
          : innerWidth + marginLeft,
        bottom: enableY
          ? Math.max(position.y, state.startPosition.y)
          : innerHeight + marginTop
      };

      onSelecting && onSelecting(convertArea(bounds));

      setState({
        ...state,
        bounds
      });
    },
    [
      convertArea,
      enableX,
      enableY,
      innerHeight,
      innerWidth,
      marginLeft,
      marginTop,
      onSelecting
    ]
  );

  const onMouseDown = useCallback(e => {
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
  }, []);

  const onMouseUp = useCallback(
    e => {
      // Get the current value of 'state'
      const state = stateRef.current;

      if (!state.brushing) {
        return setState(DEFAULT_STATE);
      }

      e.stopPropagation();
      e.preventDefault();

      if (
        state.bounds.bottom - state.bounds.top > 5 &&
        state.bounds.right - state.bounds.left > 5
      ) {
        onSelected && onSelected(convertArea(state.bounds));
      } else {
        onSelected && onSelected(null);
      }

      setState(DEFAULT_STATE);
    },
    [convertArea, onSelected]
  );

  const onMouseLeave = useCallback(() => {
    const state = stateRef.current;
    if (state.brushing) {
      setState(DEFAULT_STATE);
    }
  }, []);

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
  const {opacity = 0.2, color, style} = props;

  return (
    <rect
      className="rv-highlight"
      pointerEvents="none"
      fill={color}
      fillOpacity={opacity}
      x={bounds.left}
      y={bounds.top}
      style={style}
      width={Math.max(0, bounds.right - bounds.left)}
      height={Math.max(0, bounds.bottom - bounds.top)}
    />
  );
}
Selection.requiresSVG = true;

function getPosition(event) {
  event = event.nativeEvent ?? event;
  const x = event.type === 'touchstart' ? event.pageX : event.offsetX;
  const y = event.type === 'touchstart' ? event.pageY : event.offsetY;
  return {x, y};
}
