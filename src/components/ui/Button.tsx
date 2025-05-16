// components/ui/Button.tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow ${className}`}
      {...props}
    />
  );
}
