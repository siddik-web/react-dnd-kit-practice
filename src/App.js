import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./SortableItem";

function App() {
  const [languages, setLanguages] = useState([
    "JavaScript",
    "PHP",
    "GO",
    "Rust",
    "Java",
    "Python",
    "TypeScript",
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setLanguages((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Container className="p-3" align="center">
        <h3>The Best Programming Languages</h3>
        <SortableContext
          items={languages}
          strategy={verticalListSortingStrategy}
        >
          {languages.map((language) => (
            <SortableItem key={language} id={language} />
          ))}
        </SortableContext>
      </Container>
    </DndContext>
  );
}

export default App;
