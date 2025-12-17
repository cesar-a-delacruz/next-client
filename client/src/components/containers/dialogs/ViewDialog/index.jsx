import { useEffect, useState } from "react";
import FormField from "@/components/atoms/FormField.jsx";
import "./index.css";
export default function ViewDialog({
  open,
  onClose,
  data,
  onUpdate,
  fields,
  viewMode,
}) {
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
    onClose();
  };

  const handleClose = () => {
    setEditMode(false);
    onClose();
  };

  if (data !== null)
    return (
      <dialog open={open} className="model-dialog">
        <form method="dialog">
          <h3>{editMode || viewMode === false ? "Editar" : "Ver"}</h3>
          {fields.map((field) => (
            <div key={field.name} className="dialog-field">
              {editMode || viewMode === false ? (
                <FormField
                  field={field}
                  value={formData[field.name]}
                  handleChange={handleChange}
                  showLabel={true}
                />
              ) : (
                <p>
                  {field.label}:{" "}
                  <span>
                    {field.render
                      ? field.render(formData[field.name])
                      : formData[field.name]}
                  </span>
                </p>
              )}
            </div>
          ))}
          <div className="actions">
            {editMode || viewMode === false ? (
              <>
                <button type="button" onClick={handleUpdate}>
                  Guardar
                </button>
                {viewMode !== false && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...data });
                      setEditMode(false);
                    }}
                  >
                    Cancelar
                  </button>
                )}
              </>
            ) : (
              <button type="button" onClick={() => setEditMode(true)}>
                Editar
              </button>
            )}
            <button type="button" onClick={handleClose}>
              Cerrar
            </button>
          </div>
        </form>
      </dialog>
    );
}
