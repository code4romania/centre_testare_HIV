import React from 'react';
import { HeaderMenu } from './index';

export default {
  title: 'HeaderMenu',
  component: HeaderMenu,
};

const Template = (args) => <HeaderMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  menuItems: [
    {
      to: '/despre',
      label: 'About project',
    },
    {
      to: '/centre',
      label: 'Centers list',
    },
    {
      to: '/blog',
      label: 'Blog',
    },
    {
      to: '/contact',
      label: 'Contact',
    },
    {
      to: '/doneaza',
      label: 'Support the project',
    },
  ],
};
