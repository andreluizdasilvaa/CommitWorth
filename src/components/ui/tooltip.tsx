"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type TooltipContextType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  isTouch: boolean
  triggerId: string
  contentId: string
}

const TooltipContext = React.createContext<TooltipContextType | null>(null)

function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [isTouch, setIsTouch] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const triggerId = React.useId()
  const contentId = React.useId()

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0
      setIsTouch(touch)
    }
  }, [])

  React.useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [open])

  return (
    <div ref={rootRef} className="relative inline-flex" data-tooltip-root>
      <TooltipContext.Provider value={{ open, setOpen, isTouch, triggerId, contentId }}>
        {children}
      </TooltipContext.Provider>
    </div>
  )
}

function TooltipTrigger({ children }: { children: React.ReactElement<any> }) {
  const context = React.useContext(TooltipContext)

  if (!context) {
    return null
  }

  const { open, setOpen, isTouch, triggerId, contentId } = context

  const handleMouseEnter = () => {
    if (!isTouch) setOpen(true)
  }

  const handleMouseLeave = () => {
    if (!isTouch) setOpen(false)
  }

  const handleFocus = () => {
    if (!isTouch) setOpen(true)
  }

  const handleBlur = () => {
    if (!isTouch) setOpen(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (isTouch) {
      event.stopPropagation()
      setOpen(prev => !prev)
    }

    if (children.props?.onClick) {
      children.props.onClick(event)
    }
  }

  const handleMouseEnterWithExisting = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (children.props?.onMouseEnter) {
      children.props.onMouseEnter(event)
    }
    handleMouseEnter()
  }

  const handleMouseLeaveWithExisting = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (children.props?.onMouseLeave) {
      children.props.onMouseLeave(event)
    }
    handleMouseLeave()
  }

  const handleFocusWithExisting = (event: React.FocusEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (children.props?.onFocus) {
      children.props.onFocus(event)
    }
    handleFocus()
  }

  const handleBlurWithExisting = (event: React.FocusEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (children.props?.onBlur) {
      children.props.onBlur(event)
    }
    handleBlur()
  }

  return React.cloneElement(children, {
    id: triggerId,
    "aria-describedby": contentId,
    tabIndex: children.props?.tabIndex ?? 0,
    onMouseEnter: handleMouseEnterWithExisting,
    onMouseLeave: handleMouseLeaveWithExisting,
    onFocus: handleFocusWithExisting,
    onBlur: handleBlurWithExisting,
    onClick: handleClick,
  })
}

function TooltipContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const context = React.useContext(TooltipContext)

  if (!context || !context.open) {
    return null
  }

  const { contentId, triggerId } = context

  return (
    <div
      id={contentId}
      role="tooltip"
      aria-hidden={!context.open}
      className={cn(
        "cursor-cell absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 min-w-[180px] max-w-[240px] rounded-lg bg-primary px-3 py-2 text-xs text-primary-foreground shadow-xl",
        className
      )}
    >
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-primary h-3 w-3" />
      <div className="relative text-center">
        {children}
      </div>
    </div>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent }
