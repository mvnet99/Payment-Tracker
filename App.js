const { useState, useEffect } = React;

function App() {
  const [payments, setPayments] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [secretCode, setSecretCode] = useState('');
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
    const handleKeyPress = (event) => {
      setSecretCode(prevCode => prevCode + event.key);
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (secretCode.endsWith('adminmode')) {
      setIsAdminMode(prevMode => !prevMode);
      setSecretCode('');
    }
  }, [secretCode]);

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

  const addPayment = (e) => {
    e.preventDefault();
    if (name && amount) {
      const newPayment = {
        id: Date.now().toString(),
        name,
        amount: parseFloat(amount)
      };
      setPayments([...payments, newPayment]);
      setName('');
      setAmount('');
    }
  };

  const deletePayment = (id) => {
    setPayments(payments.filter(payment => payment.id !== id));
  };

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const maxAmount = Math.max(...payments.map(p => p.amount), 100);

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
    React.createElement('h1', { style: { color: titleColor, transition: 'color 0.5s ease', textAlign: 'left' } }, 'Payment Tracker'),
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
      { style: { width: '100%', backgroundColor: '#e0e0e0', borderRadius: '10px', height: '10px', marginBottom: '20px' } },
      React.createElement('div', {
        style: {
          width: `${(totalAmount / maxAmount) * 100}%`,
          backgroundColor: '#2196F3',
          height: '100%',
          borderRadius: '10px'
        }
      })
    ),
    React.createElement(
      'div',
      { style: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' } },
      payments.map((payment) =>
        React.createElement(
          'span',
          {
            key: payment.id || payment.name,
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
          payment.name,
          isAdminMode && React.createElement(
            'button',
            {
              onClick: () => deletePayment(payment.id || payment.name),
              style: {
                marginLeft: '5px',
                background: 'none',
                border: 'none',
                color: '#f44336',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }
            },
            '×'
          )
        )
      )
    ),
    isAdminMode && React.createElement(
      'form',
      { onSubmit: addPayment, style: { marginBottom: '20px', display: 'flex', gap: '10px' } },
      React.createElement('input', {
        type: 'text',
        value: name,
        onChange: (e) => setName(e.target.value),
        placeholder: 'Name',
        style: { flex: 1, padding: '5px' }
      }),
      React.createElement('input', {
        type: 'number',
        value: amount,
        onChange: (e) => setAmount(e.target.value),
        placeholder: 'Amount',
        style: { flex: 1, padding: '5px' }
      }),
      React.createElement(
        'button',
        { type: 'submit', style: { padding: '5px 10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' } },
        'Add Payment'
      )
    )
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
