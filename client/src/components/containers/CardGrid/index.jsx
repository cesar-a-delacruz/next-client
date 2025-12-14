import { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import ViewDialog from "@/components/containers/dialogs/ViewDialog";
import DeleteDialog from "@/components/containers/dialogs/DeleteDialog";
import requestHandlers from "@/utils/requestHandlers";
import "./index.css";
import { jwtDecode } from "jwt-decode";

export default function CardGrid({ title, fields, endpoint }) {
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
      {(() => {
        const userData = jwtDecode(localStorage.getItem("jwtToken"));
        return (
          userData.type === "EMPLOYEE" && (
            <div className="links">
              <a href={`/${endpoint}/new`}>Nuevo</a>
            </div>
          )
        );
      })()}
      <div className="card-container">
        {data.map((item) => (
          <Card
            key={item.id}
            {...item}
            handleView={handleViewDialog}
            handleDelete={handleDeleteDialog}
          />
        ))}
      </div>
      <ViewDialog
        open={viewDialog}
        onClose={() => setViewDialog(false)}
        data={selected}
        onUpdate={handleUpdate}
        fields={fields}
        viewMode={false}
      />
      <DeleteDialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        data={selected}
        onDelete={handleDelete}
      />
    </>
  );
}
