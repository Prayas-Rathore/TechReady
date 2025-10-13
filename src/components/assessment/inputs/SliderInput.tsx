interface SliderInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

export default function SliderInput({ value = 0, onChange, min, max }: SliderInputProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-block px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl shadow-lg">
          <span className="text-4xl font-bold">
            {value}
            {value >= max ? '+' : ''}
          </span>
          <span className="text-lg ml-2">years</span>
        </div>
      </div>

      <div className="relative pt-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, rgb(14, 165, 233) 0%, rgb(37, 99, 235) ${percentage}%, rgb(226, 232, 240) ${percentage}%, rgb(226, 232, 240) 100%)`
          }}
        />

        <div className="flex justify-between mt-2 text-sm text-slate-600">
          <span>{min}</span>
          <span>{max}+</span>
        </div>
      </div>

      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(14, 165, 233), rgb(37, 99, 235));
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
          transition: all 0.2s;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 16px rgba(14, 165, 233, 0.6);
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(14, 165, 233), rgb(37, 99, 235));
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
          transition: all 0.2s;
        }

        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 16px rgba(14, 165, 233, 0.6);
        }
      `}</style>
    </div>
  );
}
