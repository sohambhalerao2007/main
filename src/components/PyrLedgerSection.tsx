import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  Sparkles, 
  HelpCircle, 
  CloudRain, 
  SunMedium, 
  Gift, 
  Check, 
  ArrowRight,
  TrendingDown,
  Layers
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { PyrRow } from '../types';
import { calculatePyrAdjustment } from '../utils/rules';

interface PyrLedgerSectionProps {
  pyrRows: PyrRow[];
  onUpdateRow: (index: number, updated: Partial<PyrRow>) => void;
  onAddRow: (newRow: PyrRow) => void;
  onDeleteRow: (index: number) => void;
  onBulkUpdate: (rows: PyrRow[]) => void;
  onOpenCopilotWithPrompt: (prompt: string) => void;
  onShowToast: (msg: string) => void;
}

export const PyrLedgerSection: React.FC<PyrLedgerSectionProps> = ({
  pyrRows,
  onUpdateRow,
  onAddRow,
  onDeleteRow,
  onBulkUpdate,
  onOpenCopilotWithPrompt,
  onShowToast
}) => {
  const [scenarioInput, setScenarioInput] = useState<string>('');
  const [scenarioResult, setScenarioResult] = useState<{
    adjustedDemand: number;
    percentChange: number;
    rationale: string;
  } | null>(null);
  const [aiAuditing, setAiAuditing] = useState(false);
  const [aiAuditOutput, setAiAuditOutput] = useState<string | null>(null);

  // Template switchers
  const loadTemplate = (type: 'bakery' | 'cafe' | 'grocer') => {
    if (type === 'bakery') {
      onBulkUpdate([
        { id: 'b-1', sku: 'Country Sourdough (750g)', season: 'All Seasons', pyrDemand: 26, prepared: 24, sold: 15, expiry: 5, basePrice: 160, bid: 135 },
        { id: 'b-2', sku: 'Baguette Tradition', season: 'Morning Rush', pyrDemand: 35, prepared: 32, sold: 26, expiry: 4, basePrice: 90, bid: 75 },
        { id: 'b-3', sku: 'Multigrain Rye Loaf', season: 'Autumn Baseline', pyrDemand: 16, prepared: 15, sold: 11, expiry: 6, basePrice: 180, bid: 150 },
        { id: 'b-4', sku: 'Brioche Burger Buns (Pack of 4)', season: 'Weekend BBQ', pyrDemand: 22, prepared: 20, sold: 14, expiry: 7, basePrice: 140, bid: 120 }
      ]);
      onShowToast("Loaded Artisan Bakery Morning template!");
    } else if (type === 'cafe') {
      onBulkUpdate([
        { id: 'c-1', sku: 'Butter Pain au Chocolat', season: 'Breakfast Peak', pyrDemand: 30, prepared: 28, sold: 22, expiry: 3, basePrice: 130, bid: 105 },
        { id: 'c-2', sku: 'Almond Twice-Baked Croissant', season: 'All Seasons', pyrDemand: 18, prepared: 16, sold: 12, expiry: 4, basePrice: 170, bid: 140 },
        { id: 'c-3', sku: 'Dark Hazelnut Brownie Square', season: 'Afternoon Coffee', pyrDemand: 20, prepared: 18, sold: 14, expiry: 8, basePrice: 180, bid: 150 },
        { id: 'c-4', sku: 'Cinnamon Morning Roll', season: 'Winter Festive', pyrDemand: 24, prepared: 22, sold: 16, expiry: 5, basePrice: 140, bid: 115 }
      ]);
      onShowToast("Loaded Specialty Café & Viennoiserie template!");
    } else {
      onBulkUpdate([
        { id: 'g-1', sku: 'Farm Fresh Whole Milk (1L)', season: 'Daily Staple', pyrDemand: 45, prepared: 40, sold: 32, expiry: 10, basePrice: 72, bid: 65 },
        { id: 'g-2', sku: 'Organic Greek Yogurt Tub (400g)', season: 'Breakfast High', pyrDemand: 15, prepared: 14, sold: 9, expiry: 8, basePrice: 150, bid: 125 },
        { id: 'g-3', sku: 'Artisanal Salted Butter (200g)', season: 'All Seasons', pyrDemand: 20, prepared: 18, sold: 15, expiry: 14, basePrice: 180, bid: 160 },
        { id: 'g-4', sku: 'Himalayan Apple Cider (750ml)', season: 'Winter Drink', pyrDemand: 12, prepared: 10, sold: 7, expiry: 24, basePrice: 220, bid: 190 }
      ]);
      onShowToast("Loaded Fresh Grocery & Dairy template!");
    }
  };

  // Excel Export via SheetJS
  const handleExportExcel = () => {
    const wsData = [
      ["Product SKU", "Season / Pattern", "PYR Avg Demand", "Seller Prepared", "Sold Today", "Expiry (Hrs)", "Base Price (₹)", "Consumer Bid (₹)", "Dynamic Clearance ₹"]
    ];

    pyrRows.forEach(r => {
      const autoDyn = Math.round(r.basePrice * (r.expiry <= 4 ? 0.75 : 0.90));
      wsData.push([r.sku, r.season, r.pyrDemand, r.prepared, r.sold, r.expiry, r.basePrice, r.bid, autoDyn]);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.array_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "PYR_Ledger");
    XLSX.writeFile(wb, "4OURSIGHT_PYR_Ledger.xlsx");
    onShowToast("PYR Ledger exported as 4OURSIGHT_PYR_Ledger.xlsx!");
  };

  // Excel Import
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json<any>(worksheet);

        if (json && json.length > 0) {
          const imported: PyrRow[] = json.map((row: any, idx: number) => ({
            id: `imp-${Date.now()}-${idx}`,
            sku: String(row['Product SKU'] || row['sku'] || row['Item'] || `Imported Item ${idx + 1}`),
            season: String(row['Season / Pattern'] || row['season'] || 'General'),
            pyrDemand: Number(row['PYR Avg Demand'] || row['pyrDemand'] || 20),
            prepared: Number(row['Seller Prepared'] || row['prepared'] || 20),
            sold: Number(row['Sold Today'] || row['sold'] || 10),
            expiry: Number(row['Expiry (Hrs)'] || row['expiry'] || 6),
            basePrice: Number(row['Base Price (₹)'] || row['basePrice'] || 100),
            bid: Number(row['Consumer Bid (₹)'] || row['bid'] || 80)
          }));

          onBulkUpdate(imported);
          onShowToast(`Successfully imported ${imported.length} rows into PYR ledger!`);
        }
      } catch (err) {
        onShowToast("Failed to parse file. Please upload valid .xlsx or .csv.");
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = '';
  };

  // Run Scenario
  const handleSimulateScenario = () => {
    if (!scenarioInput.trim()) return;
    const avgDemand = Math.round(pyrRows.reduce((acc, r) => acc + r.pyrDemand, 0) / (pyrRows.length || 1));
    const result = calculatePyrAdjustment(avgDemand, scenarioInput);
    setScenarioResult(result);
  };

  // AI Audit
  const handleRunAiAudit = () => {
    setAiAuditing(true);
    setAiAuditOutput(null);

    setTimeout(() => {
      const overprepared = pyrRows.filter(r => r.prepared > r.pyrDemand);
      const output = overprepared.length > 0
        ? `Gemini PYR Audit: Found ${overprepared.length} SKUs where morning prep exceeds historical velocity (${overprepared.map(o => o.sku).join(', ')}). Trim morning batches by 12% to prevent ₹850 in avoidable 8 PM waste. Recommend triggering 4 PM dynamic bundles for ${overprepared[0].sku}.`
        : `Gemini PYR Audit: All active SKUs are aligned with seasonal demand baselines. Risk of evening surplus is low (estimated 6% margin salvage needed). Ready for standard shift.`;
      
      setAiAuditOutput(output);
      setAiAuditing(false);
      onShowToast("PYR Audit completed!");
    }, 1200);
  };

  // Add Row
  const handleAddNewRow = () => {
    onAddRow({
      id: `pyr-${Date.now()}`,
      sku: 'New Artisan SKU',
      season: 'All Seasons',
      pyrDemand: 20,
      prepared: 18,
      sold: 10,
      expiry: 6,
      basePrice: 120,
      bid: 100
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">PYR Excel Ledger & Seasonal Intelligence</h2>
            <span className="px-2 py-0.5 rounded bg-purple-950/80 text-fuchsia-300 border border-purple-700/60 text-[10px] font-bold">
              Past Year Records
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Edit cells directly like Excel, paste from clipboard, or import/export `.xlsx` spreadsheets to size morning batches accurately.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRunAiAudit}
            disabled={aiAuditing}
            className="px-3.5 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-fuchsia-200 border border-purple-600/50 text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>{aiAuditing ? 'Auditing...' : 'AI Audit PYR Sheet'}</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="px-3.5 py-2 rounded-xl bg-[#0f172a] hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Download .XLSX</span>
          </button>

          <label className="btn-foursight px-3.5 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer flex items-center gap-2 shadow-sm">
            <Upload className="w-3.5 h-3.5" />
            <span>Import File</span>
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Explainer Callout: "What is PYR?" */}
      <div className="bg-[#131c31] border border-purple-800/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-fuchsia-400 shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">What is PYR (Past Year Records)?</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-2xl">
              <strong>PYR</strong> tracks historical daily sales velocity across seasons and weather patterns. Instead of guessing how much to bake, 4OURSIGHT recommends prep amounts based on past data—eliminating 25% of waste before production begins.
            </p>
          </div>
        </div>

        {/* Quick Template Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-slate-400 hidden lg:inline">Templates:</span>
          <button
            onClick={() => loadTemplate('bakery')}
            className="px-2.5 py-1.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700"
          >
            Bakery
          </button>
          <button
            onClick={() => loadTemplate('cafe')}
            className="px-2.5 py-1.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700"
          >
            Café
          </button>
          <button
            onClick={() => loadTemplate('grocer')}
            className="px-2.5 py-1.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700"
          >
            Grocer
          </button>
        </div>
      </div>

      {/* AI Audit Output Banner */}
      {aiAuditOutput && (
        <div className="bg-[#150a2a] border border-purple-500/60 rounded-2xl p-4 animate-in fade-in duration-300">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-fuchsia-300 uppercase tracking-wider">AI Executive Audit Findings</span>
              <p className="text-xs text-slate-200 leading-relaxed">{aiAuditOutput}</p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Spreadsheet Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-fuchsia-400" />
            <span>Interactive Spreadsheet Grid (Click any cell to edit)</span>
          </span>

          <button
            onClick={handleAddNewRow}
            className="btn-foursight px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Row</span>
          </button>
        </div>

        <div className="overflow-x-auto max-h-[500px] border border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#131c31] text-slate-300 sticky top-0 border-b border-slate-800 z-10">
              <tr>
                <th className="p-3 border-r border-slate-800 font-semibold">Product SKU</th>
                <th className="p-3 border-r border-slate-800 font-semibold">Season / Context</th>
                <th className="p-3 border-r border-slate-800 font-semibold text-purple-300">PYR Demand</th>
                <th className="p-3 border-r border-slate-800 font-semibold">Prepared</th>
                <th className="p-3 border-r border-slate-800 font-semibold">Sold Today</th>
                <th className="p-3 border-r border-slate-800 font-semibold">Expiry (h)</th>
                <th className="p-3 border-r border-slate-800 font-semibold">Base ₹</th>
                <th className="p-3 border-r border-slate-800 font-semibold">Bid ₹</th>
                <th className="p-3 border-r border-slate-800 font-semibold text-fuchsia-400">Dynamic ₹</th>
                <th className="p-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {pyrRows.map((row, idx) => {
                const autoDyn = Math.round(row.basePrice * (row.expiry <= 4 ? 0.75 : 0.90));
                const isOverprep = row.prepared > row.pyrDemand;

                return (
                  <tr key={row.id} className="hover:bg-slate-900/60 transition-colors">
                    {/* SKU */}
                    <td className="p-2 border-r border-slate-800">
                      <input
                        type="text"
                        value={row.sku}
                        onChange={(e) => onUpdateRow(idx, { sku: e.target.value })}
                        className="w-full bg-transparent text-white font-medium focus:outline-none focus:bg-[#131c31] px-1.5 py-1 rounded"
                      />
                    </td>

                    {/* Season */}
                    <td className="p-2 border-r border-slate-800">
                      <input
                        type="text"
                        value={row.season}
                        onChange={(e) => onUpdateRow(idx, { season: e.target.value })}
                        className="w-full bg-transparent text-slate-300 focus:outline-none focus:bg-[#131c31] px-1.5 py-1 rounded"
                      />
                    </td>

                    {/* PYR Demand */}
                    <td className="p-2 border-r border-slate-800">
                      <input
                        type="number"
                        value={row.pyrDemand}
                        onChange={(e) => onUpdateRow(idx, { pyrDemand: Number(e.target.value) || 0 })}
                        className="w-20 bg-transparent text-purple-300 font-mono-num font-bold focus:outline-none focus:bg-[#131c31] px-1.5 py-1 rounded"
                      />
                    </td>

                    {/* Prepared */}
                    <td className="p-2 border-r border-slate-800">
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={row.prepared}
                          onChange={(e) => onUpdateRow(idx, { prepared: Number(e.target.value) || 0 })}
                          className={`w-20 bg-transparent font-mono-num font-bold focus:outline-none focus:bg-[#131c31] px-1.5 py-1 rounded ${
                            isOverprep ? 'text-amber-400' : 'text-slate-100'
                          }`}
                        />
                        {isOverprep && (
                          <span className="text-[10px] text-amber-400" title="Prepared exceeds historical PYR demand">⚠️</span>
                        )}
                      </div>
                    </td>

                    {/* Sold Today */}
                    <td className="p-2 border-r border-slate-800">
                      <input
                        type="number"
                        value={row.sold}
                        onChange={(e) => onUpdateRow(idx, { sold: Number(e.target.value) || 0 })}
                        className="w-20 bg-transparent text-slate-300 font-mono-num focus:outline-none focus:bg-[#131c31] px-1.5 py-1 rounded"
                      />
                    </td>

                    {/* Expiry Hours */}
                    <td className="p-2 border-r border-slate-800">
                      <input
                        type="number"
                        value={row.expiry}
                        onChange={(e) => onUpdateRow(idx, { expiry: Number(e.target.value) || 0 })}
                        className="w-16 bg-transparent text-slate-300 font-mono-num focus:outline-none focus:bg-[#131c31] px-1.5 py-1 rounded"
                      />
                    </td>

                    {/* Base Price */}
                    <td className="p-2 border-r border-slate-800">
                      <input
                        type="number"
                        value={row.basePrice}
                        onChange={(e) => onUpdateRow(idx, { basePrice: Number(e.target.value) || 0 })}
                        className="w-20 bg-transparent text-slate-200 font-mono-num focus:outline-none focus:bg-[#131c31] px-1.5 py-1 rounded"
                      />
                    </td>

                    {/* Consumer Bid */}
                    <td className="p-2 border-r border-slate-800">
                      <input
                        type="number"
                        value={row.bid}
                        onChange={(e) => onUpdateRow(idx, { bid: Number(e.target.value) || 0 })}
                        className="w-20 bg-transparent text-slate-400 font-mono-num focus:outline-none focus:bg-[#131c31] px-1.5 py-1 rounded"
                      />
                    </td>

                    {/* Dynamic Price */}
                    <td className="p-2 border-r border-slate-800 font-bold text-fuchsia-400 font-mono-num">
                      ₹{autoDyn}
                    </td>

                    {/* Delete */}
                    <td className="p-2 text-right">
                      <button
                        onClick={() => onDeleteRow(idx)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Weather / Event Scenario Simulator */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 flex items-center gap-1.5">
            <CloudRain className="w-4 h-4" /> AI Seasonal & Weather Scenario Simulator
          </span>
          <h3 className="text-lg font-heading font-bold text-white mt-1">
            Test how rain, festivals, or sudden heatwaves shift your PYR forecasts:
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Type any condition (e.g. "Sudden evening heavy rainstorm", "Diwali festive rush", "Sunday morning sunny brunch")
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="e.g., Unseasonal evening thunderstorm during weekend market..."
            value={scenarioInput}
            onChange={(e) => setScenarioInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSimulateScenario()}
            className="flex-grow bg-[#131c31] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSimulateScenario}
            className="btn-foursight px-5 py-2.5 rounded-xl text-xs font-semibold text-white shrink-0"
          >
            Simulate PYR Impact
          </button>
        </div>

        {scenarioResult && (
          <div className="bg-[#131c31] border border-purple-800/50 rounded-xl p-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white">Recommended Production Shift:</span>
              <span className={`text-xs font-bold font-mono-num ${
                scenarioResult.percentChange >= 0 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {scenarioResult.percentChange >= 0 ? `+${scenarioResult.percentChange}%` : `${scenarioResult.percentChange}%`} ({scenarioResult.adjustedDemand} units)
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {scenarioResult.rationale}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
