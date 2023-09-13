import type { Meta, StoryObj } from '@storybook/vue3';
import MainNav from './MainNav.vue';
import { vueRouter } from 'storybook-vue3-router';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Example/MainNav',
  component: MainNav,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
  args: {}, // default value
} satisfies Meta<typeof MainNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/* your story export */
export const Default: Story = Template.bind({})

/* adding storybook-vue3-router decorator */
Default.decorators = [
  /* this is the basic setup with no params passed to the decorator */
  vueRouter()
]