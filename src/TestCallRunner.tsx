// src/TestCallRunner.tsx
import { testCallSetup } from './test-call';

export default function TestCallRunner() {
  return (
    <button
      onClick={() => testCallSetup()}
      style={{
        padding: '10px 16px',
        background: '#111',
        color: '#fff',
        borderRadius: 6
      }}
    >
      Run Call Setup Test
    </button>
  );
}
