Create basic To-do list application with React Native.

Task Instructions

1. App setup
   - Create single screen component called ToDoScreen and make this screen initial view.

2. Adding new tasks
   - Add TextInput field for typing new task in.
   - Add button labeled "Add" next to the input.
   - When pressing Add button:
       -  Entered task should be added to list with a timestamp in YYYY.mm.dd format and
          the input field should clear itself after adding.
       -  Tasks should be stored in the component's state as an array.

4. Displaying the task list
     - Display a list of tasks below the input field using a scrollable FlatList.
     - Each tasks item should display the task text clearly.
    
4. Delete Tasks

· Each task in the list should have a Delete button or icon next to it.

· When the delete button is pressed:

o The corresponding task should be removed from the list.

o The list should update immediately to reflect the change.


5. UI & Usability

· Use basic styling to clearly separate the input area and task list.

· Make sure buttons and text are large enough for easy tapping.

· Optional: Display a message like “No tasks yet” when the list is empty.


TestIDs:

-   Add testIDs for testing.
   -   add-button
   -   clear-all-button      


Requirements

· A text input and an Add button.

· A dynamic list that displays all added tasks.

· Ability to delete individual tasks from the list.

· State is updated and reflected in the UI in real time.


Additional requirements

· Prevent adding empty tasks.

· Add a "Clear All" button to remove all tasks.
