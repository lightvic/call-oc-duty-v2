import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Courses', value: 100 },
  { name: 'Charges/Loyer', value: 300 },
  { name: 'Soirée', value: 300 },
  { name: 'Abonnements', value: 200 },
  { name: 'Nécessités', value: 200 },
  { name: 'Autres', value: 200 },
];
console.log(data[1].name)
console.log(data[1].value)
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#73BFB8','#E8FCCF'];

export default class PersonelDounghnut extends PureComponent {
  render() {
    return (
        <div>
        <PieChart width={800} height={400} >
            <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
            >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
        </PieChart>
      </div>
    );
  }
}

