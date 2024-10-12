const { useState, useEffect } = React;

function App() {
  const [payments, setPayments] = useState([]);
  const [titleColor, setTitleColor] = useState('#000000');

  useEffect(() => {
    // Fetch data from payments.txt
    fetch('payments.txt')
      .then(response => response.json())
      .then(data => {
        setPayments(data);
      })
      .catch(error => {
        console.error('Error fetching payments:', error);
      });
  }, []);

  useEffect(() => {
    const changeColor = () => {
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      setTitleColor(randomColor);
    };

    const intervalId = setInterval(changeColor, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const createFirework = () => {
      const firework = document.createElement('div');
      firework.className = 'firework';
      firework.style.left = Math.random() * 100 + 'vw';
      firework.style.top = Math.random() * 100 + 'vh';
      document.body.appendChild(firework);

      setTimeout(() => {
        firework.remove();
      }, 1000);
    };

    const intervalId = setInterval(createFirework, 300);

    return () => clearInterval(intervalId);
  }, []);

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

  const getRandomColor = () => {
    const colors = ['#BBDEFB', '#C8E6C9', '#FFF9C4', '#FFCDD2', '#E1BEE7', '#F8BBD0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const fireworkStyles = `
    .firework {
      position: fixed;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ff0000;
      animation: explode 1s ease-out forwards;
    }
    @keyframes explode {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(20); opacity: 0; }
    }
  `;

  return React.createElement(
    'div',
    { style: { fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', position: 'relative', zIndex: 1 } },
    React.createElement('style', null, fireworkStyles),
    React.createElement('h1', { style: { color: titleColor, transition: 'color 0.5s ease', textAlign: 'left' } }, 'Payments Tracker'),
    React.createElement(
      'div',
      { style: { marginBottom: '10px', textAlign: 'left' } },
      React.createElement(
        'span',
        { style: { fontWeight: 'bold' } },
        `Total Collected: $${totalAmount.toFixed(2)}`
      )
    ),
    React.createElement(
      'div',
      { 
        style: { 
          width: '100%', 
          height: '20px', 
          backgroundColor: '#e0e0e0', 
          borderRadius: '10px', 
          overflow: 'hidden',
          display: 'flex',
          marginBottom: '20px'
        } 
      },
      payments.map((payment, index) => 
        React.createElement('div', {
          key: payment.name,
          style: {
            width: `${(payment.amount / totalAmount) * 100}%`,
            height: '100%',
            backgroundColor: getRandomColor(),
            transition: 'width 0.5s ease'
          },
          title: `${payment.name}: $${payment.amount}`
        })
      )
    ),
    React.createElement(
      'div',
      { style: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' } },
      payments.map((payment) =>
        React.createElement(
          'span',
          {
            key: payment.name,
            style: {
              backgroundColor: getRandomColor(),
              color: '#333',
              borderRadius: '20px',
              padding: '5px 10px',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center'
            }
          },
          `${payment.name} ($${payment.amount})`
        )
      )
    )
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
