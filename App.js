const { useState, useEffect } = React;

function App() {
  // ... [Previous state and effect hooks remain unchanged]

  useEffect(() => {
    // Full-page fireworks animation with thicker and fatter fireworks
    const createFirework = () => {
      const firework = document.createElement('div');
      firework.className = 'firework';
      firework.style.left = Math.random() * 100 + 'vw';
      firework.style.top = Math.random() * 100 + 'vh';
      firework.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
      document.body.appendChild(firework);

      setTimeout(() => {
        firework.remove();
      }, 1500);
    };

    const createBurst = (x, y) => {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 300 + 'px');
        particle.style.setProperty('--ty', (Math.random() - 0.5) * 300 + 'px');
        particle.style.setProperty('--scale', Math.random() * 0.5 + 0.5);
        document.body.appendChild(particle);

        setTimeout(() => {
          particle.remove();
        }, 1500);
      }
    };

    const intervalId = setInterval(() => {
      createFirework();
      if (Math.random() > 0.6) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createBurst(x, y);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  // ... [Previous helper functions remain unchanged]

  // CSS for thicker and fatter full-page fireworks animation
  const fireworkStyles = `
    body {
      overflow: hidden;
    }
    .firework {
      position: fixed;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      animation: explode 1.5s ease-out forwards;
    }
    .particle {
      position: fixed;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      animation: burst 1.5s cubic-bezier(0.15, 0.5, 0.5, 0.85) forwards;
    }
    @keyframes explode {
      0% {
        transform: scale(1);
        opacity: 1;
        background: white;
        box-shadow: 0 0 20px 5px white;
      }
      50% {
        background: yellow;
        box-shadow: 0 0 40px 10px yellow;
      }
      100% {
        transform: scale(0);
        opacity: 0;
        background: red;
        box-shadow: 0 0 60px 15px red;
      }
    }
    @keyframes burst {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(var(--tx), var(--ty)) scale(var(--scale));
        opacity: 0;
      }
    }
  `;

  return React.createElement(
    'div',
    { style: { fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', position: 'relative', zIndex: 1 } },
    React.createElement('style', null, fireworkStyles),
    React.createElement('h1', { style: { color: titleColor, transition: 'color 0.5s ease', textAlign: 'left' } }, 'Payment Tracker'),
    // ... [Rest of the component structure remains unchanged]
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
