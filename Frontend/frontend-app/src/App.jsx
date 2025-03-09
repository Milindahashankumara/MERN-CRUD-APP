
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  // State for form input
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });

  const [updateForm, setUpdateForm] =useState({
    _id: null,
    title: "",
    body: "",
  });

  // State for storing notes (initialized as an empty array)
  const [notes, setNotes] = useState([]);

  // Fetch notes when component loads
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to fetch notes from backend
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/notes");
      setNotes(res.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  // Function to update form fields
  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    setCreateForm({ ...createForm, [name]: value });
  };


  // Function to create a new note
  const createNote = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/notes", createForm);

      setNotes([...notes, res.data.note]); // Update state with the new note

      setCreateForm({ title: "", body: "" }); // Clear form after submission
    } catch (error) {
      console.error("Error creating note:", error.message);
    }
  };

    
  const deleteNote = async (id) => {
      try {
        await axios.delete(`http://localhost:4000/notes/${id}`);
        console.log("Note deleted successfully!");
      } catch (error) {
        console.error("Error deleting note:", error);
      }

      //Update state
      const newNotes = [...notes].filter((note) => {
        return note._id !== _id;
      });

      setNotes(newNotes);
    };


  const handleUpdateFieldChange = (e) => {
    const {value, name} = e.target;

    setUpdateForm({
       ...updateForm,
       [name]: value,
    });

    };
    

  const toggleUpdate = (note) => {
    
    //Set state on update form
    setUpdateForm({title: note.title, body: note.body, _id: note._id});
  };  



  const updateNote = async (e) => {
  e.preventDefault();

  const {title , body} = updateForm;

      //Send the update request
      const res = await axios.put(`http://localhost:4000/notes/${updateForm._id}`, 
      {title,body}
      );

      //Update state
      const newNotes = [...notes];
      const noteIndex = notes.findIndex(note => {
        return note._id === updateForm._id;
    })
    newNotes[noteIndex] = res.data.note;

    setNotes(newNotes);

    //Clear update form state
    setUpdateForm({
    _id: null,
    title: '',
    body: '',
    });
  };

  return (
    <>


      <div>
        <h2>Notes: </h2>
        {notes && 
          notes.map((note) => {
            return (
            <div key={note._id}>
              <h3>{note.title}</h3>
              <button onClick={ () => deleteNote(note._id)}>
                Dlete note
                </button>
                <button onClick={() => toggleUpdate(note)}>Update note</button>
            </div>
          );
          })}
      </div>



    {!updateForm._id && (
      <div>
        <h2>Create note</h2>
        <form onSubmit={createNote}>
          <input
            onChange={updateCreateFormField}
            value={createForm.title}
            name="title"
            placeholder="Enter title"
          />
          <textarea
            onChange={updateCreateFormField}
            value={createForm.body}
            name="body"
            placeholder="Enter note body"
          />
          <button type="submit">Create note</button>
        </form>
      </div>
    )}

    {updateForm._id && (
      <div>
        <h2>Update note</h2>
        <form onSubmit={updateNote}>
          <input 
          onChange={handleUpdateFieldChange}
          value={updateForm.title} 
          name="title" 
          />
          <textarea 
          onChange={handleUpdateFieldChange}
          value={updateForm.body} 
          name="body" 
          />
          <button type="submit">Update note</button>
         </form>
      </div>
    )}

    </>
  );
}

export default App;
