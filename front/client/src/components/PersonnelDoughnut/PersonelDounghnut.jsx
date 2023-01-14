import { $CombinedState } from '@reduxjs/toolkit';
import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import jwt_decode from 'jwt-decode';

// #[Route('/api/colocStat/{colocUuid}&{limitDate}', 'colocStat', ['GET'])] => route à envoyer


export default function PersonelDounghnut() {
  const token = jwt_decode(sessionStorage.token)
  const [expenses, setExpense]= useState()
  useEffect(() => {
    fetch('http://localhost:4557/api/colocStat/44a36f45-010f-4bf7-a7f0-8434108fecd6&365', {
      method: "GET",
      headers: new Headers({
        Authorization: 'Bearer ' + token.token
    })
  })
    .then(data => data.json())
    .then(json => setExpense(json.userExpense))
  },[]);

  if (expenses != null){
    const COLORS = []
    const data = [{ name: 'Nécessités', value: 200 },]
    console.log(expenses)

    expenses.map((expenses,index) => (
      data.push({name: expenses.category, value: parseInt(expenses.value)})
    ));
    
    data.forEach((category)=>{
      if (category.name === 'Charges/Loyer'){
        COLORS.push('#0088FE')
      }
      if (category.name === 'Courses'){
        COLORS.push('#00C49F')
      }
      if (category.name === 'Soirées'){
        COLORS.push('#FFBB28')
      }
      if (category.name === 'Abonnements'){
        COLORS.push('#FF8042')
      }
      if (category.name === 'Nécessités'){
        COLORS.push('#73BFB8')
      }
      if (category.name === 'Autres'){
        COLORS.push('#E8FCCF')
      }
    })

    console.log(COLORS)
    // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#73BFB8','#E8FCCF'];    
    
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
              ))};
            </Pie>
        </PieChart>
      </div>
    );
  }
  else{
    return null;
  }
};

