import React from 'react';
import { Hero } from './index';

export default {
  title: 'Hero',
  component: Hero,
};

const Template = (args) => <Hero {...args} />;

export const Default = Template.bind({});
Default.args = {
  heroImage: 'https://picsum.photos/200/300',
  title: 'Hero title',
  children:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum eaque natus minus sed autem dolorem tempore unde, quia nemo repellendus vel consequatur perferendis? Accusantium a officiis repudiandae temporibus possimus blanditiis?',
};
