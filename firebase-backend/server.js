const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todo-list-ac0bc-default-rtdb.firebaseio.com",
});

const app = express();
app.use(cors());

const db = admin.firestore(); // Firestore database reference

// Function to get user email by user ID (UID)
// async function getUserEmail(uid) {
//   try {
//     const userRecord = await admin.auth().getUser(uid);
//     return userRecord.email;
//   } catch (error) {
//     console.error(`Error fetching user email for UID ${uid}:`, error);
//     return "Unknown";  // Return 'Unknown' if there's an error
//   }
// }

async function fetchDataFromFirestore() {
  const q = query(collection(db, "user"));

  const querySnapshot = await getDocs(q);

  const data = [];
  querySnapshot.forEach((docs) => {
    data.push({ id: docs.id, ...docs.data() });
  });
  console.log("*", data);
  return data;
}

app.get("/users", async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map((user) => ({
      id: user.uid,
      email: user.email,
      password: user.passwordHash,
      signupTime: new Date(user.metadata.creationTime).toLocaleString(),
      ip: user.customClaims?.ip || "192.108.100.1",
    }));
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching users: " + error.message);
  }
});

// Route to fetch task lists
app.get("/tasklists", async (req, res) => {
  try {
    // Fetch all users from Firebase Auth
    const listUsersResult = await admin.auth().listUsers();

    // Use Promise.all to handle async calls for counting todoLists
    const users = await Promise.all(
      listUsersResult.users.map(async (user) => {
        const userId = user.uid;

        // Reference to the todoLists subcollection for the user
        const todoListsCollection = admin
          .firestore()
          .collection("users")
          .doc(userId)
          .collection("todoLists");

        // Get all todoList documents
        const todoListsSnapshot = await todoListsCollection.get();

        let totalTask = 0;

        // Map over all todoLists and count the number of tasks inside each
        const todoListsWithTasks = await Promise.all(
          todoListsSnapshot.docs.map(async (todoListDoc) => {
            const todoListId = todoListDoc.id;

            // Get the name of the task list and createdAt from the document
            const taskListData = todoListDoc.data();
            const taskListName = taskListData.name || "Untitled"; // Ensure the name is included
            const createdAt = taskListData.createdAt || "N/A"; // Fetch createdAt field

            // Reference to the tasks subcollection for this todoList
            const tasksCollection = todoListDoc.ref.collection("tasks");

            // Get all tasks and count them
            const tasksSnapshot = await tasksCollection.get();
            const noOfTasks = tasksSnapshot.size;
            totalTask += noOfTasks;

            // Map over the tasks and collect task details
            const tasks = tasksSnapshot.docs.map((taskDoc) => {
              const taskData = taskDoc.data(); // Get the task document data
              return {
                taskId: taskDoc.id, // Unique task ID
                title: taskData.title || "Untitled", // Assuming task has a 'title' field
                description: taskData.description || "No description", // Assuming task has a 'description' field
                createdAt: taskData.createdAt || "N/A",
              };
            });

            // Return the todoListId, task count, name, createdAt, and individual tasks
            return {
              todoListId,
              name: taskListName, // Include the task list name here
              createdAt: createdAt, // Include createdAt
              updatedAt: createdAt, // If you have an updatedAt field, fetch it similarly
              no_of_tasks: noOfTasks,
              tasks: tasks,
            };
          })
        );

        // Return user info including the number of todo lists and tasks
        return {
          id: userId,
          email: user.email,
          password: user.passwordHash,
          todoLists: todoListsWithTasks,
          TotalTask: totalTask,
        };
      })
    );

    // Send the result as a response
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching users and tasks: " + error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
