import { useEffect, useState } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import CustomTooltip from '@/components/charts/CustomTooltip';

const COLORS = ['#FFBB28', '#00C49F', '#FF8042'];

export default function CustomLineChart({ isAnimationActive = true }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await fetch(`http://localhost:3000/appointment/linechart/${"2025-11-08"}`);
            const json = await result.json();
            const appointments = json.map((appointment) => {
                let dateTime = new Date(appointment.dateTime.substring(0, 10));
                dateTime.setDate(dateTime.getDate() + 1)
                return { name: dateTime.toDateString(), value: 1 }
            });
            const reduced = appointments.reduce((acc, { name, value }) => {
                acc[name] = (acc[name] || 0) + value;
                return acc;
            }, {});

            const ag = Object.keys(reduced).map((re) => {
                return { name: re, value: reduced[re] }
            })
            console.log(ag)
            setData([...ag])
        })();
    }, []);
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
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Line type="monotone" name='appointments' dataKey="value" stroke="#8884d8" isAnimationActive={isAnimationActive} />
        </LineChart>
    );
}
