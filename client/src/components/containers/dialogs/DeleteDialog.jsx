import { useEffect, useState } from "react";

export default function DeleteDialog({ open, onClose, data, onDelete }) {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleDelete = () => {
    onDelete(formData);
    onClose();
  };

  if (data !== null)
    return (
      <dialog open={open} className="model-dialog">
        <form method="dialog">
          <h3>Delete</h3>
          <p>This operation can't be undone. Do you want to continue?</p>
          <div className="dialog-actions">
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </dialog>
    );
}
