const { useState, useEffect } = React;

function App() {
  const [payments, setPayments] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [titleColor, setTitleColor] = useState('#000000');

  // Function to encode payments data to base64
  const encodePayments = (payments) => {
    return btoa(JSON.stringify(payments));
  };

  // Function to decode payments data from base64
  const decodePayments = (encoded) => {
    try {
      return JSON.parse(atob(encoded));
    } catch (e) {
      console.error("Failed to decode payments:", e);
      return [];
    }
  };

  // Function to update URL with encoded payments data
  const updateURL = (payments) => {
    const encoded = encodePayments(payments);
    window.history.pushState({}, '', `?data=${encoded}`);
  };

  // Load initial data from URL or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    if (encodedData) {
      setPayments(decodePayments(encodedData));
    } else {
      const savedPayments = localStorage.getItem('payments');
      if (savedPayments) {
        setPayments(JSON.parse(savedPayments));
      }
    }
  }, []);

  // Update localStorage and URL when payments change
  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
    updateURL(payments);
  }, [payments]);

  // ... [Rest of the effects remain unchanged]

  const addPayment = (e) => {
    e.preventDefault();
    if (name && amount) {
      const newPayment = {
        id: Date.now().toString(),
        name,
        amount: parseFloat(amount)
      };
      const updatedPayments = [...payments, newPayment];
      setPayments(updatedPayments);
      setName('');
      setAmount('');
      updateURL(updatedPayments);
    }
  };

  const deletePayment = (id) => {
    const updatedPayments = payments.filter(payment => payment.id !== id);
    setPayments(updatedPayments);
    updateURL(updatedPayments);
  };

  // ... [Rest of the component remains unchanged]

  return React.createElement(
    'div',
    { style: { fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', position: 'relative', zIndex: 1 } },
    React.createElement('style', null, fireworkStyles),
    React.createElement('h1', { style: { color: titleColor, transition: 'color 0.5s ease', textAlign: 'left' } }, 'Payment Tracker'),
    // ... [Rest of the JSX remains unchanged]
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
