import React, { createContext, useContext, useState } from "react"

// Create context for dropdown state
const DropdownMenuContext = createContext({
    open: false,
    setOpen: () => { },
})

const DropdownMenu = ({
    children,
    className,
    ...props
}) => {
    const [open, setOpen] = useState(false)

    return (
        <DropdownMenuContext.Provider value={{ open, setOpen }}>
            <div className={`relative ${className || ""}`} {...props}>
                {children}
            </div>
        </DropdownMenuContext.Provider>
    )
}

const DropdownMenuTrigger = ({
    children,
    className,
    asChild = false,
    ...props
}) => {
    const { open, setOpen } = useContext(DropdownMenuContext)

    const handleClick = () => setOpen(!open)

    if (asChild) {
        return React.cloneElement(children, {
            onClick: (e) => {
                // Call the original onClick if it exists
                if (children.props.onClick) {
                    children.props.onClick(e)
                }
                handleClick()
            },
            ...props
        })
    }

    return (
        <button
            className={`inline-flex items-center justify-center ${className || ""}`}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
}

const DropdownMenuContent = ({
    children,
    className,
    align = "end",
    ...props
}) => {
    const { open } = useContext(DropdownMenuContext)

    if (!open) return null

    const alignClasses = align === "end" ? "right-0" : "left-0"

    return (
        <div
            className={`absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md ${alignClasses} ${className || ""}`}
            {...props}
        >
            {children}
        </div>
    )
}

const DropdownMenuLabel = ({
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={`px-2 py-1.5 text-sm font-semibold text-gray-900 ${className || ""}`}
            {...props}
        >
            {children}
        </div>
    )
}

const DropdownMenuItem = ({
    children,
    className,
    onSelect,
    ...props
}) => {
    const { setOpen } = useContext(DropdownMenuContext)

    const handleClick = (e) => {
        if (onSelect) {
            onSelect(e)
        }
        setOpen(false)
    }

    return (
        <button
            className={`relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 ${className || ""}`}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
}

const DropdownMenuSeparator = ({
    className,
    ...props
}) => {
    return (
        <div
            className={`-mx-1 my-1 h-px bg-gray-200 ${className || ""}`}
            {...props}
        />
    )
}

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator
} 