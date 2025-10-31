"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "neobrutalism-toast group",
          title: "font-black text-base",
          description: "font-semibold",
          success: "bg-green-50 border-green-200",
          error: "bg-red-50 border-red-200",
          warning: "bg-yellow-50 border-yellow-200",
          info: "bg-blue-50 border-blue-200",
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-5 border-2 border-black rounded-full p-0.5 text-green-600" />,
        info: <InfoIcon className="size-5 border-2 border-black rounded-full p-0.5 text-blue-600" />,
        warning: <TriangleAlertIcon className="size-5 border-2 border-black rounded-full p-0.5 text-yellow-600" />,
        error: <OctagonXIcon className="size-5 border-2 border-black rounded-full p-0.5 text-red-600" />,
        loading: <Loader2Icon className="size-5 border-2 border-black rounded-full p-0.5 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "black",
          "--border-radius": "0rem",
          "--border-width": "4px",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
