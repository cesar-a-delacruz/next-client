import { useEffect, useState } from "react";
import FormField from "@/components/FormField";

export default function ViewDialog({ open, onClose, data, onUpdate, fields }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    setFormData(data || {});
    setEditMode(false);
  }, [data]);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleUpdate = () => {
    onUpdate(formData);
    setEditMode(false);
  };

  const handleClose = () => {
    setEditMode(false);
    onClose();
  };

  if (data !== null)
    return (
      <dialog open={open} className="model-dialog">
        <form method="dialog">
          <h3>{editMode ? "Edit" : "View"}</h3>
          <div className="dialog-content">
            {fields.map((field) => (
              <div key={field.name} className="dialog-field">
                {editMode ? (
                  <FormField
                    field={field}
                    value={formData[field.name]}
                    handleChange={handleChange}
                  />
                ) : (
                  <p>
                    {field.label}:
                    <span>
                      {field.render
                        ? field.render(formData[field.name])
                        : formData[field.name]}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="dialog-actions">
            {editMode ? (
              <>
                <button type="button" onClick={handleUpdate}>
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...data });
                    setEditMode(false);
                  }}
                >
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
