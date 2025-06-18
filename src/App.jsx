import { useState, useEffect } from 'react'
import Login from './Components/registration/Login';
import TodoModal from './Components/modalWindow/TodoModal';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
const [currentUserRole, setCurrentUserRole] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleSetUser = (userData) => {
    setCurrentUser(userData);
    if (userData) {
      console.log(`User ${userData.email} processed.`);
    } else {
      console.log("User logged out from App.");
    }
  };

  const handleSetUserRole = (role) => {
    setCurrentUserRole(role);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddTask = (newTaskData) => {
    const updatedTasks = [...tasks, { ...newTaskData, id: Date.now() }]; 
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
  };

  localStorage.setItem("completed", JSON.stringify(sampleData));

  return (
    <>
      {!currentUser ? (
        <Login setUser={handleSetUser} setUserRole={handleSetUserRole} />
      ) : (
        <div className="p-4">
          <h1 className="text-xl font-semibold">Welcome, {currentUser.email}!</h1>
          {currentUserRole && <p className="text-sm text-gray-600">Role: {currentUserRole}</p>}
          
          <button
            onClick={() => {
              setCurrentUser(null);
              setCurrentUserRole(null);
              // Optionally clear any session/token from localStorage if you implement that
            }}
            className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
      

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/AddTask" element={isModalOpen && currentUser && ( // Only show modal if user is logged in
        <TodoModal
          isOpen={isModalOpen}
          onAddTask={handleAddTask}
          onClose={handleCloseModal}
        />
      )} />
          <Route path="/Completed" element={<CompletedHome />} />
          <Route path="/Edit" element={<EditCompletedTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
