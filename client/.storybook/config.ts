import { configure } from '@storybook/react';

// // automatically import all files ending in *.stories.tsx
// configure(require.context('../', true, /\.stories\.tsx?$/), module)

// const req = require.context('../src', true, /\.stories\.tsx?$/);

function loadStories() {
  require('../src/stories/productCard.stories')
  require('../src/stories/scheduler.stories')
  require('../src/stories/Footer.stories')
  require('../src/stories/dayPicker.stories')
  require('../src/stories/calendar.stories')
  require('../src/stories/monthView.stories')
  // req.keys().forEach(req);
}

configure(loadStories, module);