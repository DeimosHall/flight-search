import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest'
import '@testing-library/jest-dom/vitest';
import Metrics from '../../views/Metrics';

describe('Metrics', () => {
  const metrics = { pages: 0, avgTime: 0, avgTimeLow: 0, avgTimeMedium: 0, avgTimeHigh: 0 };

  it('renders correctly', () => {
    render(<Metrics metrics={metrics} />);
    expect(screen.getByText('Average time to finish tasks:')).toBeInTheDocument();
    expect(screen.getByText('Average time to finish tasks by priority:')).toBeInTheDocument();
  });
});