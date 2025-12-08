import { useEffect, useState } from "react";
import "./index.css";

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
          <h3>Eliminar</h3>
          <p>Esta operación no se puede deshacer. ¿Desar continuar?</p>
          <div className="actions">
            <button type="button" onClick={handleDelete}>
              Eliminar
            </button>
            <button type="button" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>
      </dialog>
    );
}
