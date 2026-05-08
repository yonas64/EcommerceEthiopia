import React, { useState } from 'react';

type Props = {
  productId: string;
  onSubscribe: (productId: string, email: string) => void;
};

const BackInStockForm: React.FC<Props> = ({ productId, onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubscribe(productId, email);
    setSent(true);
  };

  if (sent) return <div>Thanks — we'll notify you when it's back in stock.</div>;

  return (
    <form onSubmit={submit} aria-label="Back in stock notification">
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginLeft: 8 }} />
      </label>
      <button type="submit" style={{ marginLeft: 8 }}>Notify me</button>
    </form>
  );
};

export default BackInStockForm;
