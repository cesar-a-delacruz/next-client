import { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import ViewDialog from "@/components/containers/dialogs/ViewDialog";
import DeleteDialog from "@/components/containers/dialogs/DeleteDialog";

export default function CardGrid({ title, fields, endpoint }) {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("jwtToken");
      const result = await fetch(`http://localhost:3000/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await result.json();
      setTableData([...json]);
    })();
  }, []);

  const handleViewDialog = (row) => {
    setSelectedRow(row);
    setViewDialog(true);
  };
  const handleDeleteDialog = (row) => {
    setSelectedRow(row);
    setDeleteDialog(true);
  };

  const handleUpdate = async (updatedRow) => {
    const token = localStorage.getItem("jwtToken");
    await fetch(`http://localhost:3000/${endpoint}/${updatedRow.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams(updatedRow),
    });
    setTableData((prev) =>
      prev.map((item) => (item.id === updatedRow.id ? updatedRow : item)),
    );
    setViewDialog(false);
  };
  const handleDelete = async (deletedRow) => {
    const token = localStorage.getItem("jwtToken");
    await fetch(`http://localhost:3000/${endpoint}/${deletedRow.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTableData((prev) => prev.filter((item) => item.id !== deletedRow.id));
    setDeleteDialog(false);
  };
  return (
    <>
      <h2>{title}</h2>
      <div className="card-container">
        {tableData.map((item) => (
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
        data={selectedRow}
        onUpdate={handleUpdate}
        fields={fields}
        viewMode={false}
      />
      <DeleteDialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        data={selectedRow}
        onDelete={handleDelete}
        fields={fields}
      />
    </>
  );
}
