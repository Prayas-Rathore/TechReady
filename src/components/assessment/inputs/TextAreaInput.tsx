interface TextAreaInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minChars?: number;
  maxChars?: number;
}

export default function TextAreaInput({
  value = '',
  onChange,
  placeholder,
  minChars = 0,
  maxChars = 500
}: TextAreaInputProps) {
  const charCount = value.length;
  const isValid = charCount >= minChars && charCount <= maxChars;
  const showWarning = charCount > 0 && !isValid;

  return (
    <div className="space-y-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={6}
        maxLength={maxChars}
        className={`w-full px-6 py-4 text-lg border-2 rounded-xl outline-none transition-all resize-none ${
          showWarning
            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
            : 'border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100'
        }`}
      />

      <div className="flex items-center justify-between text-sm">
        <div>
          {minChars > 0 && charCount < minChars && (
            <span className="text-red-500 font-medium">
              Minimum {minChars} characters required
            </span>
          )}
          {charCount >= minChars && charCount <= maxChars && (
            <span className="text-green-600 font-medium">
              ✓ Great! Keep going...
            </span>
          )}
        </div>
        <span className={`font-medium ${
          charCount > maxChars ? 'text-red-500' : 'text-slate-500'
        }`}>
          {charCount} / {maxChars}
        </span>
      </div>
    </div>
  );
}
