import { useEffect, useState } from "react";

export default function ViewDialog({ open, onClose, data, onSave }) {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(data || {});

    useEffect(() => {
        setFormData(data || {});
        setEditMode(false);
    }, [data]);

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        setEditMode(false);
    };

    const handleClose = () => {
        setEditMode(false);
        onClose();
    };

    return (
        <dialog open={open} className="model-dialog">
            <form method="dialog">
                <h3>{editMode ? "Edit" : "View"}</h3>
                <div className="dialog-content">
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key} className="dialog-field">
                            <label>{key}</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    value={formData[key] ?? ""}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                />
                            ) : (
                                <p>{value?.toString()}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="dialog-actions">
                    {editMode ? (
                        <>
                            <button type="button" onClick={handleSave}>
                                Save
                            </button>
                            <button type="button" onClick={() => setEditMode(false)}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button type="button" onClick={() => setEditMode(true)}>
                            Edit
                        </button>
                    )}
                    <button type="button" onClick={handleClose}>
                        Close
                    </button>
                </div>
            </form>
        </dialog>
    );
}
