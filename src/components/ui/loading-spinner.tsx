import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({
  className,
  size = "md",
  ...props
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4"
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center p-4",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-t-primary",
          "border-gray-200 dark:border-gray-800",
          sizeClasses[size]
        )}
      />
    </div>
  )
}
