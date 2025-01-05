import React from 'react';

const QuoteCard = ({ quote, author, price }) => (
  <div className="quote-card">
    <p>"{quote}"</p>
    <p>- {author}</p>
    <p>{price === 0 ? "Free" : `${price} credits`}</p>
  </div>
);

export default QuoteCard;
