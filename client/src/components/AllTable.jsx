import { useState, useEffect } from "react";
import ViewDialog from "@/components/ViewDialog";

export default function Table({ title, fields, endpoint }) {
  const [tableData, setTableData] = useState([]);
  const [viewDialog, setViewDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await fetch(`http://localhost:3000/${endpoint}`);
      const json = await result.json();
      setTableData([...json]);
    })();
  }, []);

  const handleView = (row) => {
    setSelectedRow(row);
    setViewDialog(true);
  };

  const handleSave = async (updatedRow) => {
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

  return (
    <div>
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
                  <button onClick={() => handleView(item)}>View</button>
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
        onSave={handleSave}
        fields={fields}
      />
    </div>
  );
}
