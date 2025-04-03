import React, { useState } from "react";
import MapComponent from "../components/MapComponent";
import LayerPanel from "../components/LayerPanel";
import ToolsComponent from "../components/ToolsComponent"; // Import ToolsComponent
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const MapWrapper = styled.div`
  flex-grow: 1;
  width: ${({ collapsed }) => (collapsed ? "100vw" : "calc(100vw - 250px)")};
  height: 100vh;
  transition: width 0.3s ease;
  position: relative;
`;

const ToolsWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
`;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [layers, setLayers] = useState([
    { id: "map-layer", name: "Map", visible: true, locked: true, isMap: true },
  ]);

  const handleLayerVisibilityChange = (id) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  return (
    <Container>
      <MapWrapper collapsed={collapsed}>
        <ToolsWrapper>
          <ToolsComponent /> {/* Add ToolsComponent inside the map wrapper */}
        </ToolsWrapper>
        <MapComponent visible={layers.find((l) => l.id === "map-layer")?.visible} />
      </MapWrapper>
      <LayerPanel
        layers={layers}
        setLayers={setLayers}
        onLayerVisibilityChange={handleLayerVisibilityChange}
      />
    </Container>
  );
};

export default Home;
