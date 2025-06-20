export const CustomButton = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false, 
  size = 'medium',
  ...props 
}) => {
  const getButtonClass = () => {
    let baseClass = 'custom-button';
    baseClass += ` custom-button-${variant}`;
    baseClass += ` custom-button-${size}`;
    if (disabled) baseClass += ' custom-button-disabled';
    return baseClass;
  };

  return (
    <button 
      className={getButtonClass()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="button-content">
        {children}
      </span>
    </button>
  );
};