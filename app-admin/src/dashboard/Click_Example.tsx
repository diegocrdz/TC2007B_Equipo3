import {useState, useEffect} from "react";

export const Click_Example = () => {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      document.title = `Haz dado click ${count} veces`;

    });
  
    return (
      <div>
        <p>Haz dado click {count} veces</p>
        <button onClick={() => setCount(count+1)}>¡Haz click!</button>
      </div>
    );
  }
