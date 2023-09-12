import type { Meta, StoryObj } from '@storybook/vue3';

import AlbumDetails from './AlbumDetails.vue';

const album = {
  artist: '-M-',
  artistId: 'e970eee9d247d2952b75b163e990b048',
  coverArt: 'al-5e68fcec65def4e8eb990a6f2d4dce72_5060d322',
  created: new Date('2023-08-28T08:21:45.773361596Z'),
  duration: 3132,
  genre: 'Rock',
  id: '5e68fcec65def4e8eb990a6f2d4dce72',
  largeImageUrl: 'http://localhost:4533/share/img/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFsLTVlNjhmY2VjNjVkZWY0ZThlYjk5MGE2ZjJkNGRjZTcyXzUwNjBkMzIyIiwiaXNzIjoiTkQifQ.rMFd67MzWN3EH2zaBqHxtrGSHgi_1wi3a3bLMyIadkU?size=600',
  name: 'Je dis Aime',
  songCount: 15,
  year: 1999,
  song: []
}

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Example/AlbumDetails',
  component: AlbumDetails,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    album: Object,
  },
  args: {}, // default value
} satisfies Meta<typeof AlbumDetails>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    album,
  },
};