import { useState } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
}

export default function TextInput({ value, onChange, placeholder, suggestions = [] }: TextInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(s =>
    s.toLowerCase().includes((value || '').toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder={placeholder}
        className="w-full px-6 py-4 text-lg border-2 border-slate-300 rounded-xl focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all"
      />

      {showSuggestions && filteredSuggestions.length > 0 && value && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto z-10">
          {filteredSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                onChange(suggestion);
                setShowSuggestions(false);
              }}
              className="w-full text-left px-6 py-3 hover:bg-sky-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <span className="text-slate-700">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
