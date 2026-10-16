import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { InventoryItem } from '../types';

interface AddBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBatch: (newItem: Omit<InventoryItem, 'id' | 'sold'>) => void;
}

export const AddBatchModal: React.FC<AddBatchModalProps> = ({ isOpen, onClose, onAddBatch }) => {
  const [name, setName] = useState('');
  const [stock, setStock] = useState(20);
  const [price, setPrice] = useState(120);
  const [expiryHours, setExpiryHours] = useState(6);
  const [category, setCategory] = useState<InventoryItem['category']>('Breads');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || stock <= 0 || price <= 0) return;

    const skuPrefix = category.slice(0, 3).toUpperCase();
    const skuCode = `${skuPrefix}-${Math.floor(10 + Math.random() * 89)}`;

    onAddBatch({
      name: name.trim(),
      stock,
      price,
      expiryHours,
      category,
      skuCode
    });

    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-fuchsia-400 flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </div>
          <h3 className="text-base font-heading font-bold text-white">Add Morning Production Batch</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Log freshly prepared items for today's automated counter tracking.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Item / SKU Name</label>
            <input
              type="text"
              placeholder="e.g. Cranberry Walnut Sourdough"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#131c31] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#131c31] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="Breads">Breads</option>
                <option value="Viennoiserie">Viennoiserie</option>
                <option value="Confectionery">Confectionery</option>
                <option value="Savory">Savory</option>
                <option value="Dairy">Dairy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Batch Units Baked</label>
              <input
                type="number"
                min="1"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                required
                className="w-full bg-[#131c31] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono-num focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Base Price (₹)</label>
              <input
                type="number"
                min="5"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                className="w-full bg-[#131c31] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono-num focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Fresh Shelf-Life (Hours)</label>
              <input
                type="number"
                min="1"
                max="48"
                value={expiryHours}
                onChange={(e) => setExpiryHours(Number(e.target.value))}
                required
                className="w-full bg-[#131c31] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono-num focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="btn-foursight w-full py-2.5 rounded-xl text-xs font-semibold text-white shadow-md flex items-center justify-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Active Counter Inventory</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
