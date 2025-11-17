import { useState, useEffect } from "react";
import ViewDialog from "@/components/ViewDialog";

export default function Table({ title, columns, endpoint }) {
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
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length !== 0 ? (
            tableData.map((item, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render
                      ? col.render(item[col.key], item)
                      : item[col.key]}
                  </td>
                ))}
                <td>
                  <button onClick={() => handleView(item)}>View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>No data available.</td>
            </tr>
          )}
        </tbody>
      </table>

      <ViewDialog
        open={viewDialog}
        onClose={() => setViewDialog(false)}
        data={selectedRow}
        onSave={handleSave}
      />
    </div>
  );
}
