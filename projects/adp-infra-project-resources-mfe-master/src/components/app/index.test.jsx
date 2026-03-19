// Libraries
import React from 'react';
import { render } from '@testing-library/react';

// Components
import App from './index';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});
