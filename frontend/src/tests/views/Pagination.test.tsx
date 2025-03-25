import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest'
import '@testing-library/jest-dom/vitest';
import Pagination from '../../views/Pagination';

describe('Pagination', () => {
  it('renders 10 indexes', () => {
    render(<Pagination pages={10} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});