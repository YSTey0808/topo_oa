import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from '../components/CharacterCard';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  status: 'Alive',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  origin: { name: 'Earth (C-137)' },
  location: { name: 'Citadel of Ricks' },
};

describe('CharacterCard', () => {
  it('renders the character name', () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('renders the character species', () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText('Human')).toBeInTheDocument();
  });

  it('renders the character status', () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText('Alive')).toBeInTheDocument();
  });

  it('renders the origin location', () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
  });

  it('renders the last known location', () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
  });

  it('renders the character image with correct src and alt', () => {
    render(<CharacterCard character={mockCharacter} />);
    const img = screen.getByRole('img', { name: 'Rick Sanchez' });
    expect(img).toHaveAttribute('src', mockCharacter.image);
    expect(img).toHaveAttribute('alt', 'Rick Sanchez');
  });

  it('shows fallback placeholder when image fails to load', () => {
    render(<CharacterCard character={mockCharacter} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('👾')).toBeInTheDocument();
  });

  it('renders Dead status for a dead character', () => {
    render(<CharacterCard character={{ ...mockCharacter, status: 'Dead' }} />);
    expect(screen.getByText('Dead')).toBeInTheDocument();
  });

  it('renders unknown status for an unknown character', () => {
    render(<CharacterCard character={{ ...mockCharacter, status: 'unknown' }} />);
    expect(screen.getByText('unknown')).toBeInTheDocument();
  });
});
