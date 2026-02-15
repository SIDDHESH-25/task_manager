📝 Task Manager (Vanilla JavaScript)

  A simple and functional Task Manager web app built using HTML, CSS, and Vanilla JavaScript, focused on clean logic, state handling, and user-friendly interactions.

🚀 Features

  ✅ Create tasks with title, due date, status, and priority

  ✏️ Edit existing tasks

  ❌ Cancel edits without losing original data

  🔄 Update tasks without creating duplicates

  🗑️ Delete tasks with confirmation

  ✅ Mark tasks as Done

  🔍 Filter tasks by status (Done / In Progress / Not Begun)

  💾 Persistent storage using localStorage

  📅 Due date validation (no past dates allowed)
  
  🎨 Clean, consistent UI with reusable button styles

🛠️ Tech Stack

  HTML5 – Structure

  CSS3 – Styling & layout

  JavaScript (Vanilla) – Logic & state management

  Browser localStorage – Data persistence

  No frameworks or libraries used.

🧠 Key Learnings

  This project helped me understand and implement:
  
  DOM manipulation and event handling
  
  Managing UI state vs application data
  
  Editing vs creating data correctly
  
  Handling edge cases (cancel edit, reload state, filtering)
  
  Form validation and date constraints
  
  Writing reusable, maintainable CSS
  
  Debugging real-world JavaScript issues

📂 How It Works

  Tasks are stored as objects in an array
  
  The array is synced with localStorage
  
  Each table row maps to one task
  
  Edit mode stores a snapshot of original data
  
  Cancel restores the snapshot without mutation
  
  Update overwrites the existing task (no duplicates)

📸 UI Highlights

  Color-coded action buttons
  
  Consistent button sizing using shared classes
  
  Visual distinction for completed tasks
  
  Disabled actions where appropriate

⚠️ Known Limitations

  Uses array index for task identification (can be improved using unique IDs)
  
  No backend (intentionally kept frontend-only)
  
  Designed for learning and portfolio demonstration

📌 Future Improvements (Optional)

  Use unique IDs instead of array indexes
  
  Convert to React or another framework
  
  Add search functionality
  
  Improve accessibility (ARIA labels, keyboard support)
