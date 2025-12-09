import { useEffect, useState } from 'react';

export default function AIInterviewAnimation() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSpeaking((prev) => !prev);
      setTimer(0);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isSpeaking) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => (prev < 18 ? prev + 1 : prev));
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [isSpeaking]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl animate-pulse" />

      <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-purple-500/20">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            "Can you explain a challenging project you worked on?"
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-xl shadow-lg">
            🤖
            <div className="absolute inset-0 rounded-full bg-cyan-400 blur-md opacity-50 animate-pulse" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">AI Interviewer</div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-slate-400">Active</span>
            </div>
          </div>
        </div>

        {!isSpeaking && (
          <div className="flex items-center gap-2 py-8 animate-fadeIn">
            <span className="text-slate-400 text-sm">AI is analyzing</span>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-purple-500"
                  style={{
                    animation: `dot 1.4s infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {isSpeaking && (
          <div className="flex flex-col items-center py-4 animate-fadeIn">
            <div className="relative mb-4">
              <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-4xl sm:text-5xl shadow-xl">
                👤
              </div>

              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-purple-500/50"
                  style={{
                    animation: `wave 2.2s infinite`,
                    animationDelay: `${(i - 1) * 0.7}s`,
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl">🎤</div>
              <div className="flex items-end gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full"
                    style={{
                      animation: `sound 1s infinite ease-in-out`,
                      animationDelay: `${i * 0.1}s`,
                      height: '10px',
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Recording · {formatTime(timer)}</span>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                🎯
              </div>
            </div>
            <div className="text-xs text-slate-400">Real-time Analysis</div>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                ⚡
              </div>
            </div>
            <div className="text-xs text-slate-400">Instant Feedback</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dot {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }

        @keyframes wave {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        @keyframes sound {
          0%, 100% { height: 6px; }
          50% { height: 18px; }
        }
      `}</style>
    </div>
  );
}
