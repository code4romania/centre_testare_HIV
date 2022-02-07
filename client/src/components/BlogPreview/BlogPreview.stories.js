import React from 'react';
import { BlogPreview } from './index';

export default {
  title: 'BlogPreview',
  component: BlogPreview,
};

const Template = (args) => <BlogPreview {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Blog',
  isLoadingPosts: false,
  isErrorLoadingPosts: false,
  posts: [],
};

export const LoadingPosts = Template.bind({});
LoadingPosts.args = {
  ...Default.args,
  isLoadingPosts: true,
};

export const WithPosts = Template.bind({});
WithPosts.args = {
  ...Default.args,
  posts: [
    {
      slug: 'slug1',
      title: 'Title 1',
      image: 'https://picsum.photos/200/300',
    },
    {
      slug: 'slug2',
      title: 'Title 2',
      image: 'https://picsum.photos/200/300',
    },
    {
      slug: 'slug3',
      title: 'Title 3',
      image: 'https://picsum.photos/200/300',
    },
  ],
};
