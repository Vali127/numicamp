import { useState, useEffect, useRef } from 'react'

const ShowMoreText = ({
    children, 
    lines = 3, 
    textForMore = "show more", 
    textForLess = "show less", 
    anchorStyle, 
    expanded = false }) => {
    
    const [isExpanded, setIsExpanded] = useState(expanded)
    const [isClamped, setIsClamped] = useState(false)
    const textRef = useRef(null)

    useEffect(() => {
        if (textRef.current) {
        setIsClamped(textRef.current.scrollHeight > textRef.current.clientHeight)
        }
    }, [children])
    
    return (
        <div>
            
            <p
                ref={textRef}
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: isExpanded ? 'unset' : lines,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                {children}
            </p>
            
            {
                ( isClamped ) &&
                <button 
                    className={anchorStyle}
                    onClick={ () => setIsExpanded(!isExpanded) } >
                    {isExpanded ? textForLess : textForMore } 
                </button>
            }

        </div>
    )
}

export default ShowMoreText
