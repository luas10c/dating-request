import { cn } from '#/utils/cn'

export function Button({
  children,
  className,
  ...rest
}: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        'bg-watermelon-400 hover:bg-watermelon-400/80 transition-colors px-4 py-2 rounded-md cursor-pointer',
        className
      )}
      {...rest}>
      {children}
    </button>
  )
}
