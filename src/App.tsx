import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { NavTab, Language, InventoryItem, PyrRow, ConsumerBid, BillRecord, PickupToken } from './types';
import { initialInventory, initialPyrRows, initialConsumerBids, initialBillsLog } from './data/seedData';
import { calculateDynamicPrice } from './utils/rules';
import { Navbar } from './components/Navbar';
import { OverviewSection } from './components/OverviewSection';
import { ExplainSection } from './components/ExplainSection';
import { CounterBillingSection } from './components/CounterBillingSection';
import { PyrLedgerSection } from './components/PyrLedgerSection';
import { ConsumerNetworkSection } from './components/ConsumerNetworkSection';
import { RoiCalculatorSection } from './components/RoiCalculatorSection';
import { PricingTeamSection } from './components/PricingTeamSection';
import { ReceiptModal } from './components/ReceiptModal';
import { AddBatchModal } from './components/AddBatchModal';
import { AiCopilotModal } from './components/AiCopilotModal';
import { AudioBriefingModal } from './components/AudioBriefingModal';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from './components/BrandLogo';

export default function App() {
  // Navigation & Preferences State
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Core Data State
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [pyrRows, setPyrRows] = useState<PyrRow[]>(initialPyrRows);
  const [consumerBids, setConsumerBids] = useState<ConsumerBid[]>(initialConsumerBids);
  const [billsLog, setBillsLog] = useState<BillRecord[]>(initialBillsLog);
  const [pickupTokens, setPickupTokens] = useState<PickupToken[]>([]);
  const [shiftHour, setShiftHour] = useState<number>(14); // 2:00 PM default

  // Modals & Popovers
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<BillRecord | null>(null);
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotInitialPrompt, setCopilotInitialPrompt] = useState('');
  const [isAudioBriefingOpen, setIsAudioBriefingOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 4000);
  };

  // Check URL params (?autostart=1 or tab parameter)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as NavTab;
    if (tabParam && ['overview', 'explain', 'billing', 'pyr', 'network', 'roi', 'pricing'].includes(tabParam)) {
      setCurrentTab(tabParam);
    } else if (params.get('autostart') === '1') {
      setCurrentTab('billing');
    }
  }, []);

  // Sync theme with HTML class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Adjust expiry hours when shift hour changes
  const handleShiftHourChange = (newHour: number) => {
    setShiftHour(newHour);
    setInventory(prev => prev.map(item => ({
      ...item,
      expiryHours: Math.max(1, 10 - (newHour - 8))
    })));
  };

  // Complete bill transaction
  const handleCompleteBill = (
    cart: Record<number, number>,
    mode: 'UPI' | 'Cash' | 'Card',
    printReceipt: boolean
  ) => {
    const itemsDescriptionParts: string[] = [];
    let grandTotal = 0;
    let totalItemsCount = 0;

    const updatedInventory = inventory.map(item => {
      const qtyInCart = cart[item.id] || 0;
      if (qtyInCart > 0) {
        const dynPrice = calculateDynamicPrice(item.price, item.expiryHours, Math.max(0, item.stock - item.sold));
        grandTotal += dynPrice * qtyInCart;
        totalItemsCount += qtyInCart;
        itemsDescriptionParts.push(`${qtyInCart}x ${item.name} (@ ₹${dynPrice})`);
        return {
          ...item,
          sold: item.sold + qtyInCart
        };
      }
      return item;
    });

    if (totalItemsCount === 0) return;

    setInventory(updatedInventory);

    // Create receipt record
    const newBill: BillRecord = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: itemsDescriptionParts.join(', '),
      itemCount: totalItemsCount,
      mode,
      total: grandTotal,
      cashierName: 'Counter 1'
    };

    setBillsLog(prev => [newBill, ...prev]);

    // Fire celebration confetti!
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#e879f9', '#a855f7', '#7c3aed']
      });
    } catch (e) {
      // Ignore in non-canvas test environments
    }

    if (printReceipt) {
      setActiveReceipt(newBill);
      setIsReceiptOpen(true);
    } else {
      showToast(`Bill completed for ₹${grandTotal.toLocaleString('en-IN')} via ${mode}. Stock updated!`);
    }
  };

  // Add Morning Batch
  const handleAddBatch = (newItem: Omit<InventoryItem, 'id' | 'sold'>) => {
    const item: InventoryItem = {
      ...newItem,
      id: Date.now(),
      sold: 0
    };
    setInventory(prev => [item, ...prev]);
    showToast(`Added morning batch of ${item.stock}x ${item.name} to active inventory.`);
  };

  // Quick clearance flash bundle trigger
  const handleTriggerQuickClearance = (itemId: number) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item) return;

    setInventory(prev => prev.map(i => {
      if (i.id === itemId) {
        const remaining = Math.max(0, i.stock - i.sold);
        const clearanceQty = Math.max(1, remaining - 1);
        return {
          ...i,
          sold: i.sold + clearanceQty
        };
      }
      return i;
    }));

    showToast(`4 PM Flash Bundle activated for ${item.name}! Cash recovered.`);
  };

  // PYR row updates
  const handleUpdatePyrRow = (index: number, updated: Partial<PyrRow>) => {
    setPyrRows(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updated };
      return copy;
    });
  };

  const handleAddPyrRow = (newRow: PyrRow) => {
    setPyrRows(prev => [...prev, newRow]);
    showToast("Added new row to PYR Excel ledger.");
  };

  const handleDeletePyrRow = (index: number) => {
    setPyrRows(prev => prev.filter((_, i) => i !== index));
    showToast("Row removed from PYR ledger.");
  };

  // Consumer Network Actions
  const handleAddConsumerBid = (newBid: Omit<ConsumerBid, 'id' | 'status' | 'timestamp'>) => {
    const bid: ConsumerBid = {
      ...newBid,
      id: `BID-${Math.floor(500 + Math.random() * 499)}`,
      status: 'Active',
      timestamp: 'Just now'
    };
    setConsumerBids(prev => [bid, ...prev]);
  };

  const handleAcceptConsumerBid = (bidId: string) => {
    const targetBid = consumerBids.find(b => b.id === bidId);
    if (!targetBid) return;

    // Mark matched
    setConsumerBids(prev => prev.map(b => b.id === bidId ? { ...b, status: 'Accepted' } : b));

    // Deduct stock if matching item exists
    setInventory(prev => prev.map(item => {
      if (item.name.toLowerCase().includes(targetBid.item.toLowerCase())) {
        return {
          ...item,
          sold: Math.min(item.stock, item.sold + targetBid.qty)
        };
      }
      return item;
    }));

    // Create pickup token
    const token: PickupToken = {
      id: `TKN-${Date.now().toString().slice(-4)}`,
      item: targetBid.item,
      qty: targetBid.qty,
      amount: targetBid.bid * targetBid.qty,
      consumer: targetBid.consumer,
      code: `4OUR-${Math.floor(1000 + Math.random() * 8999)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setPickupTokens(prev => [token, ...prev]);

    // Also record in billing log
    const billRecord: BillRecord = {
      id: `TXN-BID-${Math.floor(100 + Math.random() * 900)}`,
      time: token.time,
      items: `${token.qty}x ${token.item} (Network Bid)`,
      itemCount: token.qty,
      mode: 'UPI',
      total: token.amount,
      cashierName: 'Network Terminal'
    };
    setBillsLog(prev => [billRecord, ...prev]);

    showToast(`Accepted bid for ${token.consumer}! Pickup token: ${token.code}`);
  };

  // Open Copilot with initial prompt
  const handleOpenCopilotWithPrompt = (prompt: string) => {
    setCopilotInitialPrompt(prompt);
    setIsCopilotOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors">
      
      {/* Sticky Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenCopilot={() => { setCopilotInitialPrompt(''); setIsCopilotOpen(true); }}
        onOpenAudioBriefing={() => setIsAudioBriefingOpen(true)}
        onOpenExplainTour={() => setCurrentTab('explain')}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {currentTab === 'overview' && (
          <OverviewSection
            currentLang={currentLang}
            onGoToBilling={() => setCurrentTab('billing')}
            onGoToPyr={() => setCurrentTab('pyr')}
            onGoToExplain={() => setCurrentTab('explain')}
            onGoToRoi={() => setCurrentTab('roi')}
          />
        )}

        {currentTab === 'explain' && (
          <ExplainSection
            onGoToBilling={() => setCurrentTab('billing')}
            onGoToPyr={() => setCurrentTab('pyr')}
            onGoToRoi={() => setCurrentTab('roi')}
          />
        )}

        {currentTab === 'billing' && (
          <CounterBillingSection
            inventory={inventory}
            billsLog={billsLog}
            onCompleteBill={handleCompleteBill}
            onOpenAddBatchModal={() => setIsAddBatchOpen(true)}
            onTriggerQuickClearance={handleTriggerQuickClearance}
            shiftHour={shiftHour}
            onChangeShiftHour={handleShiftHourChange}
            onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
          />
        )}

        {currentTab === 'pyr' && (
          <PyrLedgerSection
            pyrRows={pyrRows}
            onUpdateRow={handleUpdatePyrRow}
            onAddRow={handleAddPyrRow}
            onDeleteRow={handleDeletePyrRow}
            onBulkUpdate={setPyrRows}
            onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'network' && (
          <ConsumerNetworkSection
            bids={consumerBids}
            onAddBid={handleAddConsumerBid}
            onAcceptBid={handleAcceptConsumerBid}
            pickupTokens={pickupTokens}
            onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'roi' && (
          <RoiCalculatorSection
            onSelectPlan={(plan) => {
              showToast(`Selected ${plan}. Onboarding initialized!`);
              setCurrentTab('pricing');
            }}
          />
        )}

        {currentTab === 'pricing' && (
          <PricingTeamSection
            onSelectPlan={(plan) => showToast(`Selected ${plan}! Proof of concept activated.`)}
            onGoToExplain={() => setCurrentTab('explain')}
          />
        )}

      </main>

      {/* Modern Footer */}
      <footer className="border-t border-slate-800/80 bg-[#050508] py-8 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" showSubtitle={false} onClick={() => setCurrentTab('overview')} />
            <span className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} 4OURSIGHT. B2B Surplus Intelligence & Direct Counter Billing.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <button onClick={() => setCurrentTab('explain')} className="hover:text-fuchsia-300 transition-colors">
              Explain 4OURSIGHT
            </button>
            <button onClick={() => setCurrentTab('roi')} className="hover:text-fuchsia-300 transition-colors">
              ROI Calculator
            </button>
            <button onClick={() => setCurrentTab('pricing')} className="hover:text-fuchsia-300 transition-colors">
              Founders & Plans
            </button>
            <span className="text-purple-400 font-semibold hidden md:inline">
              UNEP 2024 Food Waste Index Aligned
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        bill={activeReceipt}
      />

      <AddBatchModal
        isOpen={isAddBatchOpen}
        onClose={() => setIsAddBatchOpen(false)}
        onAddBatch={handleAddBatch}
      />

      <AiCopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        initialPrompt={copilotInitialPrompt}
      />

      <AudioBriefingModal
        isOpen={isAudioBriefingOpen}
        onClose={() => setIsAudioBriefingOpen(false)}
        currentLang={currentLang}
      />

      {/* Non-blocking Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#150a2a] border border-purple-500 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-medium max-w-sm animate-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-fuchsia-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
