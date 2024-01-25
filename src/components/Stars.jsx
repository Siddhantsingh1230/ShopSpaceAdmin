const Stars = ({ star }) => {
    let starNum = 1;
    if (star <= 5) {
      starNum = star;
    }
    const starA = new Array(starNum).fill(0);
    return (
      <>
        <div>
          {starA.map((_, i) => {
            return <i key={i} className="text-yellow-400 ri-star-fill"></i>;
          })}
        </div>
      </>
    );
  };
  
  export default Stars;
  