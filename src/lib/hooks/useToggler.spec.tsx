import { act } from 'react-dom/test-utils';

import { useToggler } from './useToggler';
import { customHookRender } from '../../tests/testSetup';

describe('useToggler', () => {
  const setup = (props: boolean) => customHookRender(() => useToggler(props));

  it('returns initial state', () => {
    const { result } = setup(false);

    expect(result.current.state).toBe(false);
  });

  it('changes state to true', () => {
    const { result } = setup(false);

    act(() => {
      result.current.on();
    });

    expect(result.current.state).toBe(true);
  });

  it('changes state to false', () => {
    const { result } = setup(true);

    act(() => {
      result.current.off();
    });

    expect(result.current.state).toBe(false);
  });

  it('toggle state back and forth', () => {
    const { result } = setup(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.state).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.state).toBe(false);
  });
});
