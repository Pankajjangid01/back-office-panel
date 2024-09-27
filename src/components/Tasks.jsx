import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const columns = [
  { field: "taskTitle", headerName: "Task Title", width: 200 },
  { field: "taskDescription", headerName: "Task Description", width: 250 },
  { field: "taskListTitle", headerName: "Task List Title", width: 200 },
  { field: "createdBy", headerName: "Created By (Email ID)", width: 200 },
  { field: "creationTime", headerName: "Creation Time", width: 150 },
];

const Tasks = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/tasklists");
        const taskData = [];

        response.data.forEach((user) => {
          user.todoLists.forEach((todoList) => {
            todoList.tasks.forEach((task) => {
              const creationTime = task.createdAt
                ? new Date(task.createdAt._seconds * 1000).toLocaleString()
                : "N/A";
              taskData.push({
                id: task.taskId,
                taskTitle: task.title,
                taskDescription: task.description,
                taskListTitle: todoList.name,
                createdBy: user.email,
                creationTime: creationTime,
              });
            });
          });
        });

        setRows(taskData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Box
      sx={{
        width: "91.666667%",
        margin: "30px auto",
        padding: "20px",
        backgroundColor: "#FDFAD9",
        borderRadius: "10px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        fontFamily: "Poppins",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#1f2937",
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Tasks
      </Typography>
      <Box
        sx={{
          height: 400,
          backgroundColor: "#E9EFEC",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          loading={loading} 
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              color: "#374151",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#E9EFEC",
              color: "#1f2937",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#E9EFEC",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Tasks;
