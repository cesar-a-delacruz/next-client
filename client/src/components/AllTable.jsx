import { useState, useEffect } from "react";
import ViewDialog from "@/components/ViewDialog";
import DeleteDialog from "@/components/DeleteDialog";

export default function Table({ title, fields, endpoint }) {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await fetch(`http://localhost:3000/${endpoint}`);
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
    await fetch(`http://localhost:3000/${endpoint}/${updatedRow.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(updatedRow),
    });
    setTableData((prev) =>
      prev.map((item) => (item.id === updatedRow.id ? updatedRow : item)),
    );
    setViewDialog(false);
  };
  const handleDelete = async (deletedRow) => {
    await fetch(`http://localhost:3000/${endpoint}/${deletedRow.id}`, {
      method: "DELETE",
    });
    setTableData((prev) => prev.filter((item) => item.id !== deletedRow.id));
    setDeleteDialog(false);
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
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length !== 0 ? (
            tableData.map((item) => (
              <tr key={item.id}>
                {fields.map((field) => (
                  <td key={field.name}>
                    {field.render
                      ? field.render(item[field.name])
                      : item[field.name]}
                  </td>
                ))}
                <td>
                  <button onClick={() => handleViewDialog(item)}>View</button>
                  <button onClick={() => handleDeleteDialog(item)}>
                    Delete
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
        data={selectedRow}
        onUpdate={handleUpdate}
        fields={fields}
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
