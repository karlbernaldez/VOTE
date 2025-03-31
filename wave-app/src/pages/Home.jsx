import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MapComponent from "../components/MapComponent";
import styled from "@emotion/styled";
import DrawingOverlay from "../components/DrawingOverlay";

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const StyledSidebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  height: 100vh;
  width: ${({ collapsed }) => (collapsed ? "0" : "270px")}; /* Hide when collapsed */
  transition: width 0.3s ease;
  overflow: hidden; /* Prevent white space */
`;

const MapWrapper = styled.div`
  flex-grow: 1;
  width: ${({ collapsed }) => (collapsed ? "100vw" : "calc(100vw - 250px)")};
  height: 100vh;
  transition: width 0.3s ease;
`;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Container>
      {/* Sidebar wrapper with proper hiding behavior */}
      <StyledSidebar collapsed={collapsed}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </StyledSidebar>

      {/* Map container resizes dynamically */}
      <MapWrapper collapsed={collapsed}>
        <MapComponent />
      </MapWrapper>
      <DrawingOverlay/>
    </Container>
  );
};

export default Home;
