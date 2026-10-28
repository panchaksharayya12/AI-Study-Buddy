import confetti from 'canvas-confetti';

export const triggerCelebration = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ['#6366F1', '#8B5CF6', '#38BDF8', '#10B981', '#F59E0B'],
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const triggerMiniStars = (x = 0.5, y = 0.5) => {
  confetti({
    particleCount: 40,
    spread: 70,
    origin: { x, y },
    colors: ['#38BDF8', '#8B5CF6', '#EC4899'],
    ticks: 150,
    gravity: 0.8,
    scalar: 0.7,
    zIndex: 9999,
  });
};
