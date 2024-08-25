import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [demos, setDemos] = useState([]);
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
  const [editableContent, setEditableContent] = useState("");

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
    const sortedDemo = {
      ...demo,
      frames: [...demo.frames].sort((a, b) => a.order - b.order),
    };
    setSelectedDemo(sortedDemo);
    setSelectedFrameIndex(0);
    setEditableContent(sortedDemo.frames[0]?.html || "");
  };

  const handleFrameChange = (index) => {
    setSelectedFrameIndex(index);
    setEditableContent(selectedDemo.frames[index].html);
  };

  const handleContentChange = (event) => {
    setEditableContent(event.target.value);
  };

  const handleSaveChanges = async () => {
    const frameToUpdate = selectedDemo.frames[selectedFrameIndex];
    frameToUpdate.html = editableContent;

    const response = await fetch(
      `http://localhost:3001/frames/${frameToUpdate.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html: editableContent }),
      }
    );

    if (response.ok) {
      alert("Alterações salvas com sucesso!");
    } else {
      alert("Erro ao salvar as alterações.");
    }
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
            <select
              value={selectedFrameIndex}
              onChange={(e) => handleFrameChange(e.target.value)}
            >
              {selectedDemo.frames.map((frame, index) => (
                <option key={frame.id} value={index}>
                  Frame {frame.order}
                </option>
              ))}
            </select>
          </div>

          <iframe
            srcDoc={editableContent}
            title={`Frame ${selectedFrameIndex}`}
            style={{
              width: "100%",
              height: "300px",
              border: "1px solid #ccc",
              marginTop: "1rem",
            }}
            onDoubleClick={() => {
              const iframe = document.querySelector("iframe");
              const iframeDoc =
                iframe.contentDocument || iframe.contentWindow.document;
              iframeDoc.body.contentEditable = true;
            }}
          />

          <textarea
            value={editableContent}
            onChange={handleContentChange}
            style={{ width: "100%", height: "200px", marginTop: "1rem" }}
          />

          <button onClick={handleSaveChanges} style={{ marginTop: "1rem" }}>
            Salvar Alterações
          </button>
        </div>
      )}
    </div>
  );
}

