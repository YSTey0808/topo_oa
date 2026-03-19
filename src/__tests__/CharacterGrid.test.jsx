import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterGrid from '../components/CharacterGrid';

function makeChar(id) {
  return {
    id,
    name: `Character ${id}`,
    species: 'Human',
    status: 'Alive',
    image: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
    origin: { name: 'Earth (C-137)' },
    location: { name: 'Citadel of Ricks' },
  };
}

const twoChars = [makeChar(1), makeChar(2)];

describe('CharacterGrid', () => {
  it('shows empty state when characters array is empty', () => {
    render(<CharacterGrid characters={[]} total={0} page={1} totalPages={0} onPageChange={vi.fn()} />);
    expect(screen.getByText('No characters found')).toBeInTheDocument();
  });

  it('renders a card for each character', () => {
    render(<CharacterGrid characters={twoChars} total={2} page={1} totalPages={1} onPageChange={vi.fn()} />);
    expect(screen.getByText('Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character 2')).toBeInTheDocument();
  });

  it('shows the correct count text', () => {
    render(<CharacterGrid characters={twoChars} total={2} page={1} totalPages={1} onPageChange={vi.fn()} />);
    expect(screen.getByText(/Showing 1–2 of 2 characters/)).toBeInTheDocument();
  });

  it('uses singular "character" when total is 1', () => {
    render(<CharacterGrid characters={[makeChar(1)]} total={1} page={1} totalPages={1} onPageChange={vi.fn()} />);
    expect(screen.getByText(/Showing 1–1 of 1 character$/)).toBeInTheDocument();
  });

  it('does not render pagination when totalPages is 1', () => {
    render(<CharacterGrid characters={twoChars} total={2} page={1} totalPages={1} onPageChange={vi.fn()} />);
    expect(screen.queryByRole('button', { name: /Previous/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Next/ })).not.toBeInTheDocument();
  });

  it('renders pagination when totalPages is greater than 1', () => {
    render(<CharacterGrid characters={twoChars} total={40} page={1} totalPages={2} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: /Previous/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next/ })).toBeInTheDocument();
  });

  it('disables the Previous button on the first page', () => {
    render(<CharacterGrid characters={twoChars} total={40} page={1} totalPages={2} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: /Previous/ })).toBeDisabled();
  });

  it('disables the Next button on the last page', () => {
    render(<CharacterGrid characters={twoChars} total={40} page={2} totalPages={2} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: /Next/ })).toBeDisabled();
  });

  it('calls onPageChange when the Next button is clicked', () => {
    const onPageChange = vi.fn();
    render(<CharacterGrid characters={twoChars} total={40} page={1} totalPages={2} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    expect(onPageChange).toHaveBeenCalledOnce();
  });

  it('calls onPageChange when the Previous button is clicked', () => {
    const onPageChange = vi.fn();
    render(<CharacterGrid characters={twoChars} total={40} page={2} totalPages={2} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /Previous/ }));
    expect(onPageChange).toHaveBeenCalledOnce();
  });

  it('displays the current page and total pages', () => {
    render(<CharacterGrid characters={twoChars} total={40} page={2} totalPages={3} onPageChange={vi.fn()} />);
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
  });
});
