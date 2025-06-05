export default function Button({ children, type = 'button', className = '', ...props }) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}   