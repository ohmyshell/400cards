import './index.css';

export default ({ value, suite }) => {
  const suitesMap = {
    Spade: '♠',
    Heart: '♥',
    Club: '♣',
    Diamond: '♦',
  };
  return (
    <div className="Card">
      <div className="topLeft">
        <div>{value}</div>
        <div>{suitesMap[suite]}</div>
      </div>
      <div className="bottomRight">
        <div>{value}</div>
        <div>{suitesMap[suite]}</div>
      </div>
    </div>
  );
};
