// Button.jsx
import { cn } from '../../utils/cn'

export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const styles = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  return (
    <button
      className={cn('rounded-xl px-4 py-2 font-semibold transition', styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}
