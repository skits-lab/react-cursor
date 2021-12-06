import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Cursor } from './Cursor.component';

export default {
  title: 'Cursor',
  component: Cursor,
  argTypes: {
    size: { control: 'number' },
    opacity: { control: 'number' },
    color: { control: 'text' },
    radius: { control: 'number' },
    zIndex: { control: 'number' },
    className: { control: 'text' },
  },
  parameters: {
    controls: { exclude: ['onMouseDown', 'onMouseUp', 'useCss'] },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Cursor>;

const Template: ComponentStory<typeof Cursor> = (args) => (
  <Cursor
    {...args}
    onMouseDown={(cursorElement, shapeElement) => {
      shapeElement.style.transform = 'scale(1.5)';
    }}
    onMouseUp={(cursorElement, shapeElement) => {
      shapeElement.style.transform = 'scale(1)';
    }}
  />
);

export const Default = Template.bind({});
Default.args = {
  size: 40,
  opacity: 0.5,
  color: 'red',
  radius: '50%',
  zIndex: 999999,
  className: '',
  useCss: false,
};
