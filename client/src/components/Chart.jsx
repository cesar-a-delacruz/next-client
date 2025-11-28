import { useEffect, useState } from 'react';
import { PieChart, Pie, LineChart, Line, CartesianGrid, XAxis, YAxis, Cell, Tooltip, Legend } from 'recharts';
import CustomTooltip from '@/components/charts/CustomTooltip';

export default function Chart({ type, date, parser }) {
    const [data, setData] = useState(null);
    useEffect(() => {
        (async () => {
            const result = await fetch(`http://localhost:3000/appointment/${type}/${date}`);
            const json = await result.json();
            const parsedData = parser(json);
            setData(parsedData)
        })();
    }, []);

    if (data === null) return;
    switch (type) {
        case "piechart":
            const colors = {
                completed: '#00C49F',
                pending: '#FFBB28',
                cancelled: '#FF8042'
            }
            return (
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        outerRadius={150}
                        dataKey="value"
                        name='appointments status'
                    >
                        {
                            data.map((entry, index) =>
                                <Cell key={`cell-${index}`}
                                    fill={colors[entry.name]}
                                />
                            )
                        }
                    </Pie>
                    <Legend />
                    <Tooltip content={CustomTooltip}></Tooltip>
                </PieChart>
            );
        case "linechart":
            return (
                <LineChart
                    style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                    responsive
                    data={data}
                    margin={{
                        top: 50,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Legend />
                    <Tooltip content={CustomTooltip} />
                    <Line type="monotone" name='appointments' dataKey="value" stroke="#8884d8" isAnimationActive={true} />
                </LineChart>
            );
    };
}
