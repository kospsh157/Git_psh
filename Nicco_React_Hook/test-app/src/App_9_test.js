import React from "react";

const useConfirm = () => (message='', callback) => {
    const confirmAction = () => {
        if(window.confirm(message)) {
            console.log('작동 되는지?');
            callback(0);
        }
    }
    return confirmAction;
}


const App = () => {
    const deleteWorld = () => console.log("Deleting the world...");
    const confirmDelete = useConfirm("Are you sure?", deleteWorld);
    return (
        <div className = "App">
            <button onClick={confirmDelete}>Delete the world</button>
        </div>
    )
}

export default App;