import React, { useState, useEffect } from "react";
import { FaTrash, FaLock, FaLockOpen, FaEye, FaEyeSlash } from "react-icons/fa";

const LayerItem = ({
    layer,
    toggleLayerVisibility,
    toggleLayerLock,
    removeLayer,
    updateLayerName,
    isActiveLayer, // Check if this is the active layer
    setActiveLayer, // Set this as the active layer
    index, // Index for reordering
    onDragStart, // Drag start handler
    onDragOver, // Drag over handler
    onDrop, // Drop handler
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(layer.name);
    const [hasUserModified, setHasUserModified] = useState(false);

    useEffect(() => {
        if (!editedName.trim() && !hasUserModified) {
            setEditedName("Untitled Layer");
        }
    }, [editedName, hasUserModified]);

    const handleNameChange = (e) => {
        setEditedName(e.target.value);
        setHasUserModified(true);
    };

    const handleNameBlur = () => {
        if (editedName.trim() === "") {
            setEditedName("Untitled Layer");
        }
        setIsEditing(false);
        if (editedName.trim() !== "" && editedName !== layer.name) {
            updateLayerName(layer.id, editedName);
        }
    };

    const handleNameKeyPress = (e) => {
        if (e.key === "Enter") {
            if (editedName.trim() === "") {
                setEditedName("Untitled Layer");
            }
            setIsEditing(false);
            if (editedName.trim() !== "" && editedName !== layer.name) {
                updateLayerName(layer.id, editedName);
            }
        }
    };

    const handleNameDoubleClick = () => {
        setIsEditing(true); // Enable editing on double-click
    };

    const handleDelete = (layerId) => {
        if (layer.locked) {
            if (window.confirm("Are you sure you want to delete this locked layer?")) {
                removeLayer(layerId);
            }
        } else {
            removeLayer(layerId);
        }
    };

    const handleLayerClick = () => {
        setActiveLayer(layer.id);
    };

    return (
        <li
            onClick={handleLayerClick} // Set the active layer on click
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: isActiveLayer ? "#007bff" : "#f5f5f5", // Change background if active
                padding: "8px",
                borderRadius: "6px",
                marginBottom: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                border: isEditing ? "2px solid #007bff" : "none", // Highlight if editing
                cursor: "move", // Indicate this is draggable
            }}
            draggable
            onDragStart={(e) => onDragStart(e, index)} // Handle drag start
            onDragOver={(e) => onDragOver(e)} // Allow dropping
            onDrop={(e) => onDrop(e, index)} // Handle drop event
        >
            {/* Toggle Visibility */}
            <button
                onClick={(e) => { e.stopPropagation(); toggleLayerVisibility(layer.id); }}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                {layer.visible ? <FaEye /> : <FaEyeSlash />}
            </button>

            {/* Layer Name */}
            <span
                onDoubleClick={handleNameDoubleClick} // Enable editing on double-click
                style={{
                    flexGrow: 1,
                    marginLeft: "8px",
                    cursor: "pointer",
                    fontWeight: isEditing ? "bold" : "normal", // Make name bold when editing
                    whiteSpace: "nowrap", // Prevent name from wrapping
                    overflow: "hidden", // Hide overflow
                    textOverflow: "ellipsis", // Show ellipsis if name is too long
                }}
            >
                {isEditing ? (
                    <input
                        type="text"
                        value={editedName}
                        onChange={handleNameChange}
                        onBlur={handleNameBlur}
                        onKeyPress={handleNameKeyPress}
                        autoFocus
                        style={{
                            border: "none",
                            outline: "none",
                            fontWeight: "bold",
                            backgroundColor: "transparent",
                            padding: "2px",
                            fontSize: "14px",
                        }}
                    />
                ) : (
                    editedName ?? "Untitled Layer"
                )}
            </span>

            {/* Lock/Unlock Button */}
            <button
                onClick={(e) => { e.stopPropagation(); toggleLayerLock(layer.id); }}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                }}
                disabled={layer.isMap} // Prevent locking the base map layer
            >
                {layer.locked ? <FaLock /> : <FaLockOpen />}
            </button>

            {/* Remove Layer Button */}
            <button
                onClick={(e) => { e.stopPropagation(); handleDelete(layer.id); }} // Custom delete handler
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#d9534f",
                }}
                disabled={layer.isMap || layer.locked} // Prevent deleting the base map or locked layers
            >
                <FaTrash />
            </button>
        </li>
    );
};

export default LayerItem;