import Link from "next/link"

interface BackButtonProps {
  href: string
  label?: string
  variant?: "default" | "home"
}

export function BackButton({
  href,
  label = "Quay lại",
  variant = "default",
}: BackButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 font-medium transition-all"

  const variantClasses = {
    default:
      "text-sm text-gray-700 hover:text-gray-900 transition-colors mb-6",
    home: "px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm hover:bg-white/95 text-red-700 hover:text-red-900 duration-300 shadow-lg hover:shadow-xl group",
  }

  const iconClasses = {
    default: "w-4 h-4",
    home: "w-5 h-5 group-hover:-translate-x-1 transition-transform",
  }

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]}`}>
      <svg
        className={iconClasses[variant]}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {label}
    </Link>
  )
}
