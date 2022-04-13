import { Trans } from '@lingui/macro';
import React, { useMemo } from 'react';

export const useMenuItems = () => {
  return useMemo(
    () => [
      {
        to: '/despre',
        label: <Trans>About project</Trans>,
      },
      {
        to: '/centre',
        label: <Trans>Centers list</Trans>,
      },
      {
        to: '/blog',
        label: <Trans>Blog</Trans>,
      },
      {
        to: '/contact',
        label: <Trans>Contact</Trans>,
      },
      {
        to: '/doneaza',
        label: <Trans>Support the project</Trans>,
        className: 'header-donate',
      },
    ],
    [],
  );
};

export default { useMenuItems };
