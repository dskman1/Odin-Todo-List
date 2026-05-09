export function setupDialog(openButton, closeButton, dialog){
    openButton.addEventListener("click", ()=>{
        dialog.showModal();
    });

    closeButton.addEventListener("click", ()=>{
        dialog.close()
    });

    dialog.addEventListener("click", (ev)=>{
        if(ev.target === dialog){
            dialog.close()
        }
    })
}
