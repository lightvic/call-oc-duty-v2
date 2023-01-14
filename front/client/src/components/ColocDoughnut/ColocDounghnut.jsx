import { $CombinedState } from '@reduxjs/toolkit';
import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';


export default function ColocDounghnut() {
  const token = jwt_decode(sessionStorage.token)
  const navigate = useNavigate()

  const [expenses, setExpense]= useState()
  useEffect(() => {
    fetch('http://localhost:4557/api/colocStat/42500393-9805-4bca-8b5d-03df0d297927&365', {
      method: "GET",
      headers: new Headers({
        Authorization: 'Bearer ' + token.token
    })
  })
  .then((data) => data.json())
  .then((json) => {
    if (json.message === 'invalid cred') {
      sessionStorage.removeItem('token')
      navigate('/signin')
    }
    setExpense(json.colocExpense)
  })
}, [])
    
    if (expenses != null){
      var totalValue = 0
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
      data.forEach((value)=>{
        totalValue = totalValue + value
      })    
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
        {totalValue}
      </div>
    );
  }
  else{
    return <h1> pas de dépense</h1>;
  }
};

