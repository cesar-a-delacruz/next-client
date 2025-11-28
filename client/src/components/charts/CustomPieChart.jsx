import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import CustomTooltip from '@/components/charts/CustomTooltip';

const COLORS = ['#FFBB28', '#00C49F', '#FF8042'];

export default function CustomPieChart() {
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await fetch(`http://localhost:3000/appointment/piechart/${"2025-11-08"}`);
            const json = await result.json();
            const appointments = {
                completed: 0,
                pending: 0,
                cancelled: 0
            };
            json.forEach((item) => {
                switch (item.status) {
                    case "PENDING":
                        appointments.pending++;
                        break;
                    case "COMPLETED":
                        appointments.completed++;
                        break;
                    case "CANCELLED":
                        appointments.cancelled++;
                        break;
                }
            })
            let vals = [];
            for (const app in appointments) {
                vals.push({ name: app, value: appointments[app] })
            }
            setData([...vals])
        })();
    }, []);
    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={150}
                dataKey="value"
                name='appointment statuses'
            >
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`}
                            fill={COLORS[index]}
                        />))
                }
            </Pie>
            <Legend />
            <Tooltip content={CustomTooltip}></Tooltip>
        </PieChart>
    );
}
