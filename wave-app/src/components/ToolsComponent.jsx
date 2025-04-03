import { useState } from "react";
import mapPin from "../assets/map-pin.svg";
import lineTool from "../assets/linetool.svg";
import polygon from "../assets/Polygon.svg";
import square from "../assets/square.svg";
import circle from "../assets/circle.svg";
import text from "../assets/text.svg";
import styled from "@emotion/styled";

// Styled Components
const ToolsContainer = styled.div`
  background-color: #ffffff;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ToolButton = styled.button`
  padding: 6px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: #b0b0b0;
  }

  &.active {
    background-color: #3498db; /* Active tool color */
    color: white;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const ToolsComponent = () => {
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    { id: "mapPin", icon: mapPin, alt: "Map Pin" },
    { id: "lineTool", icon: lineTool, alt: "Line Tool" },
    { id: "polygon", icon: polygon, alt: "Polygon Tool" },
    { id: "square", icon: square, alt: "Square Tool" },
    { id: "circle", icon: circle, alt: "Circle Tool" },
    { id: "text", icon: text, alt: "Add Text" },
  ];

  return (
    <ToolsContainer>
      {tools.map((tool) => (
        <ToolButton
          key={tool.id}
          onClick={() => setActiveTool(tool.id)}
          className={activeTool === tool.id ? "active" : ""}
        >
          <img src={tool.icon} alt={tool.alt} />
        </ToolButton>
      ))}
    </ToolsContainer>
  );
};

export default ToolsComponent;
