import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import Vector from './Vector.vue';

// TODO: Skip for now, open an issue on vitest + vite-plugin-svg-icons
describe.skip('Vector.vue', () => {
  it('renders glyph', () => {
    const wrapper = mount(Vector, {
      props: {
        glyph: 'success-filled',
      },
    });

    expect(wrapper.find('.a-vector').exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(true);
    expect(
      wrapper
        .find('svg')
        .html()
        .replace(/(\r\n|\n|\r)/gm, ''),
    ).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="1em" height="1em"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>',
    );
  });

  it('renders glyph as function', () => {
    const wrapper = mount(Vector, {
      props: {
        glyph: () => 'success-filled',
      },
    });

    expect(wrapper.find('.a-vector').exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(true);
    expect(
      wrapper
        .find('svg')
        .html()
        .replace(/(\r\n|\n|\r)/gm, ''),
    ).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="1em" height="1em"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>',
    );
  });

  it('renders glyph with specific width and height', () => {
    const wrapper = mount(Vector, {
      props: {
        glyph: 'success-filled',
        width: 20,
        height: 20,
      },
    });

    expect(wrapper.find('.a-vector').exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(true);
    expect(
      wrapper
        .find('svg')
        .html()
        .replace(/(\r\n|\n|\r)/gm, ''),
    ).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="1em" height="1em"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>',
    );
    expect(wrapper.find('.a-vector').attributes('style')).toEqual('width: 20px; height: 20px;');
  });

  // Should work but test utils is still not complete.
  // Will open a PR if the error is still on after some time

  // it('renders glyphs when changing props value', () => {
  //   const wrapper = mount(Vector, {
  //     props: {
  //       glyph: 'success-filled',
  //     },
  //   });

  //   expect(wrapper.find('.a-vector').exists()).toBe(true);
  //   expect(wrapper.find('svg').exists()).toBe(true);
  //   expect(wrapper.find('svg').html()).toBe(
  //     '< xmlns="http://www.w3.org/2000/svg"svg viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.207-8.96a1 1 0 00-1.414-1.414l-2.626 2.626-.96-.96a1 1 0 00-1.414 1.415l1.667 1.667a1 1 0 001.414 0l3.333-3.334z"></path></svg>',
  //   );

  //   wrapper.setProps({
  //     glyph: 'arrow-down',
  //   });

  //   expect(wrapper.find('.a-vector').exists()).toBe(true);
  //   expect(wrapper.find('svg').exists()).toBe(true);
  //   expect(wrapper.props('glyph')).toBe('arrow-down');
  // });
});
