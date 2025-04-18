import { useEffect, useState } from "react"
import {deleteReminder, getReminder} from "../services/Api"
import { useNavigate } from "react-router-dom"
const MyReminders = () =>{

  const navigate = useNavigate();

  const [reminders,setReminders] = useState([])
    const fetch = async () => {
      try {
        const response = await getReminder()
        setReminders(response.data);
      } catch (error) {
        console.log(error.response?.data?.error);
      }  
    }
    useEffect(()=>{
      fetch()
    },[])


    const handleDelete = async(id) =>{
      try {
        const response = await deleteReminder(id);
        alert(response.data.message);
        const delete_Reminder = reminders.filter((reminder)=> reminder._id !== id)
        setReminders(delete_Reminder)
      } catch (error) {
        
      }
    }

  return(
    <div className="max-w-3xl mx-auto p-4">
    <h2 className="text-2xl font-bold text-blue-700 mb-4">My Reminders</h2>

    {reminders.length === 0 ? (
      <p className="text-gray-600">No reminders found.</p>
    ) : (
      <ul className="space-y-4">
        {reminders.map((reminder, index) => (
          <li key={index} className="bg-white shadow-md p-4 rounded border border-blue-100">
            <p className="text-blue-700 font-semibold">{reminder.tasks}</p>
            <p className="text-gray-500 text-sm">
              {new Date(reminder.dateTime).toLocaleString()}
            </p>
          <div className="flex space-x-3 mt-3 ">
            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            onClick={()=>handleDelete(reminder._id)}
            >
              delete
            </button>
        
            <button  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            onClick={()=> navigate("/set-reminder",{state: {reminders:reminder}})}
            >
              edit
            </button>
          </div>
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}
export default MyReminders