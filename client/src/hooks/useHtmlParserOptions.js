import React, { useMemo } from 'react';

export const useHtmlParserOptions = () => {
  return useMemo(
    () => ({
      // eslint-disable-next-line consistent-return
      transform: (domNode) => {
        const { name, children } = domNode;

        if (name === 'p' && children.length > 0) {
          const imgChild = children.find(({ name: childName }) => childName === 'img');

          if (imgChild) {
            const {
              attribs: { src, alt },
            } = imgChild;

            return (
              <div className="post-img">
                <img src={src} alt={alt} />
              </div>
            );
          }
        }
      },
    }),
    [],
  );
};

export default { useHtmlParserOptions };
