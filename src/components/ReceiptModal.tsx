import React from 'react';
import { X, Printer, CheckCircle2 } from 'lucide-react';
import { BillRecord } from '../types';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  bill: BillRecord | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, bill }) => {
  if (!isOpen || !bill) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 rounded-2xl max-w-sm w-full p-6 relative shadow-2xl font-mono text-xs border border-slate-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-black p-1"
          aria-label="Close receipt"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Receipt Header */}
        <div className="text-center pb-4 border-b border-dashed border-slate-300 space-y-1">
          <div className="font-bold text-sm tracking-wider uppercase">4OURSIGHT POS</div>
          <div className="text-[10px] text-slate-600">Surplus Intelligence & Direct Counter</div>
          <div className="text-[10px] text-slate-500 mt-1">{bill.time} • TXN: #{bill.id}</div>
          <div className="text-[10px] text-slate-500">Terminal: {bill.cashierName}</div>
        </div>

        {/* Itemized list */}
        <div className="py-4 border-b border-dashed border-slate-300 space-y-2">
          <div className="flex justify-between font-bold text-[11px]">
            <span>DESCRIPTION</span>
            <span>AMOUNT</span>
          </div>

          <div className="text-[11px] text-slate-700 leading-relaxed">
            {bill.items}
          </div>

          <div className="flex justify-between text-[11px] text-slate-500 pt-1">
            <span>Items Count:</span>
            <span>{bill.itemCount} items</span>
          </div>
        </div>

        {/* Totals */}
        <div className="py-3 border-b border-dashed border-slate-300 space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-900">
            <span>TOTAL BILLED:</span>
            <span><span className="font-sans font-bold">₹</span>{bill.total.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>Payment Tender:</span>
            <span className="font-bold uppercase">{bill.mode} (Paid)</span>
          </div>
          <div className="flex justify-between text-[10px] text-emerald-700 font-semibold">
            <span>Surplus Salvage Status:</span>
            <span>Food Diverted (Zero Waste)</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-4 text-[9px] text-slate-500 space-y-1">
          <p>Thank you for supporting zero food waste!</p>
          <p>Powered by 4OURSIGHT B2B Surplus Engine</p>
        </div>

        {/* Print Button */}
        <div className="mt-5 pt-3 border-t border-slate-200 flex gap-2">
          <button
            onClick={() => {
              window.print();
            }}
            className="flex-1 py-2 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
