import { useState, useEffect } from "react";

const Table = ({ title, columns, endpoint }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetch(`http://localhost:3000/${endpoint}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setData([...data]);
        });
      console.log("Response:", result);
    })();
  }, []);

  return (
    <div>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 ? (
            data.map((item, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render
                      ? col.render(item[col.key], item)
                      : item[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>No {title} data available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
