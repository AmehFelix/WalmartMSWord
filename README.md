# WalmartMSWord (WIP)
A project aiming to create a document viewer complete with the latest and greatest visualization features.

# Prompt
In this project, you and your team (if applicable) will develop an interactive document visualization tool to explore a provided dataset

Visualization Components: Your interactive visualization should consist of the following components:
1.	Document ID List: This section will display a list of document IDs.
2.	Document Workspace: A workspace that allows users to view the text content of documents, utilizing a visual metaphor similar to opening a text file in MS Word.
   
Interactive Features: Your visualization should incorporate the following interactive features:
1.	Ordering Document IDs: Implement direct manipulation for ordering the list of document IDs. Avoid using menus or buttons for this purpose.
2.	Selection: Enabling users to select an item from the document ID list will display the corresponding document's text in the workspace.
3.	Multiple Selection: Allow users to select multiple document IDs from the list, which will open multiple documents simultaneously in the workspace.
4.	Drag and Move: Implement drag-and-drop functionality within the workspace, enabling users to move opened documents.

# Current State
Document ID: On the left, A sortable list that shows the documents in the provided datasets using a set Doc ID, I'm using the full file name
Doc View: On the right, Displays selected documents. Can show multiple documents. The document windows are draggable inside the docview section, (but for now this works in a limited area around the document)
MiniDash: Top left, For now, this consists of the Toggle Multiselect button to allow multiple documents to be displayed at once.

Current development state was imported from my work offline, the next steps are to: Clean up the DocView Window. Implement better document analysis; better interactivity, more viewing options, etc. Clean up the UI


