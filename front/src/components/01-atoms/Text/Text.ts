import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import Text from './Text.vue';

describe('Text.vue', () => {
  it('renders text', () => {
    const wrapper = mount(Text, {
      props: {
        text: 'Test Text',
      },
    });

    expect(wrapper.find('.a-text').exists()).toBe(true);
    expect(wrapper.find('.a-text').text()).toBe('Test Text');
  });

  it('renders text with defined type', () => {
    const wrapper = mount(Text, {
      props: {
        text: 'Test Text',
        type: 'body-s',
      },
    });

    expect(wrapper.find('.a-text').exists()).toBe(true);
    expect(wrapper.find('.a-text').text()).toBe('Test Text');
    expect(wrapper.find('.a-text').classes().includes('a-text--body-s')).toBe(true);
  });

  it('renders text with defined tag', () => {
    const wrapper = mount(Text, {
      props: {
        text: 'Test Text',
        tag: 'span',
      },
    });

    expect(wrapper.find('.a-text').exists()).toBe(true);
    expect(wrapper.find('.a-text').text()).toBe('Test Text');
    expect(wrapper.find('.a-text').html()).toEqual(
      '<span class="a-text a-text--body-m" style="max-width: auto;">Test Text</span>',
    );
  });

  it('renders text as selectable', () => {
    const wrapper = mount(Text, {
      props: {
        text: 'Test Text',
        isSelectable: true,
      },
    });

    expect(wrapper.find('.a-text').exists()).toBe(true);
    expect(wrapper.find('.a-text').text()).toBe('Test Text');
    expect(wrapper.find('.a-text').classes().includes('u-user-select:text')).toBe(true);
  });
});
