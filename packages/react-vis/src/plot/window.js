import React, {useMemo, useCallback, useRef, useState, useEffect} from 'react';
import {getAttributeScale} from '../utils/scales-utils';

const DEFAULT_STATE = {
  dragging: false,
  startPosition: null,
  offset: null,

  bounds: null
};

export default function Window(props) {
  const {
    yDomain,
    xDomain,
    left = xDomain[0],
    top = yDomain[1],
    right = xDomain[1],
    bottom = yDomain[0],
    onMoving,
    onMoveComplete,
    enableX = true,
    enableY = true,
    events: {mouseMove, mouseLeave}
  } = props;

  const xScale = useMemo(() => getAttributeScale(props, 'x'), [props]);
  const yScale = useMemo(() => getAttributeScale(props, 'y'), [props]);

  const [state, setState] = useState(DEFAULT_STATE);
  const stateRef = useRef();
  stateRef.current = state;

  const pixelBounds = useMemo(() => {
    return {
      x: xScale(left) + (state.offset?.x ?? 0),
      y: yScale(top) + (state.offset?.y ?? 0),
      width: xScale(right) - xScale(left),
      height: yScale(bottom) - yScale(top)
    };
  }, [
    bottom,
    left,
    right,
    state.offset?.x,
    state.offset?.y,
    top,
    xScale,
    yScale
  ]);

  const onMouseDown = useCallback(e => {
    e.stopPropagation();
    e.preventDefault();

    setState({
      dragging: true,
      startPosition: getPosition(e),
      offset: {x: 0, y: 0}
    });
  }, []);

  const onMouseMove = useCallback(
    e => {
      const {dragging, startPosition} = stateRef.current;
      if (!dragging) {
        return;
      }
      e.stopPropagation();
      e.preventDefault();

      const position = getPosition(e);
      const pixelOffset = {
        x: enableX ? position.x - startPosition.x : 0,
        y: enableY ? position.y - startPosition.y : 0
      };

      const bounds = {
        left: xScale.invert(xScale(left) + pixelOffset.x),
        top: yScale.invert(yScale(top) + pixelOffset.y),
        right: xScale.invert(xScale(right) + pixelOffset.x),
        bottom: yScale.invert(yScale(bottom) + pixelOffset.y)
      };

      onMoving && onMoving(bounds);

      setState(state => ({
        ...state,
        offset: pixelOffset,
        bounds
      }));
    },
    [bottom, enableX, enableY, left, onMoving, right, top, xScale, yScale]
  );

  const onMouseUp = useCallback(
    e => {
      const {dragging} = stateRef.current;
      if (!dragging) {
        return;
      }
      e.stopPropagation();
      e.preventDefault();

      const state = stateRef.current;

      setState(DEFAULT_STATE);
      onMoveComplete && onMoveComplete(state.bounds);
    },
    [onMoveComplete]
  );

  const onPlotMouseLeave = useCallback(() => {
    const state = stateRef.current;
    if (state.dragging) {
      setState(DEFAULT_STATE);
    }
  }, []);

  useEffect(() => mouseMove.subscribe(onMouseMove), [mouseMove, onMouseMove]);
  useEffect(() => mouseLeave.subscribe(onPlotMouseLeave), [
    mouseLeave,
    onPlotMouseLeave
  ]);

  if (
    [pixelBounds.x, pixelBounds.y, pixelBounds.width, pixelBounds.height].some(
      isNaN
    )
  ) {
    return null;
  }

  const {color, opacity = 0.2, style, marginLeft, marginTop} = props;

  return (
    <rect
      cursor="move"
      transform={`translate(${marginLeft}, ${marginTop})`}
      className="rv-highlight"
      {...pixelBounds}
      fill={color}
      fillOpacity={opacity}
      style={style}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
}
Window.requiresSVG = true;

function getPosition(event) {
  event = event.nativeEvent ?? event;
  const x = event.type === 'touchstart' ? event.pageX : event.offsetX;
  const y = event.type === 'touchstart' ? event.pageY : event.offsetY;
  return {x, y};
}
