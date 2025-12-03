

export const Combine = (tab_a, tab_b) => {
    if ( !Array.isArray(tab_a) || !Array.isArray(tab_b) )
        throw new Error("The arguments on the 'Combine' function must be arrays ")
        
    return [...tab_a, ...tab_b]
}

export const UniqueValue = (tab, id) => {

    if (!Array.isArray(tab))
        throw new Error("The argument of Unique Value must be respectively an Array of object and the key of the object ")
    if (!id)
        throw new Error("A key value must be provided for UniqueValue() ")

    const unique = new Set()
    return tab.filter(
        item => {
            if (!item)
                throw new Error("Item not found")
            if ( item[id] === undefined )
                throw new Error(" key : " + id + " doesn't match any attributes of "+ toString(tab))
            if (!unique.has(item[id]) ) {
                unique.add(item[id])
                return true
            }
            return false
        }
    )
}