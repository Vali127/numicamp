import { createPortal } from 'react-dom'

export const Portal = ({ children, target = document.body }) => {
    return createPortal(children, target)
}
