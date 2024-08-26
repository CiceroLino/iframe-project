import { useEffect, useState, useRef } from "react";
import "./App.css";

interface Demo {
  id: number;
  name: string;
  frames: Frame[];
}

interface Frame {
  id: number;
  order: number;
  html: string;
}

export default function App() {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState<number>(0);
  const [editableContent, setEditableContent] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/demos");
        if (!response.ok) throw new Error("Failed to fetch demos");
        setDemos(await response.json());
      } catch (error) {
        console.error("Error fetching demos:", error);
        alert("Erro ao carregar as demos. Por favor, tente novamente.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const setupIframe = () => {
      if (iframeRef.current) {
        const iframeDoc =
          iframeRef.current.contentDocument ||
          iframeRef.current.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.body.innerHTML = editableContent;
          iframeDoc.body.addEventListener("dblclick", handleIframeDoubleClick);
        }
      }
    };

    const timer = setTimeout(setupIframe, 100);

    return () => {
      clearTimeout(timer);
      if (iframeRef.current) {
        const iframeDoc =
          iframeRef.current.contentDocument ||
          iframeRef.current.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.body.removeEventListener("dblclick", handleIframeDoubleClick);
        }
      }
    };
  }, [selectedFrameIndex, editableContent]);

  const handleSelectDemo = (demo: Demo) => {
    const sortedDemo = {
      ...demo,
      frames: [...demo.frames].sort((a, b) => a.order - b.order),
    };
    setSelectedDemo(sortedDemo);
    setSelectedFrameIndex(0);
    setEditableContent(sortedDemo.frames[0]?.html || "");
  };

  const handleFrameChange = (index: number) => {
    setSelectedFrameIndex(index);
    setEditableContent(selectedDemo!.frames[index].html);
    setIsEditing(false);
  };

  const handleIframeDoubleClick = (event: MouseEvent) => {
    event.preventDefault();
    const element = event.target as HTMLElement;
    setSelectedElement(element);
    setIsEditing(true);
    const elementHtml = element.outerHTML;
    if (textareaRef.current) {
      textareaRef.current.value = elementHtml;
    }
  };

  const handleSaveElement = () => {
    if (selectedElement && textareaRef.current) {
      const newHtml = textareaRef.current.value;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = newHtml;
      const newElement = tempDiv.firstChild as HTMLElement;
      if (selectedElement.parentNode) {
        selectedElement.parentNode.replaceChild(newElement, selectedElement);
      }
      setSelectedElement(null);
      setIsEditing(false);
      if (iframeRef.current?.contentDocument) {
        setEditableContent(iframeRef.current.contentDocument.body.innerHTML);
      }
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    const frameToUpdate = selectedDemo!.frames[selectedFrameIndex];
    frameToUpdate.html = editableContent;

    try {
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

      if (!response.ok) throw new Error("Failed to save changes");
      alert("Alterações salvas com sucesso!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Erro ao salvar as alterações. Por favor, tente novamente.");
    } finally {
      setIsSaving(false);
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
          <h2>Demos Disponíveis</h2>
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
              onChange={(e) => handleFrameChange(Number(e.target.value))}
            >
              {selectedDemo.frames.map((frame, index) => (
                <option key={frame.id} value={index}>
                  Frame {frame.order}
                </option>
              ))}
            </select>
          </div>

          <iframe
            ref={iframeRef}
            title={`Frame ${selectedFrameIndex}`}
            style={{
              width: "100%",
              height: "500px",
              border: "1px solid #ccc",
              marginTop: "1rem",
            }}
          />

          {isEditing && (
            <div style={{ marginTop: "1rem" }}>
              <textarea
                ref={textareaRef}
                style={{ width: "100%", height: "150px" }}
              />
              <button onClick={handleSaveElement}>Salvar Elemento</button>
              <button onClick={() => setIsEditing(false)}>Cancelar</button>
            </div>
          )}

          <button
            onClick={handleSaveChanges}
            style={{ marginTop: "1rem" }}
            disabled={isSaving}
          >
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      )}
    </div>
  );
}