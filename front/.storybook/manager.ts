import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
// import myTheme from './myTheme';

addons.setConfig({
  theme: themes.dark,
});