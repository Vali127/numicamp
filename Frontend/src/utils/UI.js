

export const HandleItemSelection = (e, selectedclassName, callbackOnSelection = null, callbackOnDeselection = null )=>{
        const currentclasses = e.target.className;
        if ( currentclasses.includes(selectedclassName) ) {
            e.target.classList.remove(selectedclassName)
            if ( callbackOnDeselection ) { callbackOnDeselection() }
        } else {
            e.target.classList.add(selectedclassName)
            if ( callbackOnSelection ) { callbackOnSelection()  }
        }
    }