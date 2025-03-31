import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import styled from "@emotion/styled";
import SidebarHeader from "./Sidebar/SidebarHeader";
import BarChart from "../assets/BarChart";
import Global from "../assets/Global";
import InkBottle from "../assets/InkBottle";

const themes = {
  light: {
    sidebar: { backgroundColor: "#ffffff", color: "#607489" },
    menu: { backgroundColor: "#fbfcfd", hoverBg: "#c5e4ff" },
  },
  dark: {
    sidebar: { backgroundColor: "#0b2948", color: "#8ba1b7" },
    menu: { backgroundColor: "#082440", hoverBg: "#00458b" },
  },
};

const CollapseButton = styled.button`
  position: absolute;
  top: 9px;
  left: ${({ collapsed }) => (collapsed ? "60px" : "230px")};
  background: ${({ themeMode }) =>
    themeMode === "dark" ? "#082440" : "#ffffff"};
  color: ${({ themeMode }) => (themeMode === "dark" ? "#8ba1b7" : "#333")};
  border: none;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: left 0.3s ease, background 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &:hover {
    background: ${({ themeMode }) =>
      themeMode === "dark" ? "#00458b" : "#f1f1f1"};
  }
`;

const SidebarFooter = styled.div`
  position: absolute;
  right: 8px;
  bottom: 0;
  width: 100%;
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.sidebar.backgroundColor};
`;

const ThemeToggle = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.sidebar.color};
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  gap: 8px;

  &:hover {
    opacity: 0.7;
  }
`;

const CustomSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleSubMenu = (menu) => {
    setActiveSubMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <div style={{ display: "flex", height: "100vh", position: "relative" }}>
      <Sidebar
        collapsed={collapsed}
        backgroundColor={themes[theme].sidebar.backgroundColor}
        rootStyles={{ color: themes[theme].sidebar.color }}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: "relative",
        }}
      >
        <SidebarHeader />
        <Menu
          menuItemStyles={{
            button: {
              fontSize: "14px",
              "&:hover": { backgroundColor: themes[theme].menu.hoverBg },
            },
            label: {
              fontSize: "12px",
            },
          }}
        >
          <SubMenu
            label="Synoptic Station"
            icon={<BarChart />}
            open={activeSubMenu === "synoptic"}
            onClick={() => toggleSubMenu("synoptic")}
          >
            <MenuItem>Pie charts</MenuItem>
            <MenuItem>Line charts</MenuItem>
          </SubMenu>

          <SubMenu
            label="Weather Station"
            icon={<Global />}
            open={activeSubMenu === "weather"}
            onClick={() => toggleSubMenu("weather")}
          >
            <MenuItem>Google maps</MenuItem>
            <MenuItem>Open street maps</MenuItem>
          </SubMenu>

          <SubMenu
            label="Satellite Imagery"
            icon={<InkBottle />}
            open={activeSubMenu === "satellite"}
            onClick={() => toggleSubMenu("satellite")}
          >
            <MenuItem>Dark</MenuItem>
            <MenuItem>Light</MenuItem>
          </SubMenu>

          <SubMenu
            label="Radar Mosaic"
            icon={<InkBottle />}
            open={activeSubMenu === "radar"}
            onClick={() => toggleSubMenu("radar")}
          >
            <MenuItem>Dark</MenuItem>
            <MenuItem>Light</MenuItem>
          </SubMenu>

          <SubMenu
            label="Lightning Data"
            icon={<InkBottle />}
            open={activeSubMenu === "lightning"}
            onClick={() => toggleSubMenu("lightning")}
          >
            <MenuItem>Dark</MenuItem>
            <MenuItem>Light</MenuItem>
          </SubMenu>

          <SubMenu
            label="Weather Prediction"
            icon={<InkBottle />}
            open={activeSubMenu === "prediction"}
            onClick={() => toggleSubMenu("prediction")}
          >
            <MenuItem>Dark</MenuItem>
            <MenuItem>Light</MenuItem>
          </SubMenu>
        </Menu>

        <SidebarFooter theme={themes[theme]}>
          <ThemeToggle
            theme={themes[theme]}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
            {!collapsed && (theme === "light" ? "Light Mode" : "Dark Mode")}
          </ThemeToggle>
        </SidebarFooter>
      </Sidebar>

      <CollapseButton
        themeMode={theme}
        collapsed={collapsed}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </CollapseButton>
    </div>
  );
};

export default CustomSidebar;
