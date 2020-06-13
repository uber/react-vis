import {Event} from '../../src/utils/events';

describe('events', () => {
  it('should subscribe', () => {
    const event = new Event();
    const handler = jest.fn();
    event.subscribe(handler);
    expect(event.subscribers).toHaveLength(1);

    event.fire('foo');
    expect(handler).toHaveBeenCalledWith('foo');
  });

  it('should unsubscribe', () => {
    const event = new Event();
    const handler = jest.fn();
    const unsubscribe = event.subscribe(handler);
    expect(event.subscribers).toHaveLength(1);

    unsubscribe();
    expect(event.subscribers).toHaveLength(0);

    event.fire('foo');

    expect(handler).not.toHaveBeenCalled();
  });
});
