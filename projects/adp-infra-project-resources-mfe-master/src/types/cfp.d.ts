import React = require('react');

declare global {
  interface Window {
    cfp: {
      mfe: Record<string, React.ComponentType>;
      // @see https://git.autodesk.com/dpe/cfp-runtime/blob/master/src/types/index.d.ts
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      providers: any;
    };
  }
}
