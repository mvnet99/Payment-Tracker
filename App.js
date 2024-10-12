const App = () => {
  const [payments, setPayments] = React.useState(() => {
    const savedPayments = localStorage.getItem('payments');
    return savedPayments ? JSON.parse(savedPayments) : [];
  });
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [isAdminMode, setIsAdminMode] = React.useState(false);
  const [secretCode, setSecretCode] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
  }, [payments]);

  React.useEffect(() => {
    const handleKeyPress = (event) => {
      setSecretCode(prevCode => prevCode + event.key);
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  React.useEffect(() => {
    if (secretCode.endsWith('adminmode')) {
      setIsAdminMode(prevMode => !prevMode);
      setSecretCode('');
    }
  }, [secretCode]);

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

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>Payment Tracker</h1>
      
      <div style={{ marginBottom: '10px' }}>
        <span style={{ fontWeight: 'bold' }}>
          Total Collected: ${totalAmount.toFixed(2)}
        </span>
      </div>
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '10px', height: '10px', marginBottom: '20px' }}>
        <div
          style={{
            width: `${(totalAmount / maxAmount) * 100}%`,
            backgroundColor: '#2196F3',
            height: '100%',
            borderRadius: '10px'
          }}
        ></div>
      </div>

      {isAdminMode && (
        <>
          <form onSubmit={addPayment} style={{ marginBottom: '20px' }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}>Add Payment</button>
          </form>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {payments.map((payment) => (
              <span 
                key={payment.id} 
                style={{
                  backgroundColor: getRandomColor(),
                  color: '#333',
                  borderRadius: '20px',
                  padding: '5px 10px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {payment.name}
                <button
                  onClick={() => deletePayment(payment.id)}
                  style={{
                    marginLeft: '5px',
                    background: 'none',
                    border: 'none',
                    color: '#f44336',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
