import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';

interface BarcodeScannerProps {
  onScan: (barcode: string, operation: 'entry' | 'exit') => void;
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [operation, setOperation] = useState<'entry' | 'exit' | null>(null);

  const startScanning = () => {
    setIsScanning(true);
    setTimeout(() => {
      const mockBarcode = Math.random().toString(36).substring(7);
      if (operation) {
        onScan(mockBarcode, operation);
      }
      setIsScanning(false);
      setOperation(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 lg:px-16 py-8">
      {operation === null ? (
        <>
          <div className="flex flex-col items-center my-10">
            <p className="mb-4 text-center text-gray-700 text-sm sm:text-base lg:text-lg">
              Veuillez choisir le type de scan à effectuer :
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setOperation('entry')}
                className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
              >
                Entrée
              </button>
              <button
                onClick={() => setOperation('exit')}
                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
              >
                Sortie
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-md border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 my-10">
          {isScanning ? (
            <div className="text-center">
              <div className="animate-pulse flex flex-col items-center">
                <Camera className="w-12 h-12 text-blue-500 mb-2" />
                <p className="text-gray-600 text-sm sm:text-base">Scan en cours...</p>
              </div>
              <button
                onClick={() => setIsScanning(false)}
                className="mt-4 px-4 py-2 text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                <X className="w-4 h-4 inline-block mr-1" />
                Annuler
              </button>
            </div>
          ) : (
            <button
              onClick={startScanning}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              <Camera className="w-5 h-5 mr-2" />
              Démarrer le Scan
            </button>
          )}
        </div>
      )}
    </div>
  );
}