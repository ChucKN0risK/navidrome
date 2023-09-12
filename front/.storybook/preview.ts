import type { Preview } from '@storybook/vue3'
import { themes } from '@storybook/theming';
import '../src/assets/styles/style.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      theme: themes.dark,
    },
  }
}

export default preview
