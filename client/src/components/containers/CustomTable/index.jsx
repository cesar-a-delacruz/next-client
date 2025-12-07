import { useState, useEffect } from "react";
import ViewDialog from "@/components/containers/dialogs/ViewDialog";
import DeleteDialog from "@/components/containers/dialogs/DeleteDialog";
import requestHandlers from "@/utils/requestHandlers";
import "./index.css";

export default function CustomTable({ title, fields, endpoint }) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    (async () => {
      const dataHandler = (json) => setData([...json]);
      await requestHandlers.findAll(endpoint, [dataHandler]);
    })();
  }, []);

  const handleViewDialog = (row) => {
    setSelected(row);
    setViewDialog(true);
  };
  const handleDeleteDialog = (row) => {
    setSelected(row);
    setDeleteDialog(true);
  };

  const handleUpdate = async (updatedRow) => {
    const dataHandler = () =>
      setData((prev) =>
        prev.map((item) => (item.id === updatedRow.id ? updatedRow : item)),
      );
    const viewDialogHandler = () => setViewDialog(false);
    await requestHandlers.update(updatedRow, endpoint, [
      dataHandler,
      viewDialogHandler,
    ]);
  };
  const handleDelete = async (deletedRow) => {
    const dataHandler = () =>
      setData((prev) => prev.filter((item) => item.id !== deletedRow.id));
    const deleteDialogHandler = () => setDeleteDialog(false);
    await requestHandlers.delete(deletedRow, endpoint, [
      dataHandler,
      deleteDialogHandler,
    ]);
  };

  return (
    <>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.name}>{field.label}</th>
            ))}
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                {fields.map((field) => (
                  <td key={field.name}>
                    {field.render
                      ? field.render(item[field.name])
                      : item[field.name]}
                  </td>
                ))}
                <td className="options">
                  <button onClick={() => handleViewDialog(item)}>Ver</button>
                  <button onClick={() => handleDeleteDialog(item)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={fields.length + 1}>No data available.</td>
            </tr>
          )}
        </tbody>
      </table>

      <ViewDialog
        open={viewDialog}
        onClose={() => setViewDialog(false)}
        data={selected}
        onUpdate={handleUpdate}
        fields={fields}
      />
      <DeleteDialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        data={selected}
        onDelete={handleDelete}
        fields={fields}
      />
    </>
  );
}
