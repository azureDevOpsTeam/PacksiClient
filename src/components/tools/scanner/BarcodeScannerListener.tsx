import { useEffect, useRef } from 'react';

interface BarcodeScannerListenerProps {
  onScan: (barcode: string ) => void;
}

const BarcodeScannerListener: React.FC<BarcodeScannerListenerProps> = ({ onScan }) => {
  const buffer = useRef<string>('');
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      // Add key to buffer if it's a printable character
      if (e.key.length === 1) {
        buffer.current += e.key;
      }

      // When Enter is pressed, trigger scan handler
      if (e.key === 'Enter') {
        if (buffer.current.length > 3) {
          onScan(buffer.current);
        }
        buffer.current = '';
      }

      // Clear buffer if typing is too slow
      timeout.current = setTimeout(() => {
        buffer.current = '';
      }, 100);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onScan]);

  return null;
};

export default BarcodeScannerListener;
