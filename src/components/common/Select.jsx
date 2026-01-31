const Select = ({
  label,
  options = [],
  value,
  onChange,
  id,
  name,
  placeholder = 'Select an option',
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-base font-medium text-[#141216] dark:text-white">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          h-12 w-full rounded-lg border bg-white dark:bg-white/5 px-4
          text-base text-[#141216] dark:text-white
          focus:outline-none focus:ring-1
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer
          ${error 
            ? 'border-danger focus:border-danger focus:ring-danger' 
            : 'border-[#e0dde3] dark:border-gray-700 focus:border-primary focus:ring-primary'
          }
        `}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-danger">{error}</p>
      )}
    </div>
  )
}

export default Select

