import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [demos, setDemos] = useState([]);
  const [selectedDemo, setSelectedDemo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/demos", {
        method: "GET",
      });
      setDemos(await response.json());
    };

    fetchData();
  }, []);

  const handleSelectDemo = (demo) => {
    setSelectedDemo(demo);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      {!selectedDemo ? (
        <>
          {demos.map((demo) => (
            <div key={demo.id} className="card">
              <h2>{demo.name}</h2>
              <button onClick={() => handleSelectDemo(demo)}>Visualizar</button>
            </div>
          ))}
        </>
      ) : (
        <div>
          <button onClick={() => setSelectedDemo(null)}>Voltar</button>
          <h2>{selectedDemo.name}</h2>
          <div>
            {selectedDemo.frames.map((frame) => (
              <div key={frame.id} className="frame">
                <h3>Frame {frame.order}</h3>
                <div dangerouslySetInnerHTML={{ __html: frame.html }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
