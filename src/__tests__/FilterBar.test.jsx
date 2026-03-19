import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../components/FilterBar';

const defaultProps = {
  filters: { search: '', species: '', status: '', origin: '' },
  speciesOptions: ['Alien', 'Human', 'Humanoid'],
  originOptions: ['Earth (C-137)', 'Squanch Planet'],
  onChange: vi.fn(),
  onReset: vi.fn(),
  loading: false,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('FilterBar', () => {
  it('renders the search input', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByPlaceholderText('Search by name...')).toBeInTheDocument();
  });

  it('renders species, status, and origin selects', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByText('All Species')).toBeInTheDocument();
    expect(screen.getByText('All Status')).toBeInTheDocument();
    expect(screen.getByText('All Origins')).toBeInTheDocument();
  });

  it('renders the Reset button', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });

  it('populates species options from props', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByRole('option', { name: 'Human' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Alien' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Humanoid' })).toBeInTheDocument();
  });

  it('populates origin options from props', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByRole('option', { name: 'Earth (C-137)' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Squanch Planet' })).toBeInTheDocument();
  });

  it('calls onChange with "search" key when typing in the search input', () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.change(screen.getByPlaceholderText('Search by name...'), { target: { value: 'Morty' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('search', 'Morty');
  });

  it('calls onChange with "species" key when selecting a species', () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.change(screen.getByDisplayValue('All Species'), { target: { value: 'Human' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('species', 'Human');
  });

  it('calls onChange with "status" key when selecting a status', () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.change(screen.getByDisplayValue('All Status'), { target: { value: 'Alive' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('status', 'Alive');
  });

  it('calls onChange with "origin" key when selecting an origin', () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.change(screen.getByDisplayValue('All Origins'), { target: { value: 'Earth (C-137)' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('origin', 'Earth (C-137)');
  });

  it('calls onReset when the Reset button is clicked', () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(defaultProps.onReset).toHaveBeenCalledOnce();
  });

  it('disables all inputs and Reset button when loading is true', () => {
    render(<FilterBar {...defaultProps} loading={true} />);
    expect(screen.getByPlaceholderText('Search by name...')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeDisabled();
  });

  it('reflects the current filter values from props', () => {
    render(
      <FilterBar
        {...defaultProps}
        filters={{ search: 'Rick', species: 'Human', status: 'Alive', origin: 'Earth (C-137)' }}
      />,
    );
    expect(screen.getByDisplayValue('Rick')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Human')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Alive')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Earth (C-137)')).toBeInTheDocument();
  });
});
