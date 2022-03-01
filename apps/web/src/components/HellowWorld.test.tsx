import HelloWorld from '@src/components/HelloWorld';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('tests', () => {
  it('should', () => {
    render(<HelloWorld />);
    expect(screen.getByText('Boop')).toBeInTheDocument();
  });
});
