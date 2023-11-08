import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";

const StatusGraph = () => {
  const { user } = useAuth0();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/status/getStatusCounts/${user.sub}`
          );
          if (response.data && Array.isArray(response.data.statusCounts)) {
            setData(
              response.data.statusCounts.map((item) => ({
                ...item,
                count: parseInt(item.count, 10), // Always specify radix in parseInt
              }))
            );
          } else {
            console.error("Unexpected response format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
          console.log("Response received:", error.response);
        }
      };

      fetchData();
    }
  }, [user?.sub]); // Use optional chaining here
  if (!user) {
    return <div>Loading...</div>; // Or any other loading state you prefer
  }

  return (
    <BarChart
      width={700}
      height={300}
      data={data}
      margin={{
        top: 20, // Adjust the top margin to push the graph down
        right: 30,
        left: 20,
        bottom: 5,
      }}
      style={{
        marginTop: "100px", // Adds space above the chart
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="status" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" barSize={50} />
    </BarChart>
  );
};

export default StatusGraph;
