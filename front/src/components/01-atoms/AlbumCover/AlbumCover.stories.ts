import type { Meta, StoryObj } from '@storybook/vue3';
import AlbumCover from './AlbumCover.vue';
import { vueRouter } from 'storybook-vue3-router';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Example/AlbumCover',
  component: AlbumCover,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: String,
    coverUrl: String,
  },
  args: {
    size: 'small',
    coverUrl: 'http://localhost:4533/share/img/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFsLTliMzUzMDRjOTM1OWU5MmRlYWYyNDlkZmFiM2Q1YWNhXzU1YTJkNjQ4IiwiaXNzIjoiTkQifQ.H6AlkY3_0Qz4St-qdAXmHTD4b4UDralbMrljvt0EEj8?size=600'
  }, // default value
} satisfies Meta<typeof AlbumCover>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {},
};