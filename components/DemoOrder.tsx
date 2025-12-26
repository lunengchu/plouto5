
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Plus, 
  Trash2, 
  Save, 
  ArrowRight,
  ChevronDown,
  Info,
  Package,
  FileText,
  DollarSign
} from 'lucide-react';

type OrderStatus = 'idle' | 'saving' | 'success' | 'error';

interface OrderItem {
  id: string;
  sku: string;
  description: string;
  qty: number;
  price: number;
}

const DemoOrder: React.FC = () => {
  const [status, setStatus] = useState<OrderStatus>('idle');
  const [items, setItems] = useState<OrderItem[]>([
    { id: '1', sku: 'SKU-7721', description: 'Logistics Sensor v4', qty: 150, price: 12.50 }
  ]);
  const [savingStep, setSavingStep] = useState(0);

  const steps = [
    "Validating SKU Integrity...",
    "Calculating Customs Duty...",
    "Securing Freight Allocation...",
    "Finalizing Blockchain Manifest..."
  ];

  const handleSave = () => {
    setStatus('saving');
    setSavingStep(0);
    const interval = setInterval(() => {
      setSavingStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    setTimeout(() => {
      if (Math.random() > 0.2) {
        setStatus('success');
      } else {
        setStatus('error');
      }
      clearInterval(interval);
    }, 4500);
  };

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), sku: '', description: '', qty: 0, price: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  if (status === 'success') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 lg:p-12 text-center animate-in zoom-in duration-700">
        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-emerald-50 rounded-[1.5rem] lg:rounded-[2rem] flex items-center justify-center mb-6 lg:mb-8 shadow-lg shadow-emerald-100 ring-4 ring-emerald-500/10">
          <CheckCircle2 className="w-10 h-10 lg:w-12 lg:h-12 text-emerald-500" />
        </div>
        <h2 className="text-2xl lg:text-4xl font-black text-slate-900 mb-2 tracking-tight">Order Confirmed!</h2>
        <p className="text-sm lg:text-base text-slate-500 max-w-md mx-auto mb-8 lg:mb-12 font-medium">
          Order <span className="text-slate-900 font-black">#ORD-2023-99102</span> has been processed successfully.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full sm:w-auto">
          <button 
            onClick={() => setStatus('idle')}
            className="px-8 py-3 lg:py-4 bg-white border border-slate-200 text-slate-700 font-black rounded-xl lg:rounded-2xl hover:bg-slate-50 transition-all shadow-sm order-2 sm:order-1"
          >
            Create New Order
          </button>
          <button className="px-8 py-3 lg:py-4 bg-indigo-600 text-white font-black rounded-xl lg:rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all order-1 sm:order-2">
            View Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8 pb-24 relative">
      {status === 'saving' && (
        <div className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-md flex items-center justify-center p-4 lg:p-8 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 lg:p-10 text-center">
            <div className="mb-6 lg:mb-8 flex flex-col items-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-slate-50 border-t-indigo-600 animate-spin mb-4 lg:mb-6"></div>
              <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-2">Processing Order</h3>
              <p className="text-slate-400 font-medium text-xs lg:text-sm">Please do not refresh the hub.</p>
            </div>
            
            <div className="space-y-3 lg:space-y-4 text-left max-w-[240px] mx-auto">
              {steps.map((text, idx) => (
                <div key={idx} className={`flex items-center gap-3 transition-all duration-500 ${idx === savingStep ? 'scale-105 opacity-100' : idx < savingStep ? 'opacity-40' : 'opacity-20'}`}>
                  {idx < savingStep ? (
                    <div className="w-4 h-4 lg:w-5 lg:h-5 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white" />
                    </div>
                  ) : (
                    <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 shrink-0 ${idx === savingStep ? 'border-indigo-600 border-t-transparent animate-spin' : 'border-slate-200'}`}></div>
                  )}
                  <span className={`text-[11px] lg:text-sm font-bold truncate ${idx === savingStep ? 'text-indigo-600' : 'text-slate-600'}`}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Generate Order</h1>
          <p className="text-sm lg:text-base text-slate-500 font-medium truncate">Drafting ORD-2023-99102</p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 lg:flex-none px-4 lg:px-6 py-2.5 lg:py-3 bg-white border border-slate-200 text-slate-600 font-black rounded-xl hover:bg-slate-50 transition-all text-sm lg:text-base">Cancel</button>
          <button 
            onClick={handleSave}
            disabled={status === 'saving'}
            className="flex-1 lg:flex-none px-6 lg:px-8 py-2.5 lg:py-3 bg-indigo-600 text-white font-black rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 text-sm lg:text-base"
          >
            <Save className="w-4 h-4 lg:w-5 lg:h-5" /> Process
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          <section className="bg-white rounded-[1.5rem] lg:rounded-[2rem] p-6 lg:p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                <Info className="w-5 h-5" />
              </div>
              <h2 className="text-base lg:text-lg font-black text-slate-800 uppercase tracking-tight">Order Manifest</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Client Entity</label>
                <div className="relative group">
                   <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl outline-none appearance-none font-bold text-slate-800 text-sm focus:bg-white transition-all">
                      <option>Oceanic Retail Ltd</option>
                      <option>Global Supply Chain Corp</option>
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Facility</label>
                <div className="relative group">
                   <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl outline-none appearance-none font-bold text-slate-800 text-sm focus:bg-white transition-all">
                      <option>Chicago Regional DC</option>
                      <option>L.A. Port Annex</option>
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[1.5rem] lg:rounded-[2rem] p-6 lg:p-8 shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  <Package className="w-5 h-5" />
                </div>
                <h2 className="text-base lg:text-lg font-black text-slate-800 uppercase tracking-tight">Line Items</h2>
              </div>
              <button 
                onClick={addItem}
                className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all flex items-center gap-2 text-[10px] font-black uppercase"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            <div className="space-y-4">
               {items.map((item) => (
                 <div key={item.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group relative">
                    <div className="grid grid-cols-2 sm:grid-cols-12 gap-3">
                        <div className="col-span-2 sm:col-span-3">
                           <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">SKU</label>
                           <input type="text" className="w-full bg-transparent outline-none font-bold text-slate-800 text-xs lg:text-sm" placeholder="SKU-0000" defaultValue={item.sku} />
                        </div>
                        <div className="col-span-2 sm:col-span-4">
                           <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Description</label>
                           <input type="text" className="w-full bg-transparent outline-none font-bold text-slate-800 text-xs lg:text-sm" placeholder="Item name..." defaultValue={item.description} />
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                           <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Qty</label>
                           <input type="number" className="w-full bg-transparent outline-none font-bold text-slate-800 text-xs lg:text-sm" defaultValue={item.qty} />
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                           <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Price</label>
                           <input type="number" className="w-full bg-transparent outline-none font-bold text-slate-800 text-xs lg:text-sm" defaultValue={item.price} />
                        </div>
                        <div className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0 sm:col-span-1 flex items-end justify-end">
                           <button onClick={() => removeItem(item.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                    </div>
                 </div>
               ))}
            </div>
          </section>
        </div>

        <div className="space-y-6 lg:space-y-8">
           <section className="bg-slate-900 rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 text-white shadow-2xl">
              <h3 className="text-base lg:text-lg font-black mb-6 lg:mb-8 flex items-center gap-3">
                 <DollarSign className="w-5 h-5 text-indigo-400" />
                 Summary
              </h3>
              
              <div className="space-y-4 lg:space-y-6">
                 <div className="flex justify-between items-center opacity-60">
                    <span className="text-xs lg:text-sm font-medium">Subtotal</span>
                    <span className="text-xs lg:text-sm font-bold">$1,875.00</span>
                 </div>
                 <div className="flex justify-between items-center opacity-60">
                    <span className="text-xs lg:text-sm font-medium">Duty</span>
                    <span className="text-xs lg:text-sm font-bold">$142.30</span>
                 </div>
                 <div className="pt-4 lg:pt-6 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm lg:text-base font-bold">Total</span>
                    <span className="text-xl lg:text-2xl font-black text-indigo-400">$2,062.30</span>
                 </div>
              </div>
           </section>

           <section className="bg-white rounded-[1.5rem] lg:rounded-[2rem] p-6 lg:p-8 shadow-sm border border-slate-100">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 lg:mb-6 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                Notes
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white font-bold text-xs" defaultValue="PO-9821-X" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Special Instructions</label>
                  <textarea className="w-full h-24 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white font-bold text-xs resize-none" placeholder="Requirements..."></textarea>
                </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default DemoOrder;
