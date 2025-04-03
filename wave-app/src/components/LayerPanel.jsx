import React, { useState } from "react";
import LayerItem from "./LayerItem";
import { FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";

const LayerPanel = ({ layers, setLayers }) => {
    const [activeLayer, setActiveLayer] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false); // Toggle state for collapsing

    const toggleLayerVisibility = (id) => {
        setLayers((prevLayers) =>
            prevLayers.map((layer) =>
                layer.id === id ? { ...layer, visible: !layer.visible } : layer
            )
        );
    };

    const toggleLayerLock = (id) => {
        setLayers((prevLayers) =>
            prevLayers.map((layer) =>
                layer.id === id ? { ...layer, locked: !layer.locked } : layer
            )
        );
    };

    const removeLayer = (id) => {
        setLayers((prevLayers) => prevLayers.filter((layer) => layer.id !== id));
    };

    const updateLayerName = (id, newName) => {
        setLayers((prevLayers) =>
            prevLayers.map((layer) =>
                layer.id === id ? { ...layer, name: newName } : layer
            )
        );
    };

    const addLayer = () => {
        const newLayer = {
            id: Date.now().toString(),
            name: "New Layer",
            visible: true,
            locked: false,
            isMap: false,
        };
        setLayers((prevLayers) => [...prevLayers, newLayer]);
    };

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("layerIndex", index);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Necessary for dropping
    };

    const handleDrop = (e, dropIndex) => {
        const dragIndex = e.dataTransfer.getData("layerIndex");
        if (dragIndex === dropIndex) return; // No change if the index is the same

        const reorderedLayers = [...layers];
        const draggedLayer = reorderedLayers.splice(dragIndex, 1)[0];
        reorderedLayers.splice(dropIndex, 0, draggedLayer);

        setLayers(reorderedLayers);
    };

    return (
        <div
            style={{
                position: "absolute",
                bottom: 30,
                right: 10,
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "12px",
                zIndex: 3,
                width: "250px",
                maxHeight: isCollapsed ? "50px" : "300px",
                overflowY: isCollapsed ? "hidden" : "auto",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "max-height 0.3s ease-in-out",
            }}
        >
            {/* Header with Collapse Toggle */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: isCollapsed ? "0" : "10px",
                    cursor: "pointer",
                }}
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <span>Layers</span>
                <div>
                    {isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            </div>

            {/* Layer Items - Only show if expanded */}
            {!isCollapsed && (
                <>
                    <ul style={{ padding: 0, listStyleType: "none" }}>
                        {layers.map((layer, index) => (
                            <LayerItem
                                key={layer.id}
                                layer={layer}
                                toggleLayerVisibility={toggleLayerVisibility}
                                toggleLayerLock={toggleLayerLock}
                                removeLayer={removeLayer}
                                updateLayerName={updateLayerName}
                                isActiveLayer={activeLayer === layer.id}
                                setActiveLayer={setActiveLayer}
                                index={index}
                                onDragStart={handleDragStart}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            />
                        ))}
                    </ul>
                    {/* Add Layer Button */}
                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                        <button
                            onClick={addLayer}
                            style={{
                                backgroundColor: "#4CAF50",
                                color: "white",
                                border: "none",
                                padding: "8px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                width: "100%",
                            }}
                        >
                            <FaPlus /> Add Layer
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default LayerPanel;
