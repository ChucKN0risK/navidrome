import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import SpText from './SpText.vue';

describe('SpText.vue', () => {
  it('renders text', () => {
    const wrapper = mount(SpText, {
      props: {
        text: 'Test SpText',
      },
    });

    expect(wrapper.find('.a-text').exists()).toBe(true);
    expect(wrapper.find('.a-text').text()).toBe('Test SpText');
  });

  it('renders text with defined type', () => {
    const wrapper = mount(SpText, {
      props: {
        text: 'Test SpText',
        type: 'body-s',
      },
    });

    expect(wrapper.find('.a-text').exists()).toBe(true);
    expect(wrapper.find('.a-text').text()).toBe('Test SpText');
    expect(wrapper.find('.a-text').classes().includes('a-text--body-s')).toBe(true);
  });

  it('renders text with defined tag', () => {
    const wrapper = mount(SpText, {
      props: {
        text: 'Test SpText',
        tag: 'span',
      },
    });

    expect(wrapper.find('.a-text').exists()).toBe(true);
    expect(wrapper.find('.a-text').text()).toBe('Test SpText');
    expect(wrapper.find('.a-text').html()).toEqual(
      '<span class="a-text a-text--body-m" style="max-width: auto;">Test SpText</span>',
    );
  });

  it('renders text as selectable', () => {
    const wrapper = mount(SpText, {
      props: {
        text: 'Test SpText',
        isSelectable: true,
      },
    });

    expect(wrapper.find('.a-text').exists()).toBe(true);
    expect(wrapper.find('.a-text').text()).toBe('Test SpText');
    expect(wrapper.find('.a-text').classes().includes('u-user-select:text')).toBe(true);
  });
});
