import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';

// Mock AI service
vi.mock('../../services/ai', () => ({
  getVitoMessage: vi.fn(),
}));

// Mock TutorMode to avoid complex rendering
vi.mock('../TutorMode', () => ({
  default: () => <div data-testid="tutor-mode">Tutor Mode</div>,
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders main components', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Uncle Vito's Casino Guide/i })).toBeInTheDocument();
    expect(screen.getByText(/America's Social Casino/i)).toBeInTheDocument();
  });

  it('launches Tutor Mode when requested', async () => {
    render(<App />);

    // Find button to launch Vito
    const heroButton = screen.getByText(/Talk to Uncle Vito/i);
    fireEvent.click(heroButton);

    // Check if Vito widget is visible
    expect(screen.getByText(/Alright, let's see what you got/i)).toBeInTheDocument();

    // Click Practice Blackjack
    fireEvent.click(screen.getByText('Practice Blackjack'));

    await waitFor(() => {
      expect(screen.getByTestId('tutor-mode')).toBeInTheDocument();
    });
  });
});
