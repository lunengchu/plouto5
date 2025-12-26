
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
    
    // Simulate step-by-step progress
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
      // Simulate random outcome
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
      <div className="h-full flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-700">
        <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-lg shadow-emerald-100 ring-4 ring-emerald-500/10">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Order Confirmed!</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-12 font-medium">
          Order <span className="text-slate-900 font-black">#ORD-2023-99102</span> has been processed and sent to the fulfillment queue.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => setStatus('idle')}
            className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
          >
            Create New Order
          </button>
          <button className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
            View Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-24 relative">
      {/* Saving Overlay */}
      {status === 'saving' && (
        <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-md flex items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 p-10 text-center">
            <div className="mb-8 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-4 border-slate-50 border-t-indigo-600 animate-spin mb-6"></div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Processing Order</h3>
              <p className="text-slate-400 font-medium text-sm">Please do not refresh the gateway hub.</p>
            </div>
            
            <div className="space-y-4">
              {steps.map((text, idx) => (
                <div key={idx} className={`flex items-center gap-3 transition-all duration-500 ${idx === savingStep ? 'scale-105 opacity-100' : idx < savingStep ? 'opacity-40' : 'opacity-20'}`}>
                  {idx < savingStep ? (
                    <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className={`w-5 h-5 rounded-full border-2 ${idx === savingStep ? 'border-indigo-600 border-t-transparent animate-spin' : 'border-slate-200'}`}></div>
                  )}
                  <span className={`text-sm font-bold ${idx === savingStep ? 'text-indigo-600' : 'text-slate-600'}`}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {status === 'error' && (
        <div className="fixed bottom-10 right-10 z-[60] bg-rose-600 text-white p-6 rounded-3xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-right-4">
          <div className="p-3 bg-white/20 rounded-2xl">
            <XCircle className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-black text-lg">Manifest Collision</h4>
            <p className="text-white/80 text-sm font-medium">Stock levels changed during validation.</p>
          </div>
          <button 
            onClick={() => setStatus('idle')}
            className="px-6 py-3 bg-white text-rose-600 font-black rounded-xl hover:bg-rose-50 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Generate New Order</h1>
          <p className="text-slate-500 font-medium">Drafting shipment ORD-2023-99102</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-black rounded-xl hover:bg-slate-50 transition-all">Cancel</button>
          <button 
            onClick={handleSave}
            disabled={status === 'saving'}
            className="px-8 py-3 bg-indigo-600 text-white font-black rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            <Save className="w-5 h-5" /> Process Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                <Info className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black text-slate-800">Order Manifest Headers</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Client Entity</label>
                <div className="relative group">
                   <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none appearance-none font-bold text-slate-800 focus:ring-4 focus:ring-indigo-500/5 transition-all">
                      <option>Oceanic Retail Ltd</option>
                      <option>Global Supply Chain Corp</option>
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination Facility</label>
                <div className="relative group">
                   <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none appearance-none font-bold text-slate-800 focus:ring-4 focus:ring-indigo-500/5 transition-all">
                      <option>Chicago Regional DC (US-ORD1)</option>
                      <option>L.A. Port Annex (US-LAX2)</option>
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Incoterms® 2020</label>
                <div className="relative group">
                   <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none appearance-none font-bold text-slate-800 focus:ring-4 focus:ring-indigo-500/5 transition-all">
                      <option>DAP - Delivered at Place</option>
                      <option>FOB - Free on Board</option>
                      <option>EXW - Ex Works</option>
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Arrival Date</label>
                <input type="date" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none font-bold text-slate-800 focus:ring-4 focus:ring-indigo-500/5 transition-all" defaultValue="2023-12-25" />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  <Package className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-black text-slate-800">Product Line Items</h2>
              </div>
              <button 
                onClick={addItem}
                className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-2 text-xs font-black uppercase"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>

            <div className="space-y-4">
               {items.map((item, index) => (
                 <div key={item.id} className="grid grid-cols-12 gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
                    <div className="col-span-3">
                       <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">SKU Code</label>
                       <input 
                         type="text" 
                         className="w-full bg-transparent outline-none font-bold text-slate-800 text-sm" 
                         placeholder="SKU-0000" 
                         defaultValue={item.sku}
                       />
                    </div>
                    <div className="col-span-5">
                       <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Description</label>
                       <input 
                         type="text" 
                         className="w-full bg-transparent outline-none font-bold text-slate-800 text-sm" 
                         placeholder="Item name..." 
                         defaultValue={item.description}
                       />
                    </div>
                    <div className="col-span-1">
                       <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Qty</label>
                       <input 
                         type="number" 
                         className="w-full bg-transparent outline-none font-bold text-slate-800 text-sm" 
                         defaultValue={item.qty}
                       />
                    </div>
                    <div className="col-span-2">
                       <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Unit Price</label>
                       <div className="flex items-center gap-1 font-bold text-slate-800 text-sm">
                          <span className="opacity-40">$</span>
                          <input 
                            type="number" 
                            className="w-full bg-transparent outline-none" 
                            defaultValue={item.price}
                          />
                       </div>
                    </div>
                    <div className="col-span-1 flex items-end justify-end pb-1">
                       <button onClick={() => removeItem(item.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-8">
           <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-200">
              <h3 className="text-lg font-black mb-8 flex items-center gap-3">
                 <DollarSign className="w-5 h-5 text-indigo-400" />
                 Financial Summary
              </h3>
              
              <div className="space-y-6">
                 <div className="flex justify-between items-center opacity-60">
                    <span className="text-sm font-medium">Subtotal</span>
                    <span className="text-sm font-bold">$1,875.00</span>
                 </div>
                 <div className="flex justify-between items-center opacity-60">
                    <span className="text-sm font-medium">Estimated Duties</span>
                    <span className="text-sm font-bold">$142.30</span>
                 </div>
                 <div className="flex justify-between items-center opacity-60">
                    <span className="text-sm font-medium">Freight Insurance</span>
                    <span className="text-sm font-bold">$45.00</span>
                 </div>
                 <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                    <span className="text-base font-bold">Total Payable</span>
                    <span className="text-2xl font-black text-indigo-400">$2,062.30</span>
                 </div>
              </div>

              <div className="mt-10 bg-white/5 rounded-2xl p-4 border border-white/5 flex items-start gap-3">
                 <Info className="w-4 h-4 text-white/40 mt-0.5" />
                 <p className="text-[11px] text-white/50 leading-relaxed">
                    Financials are calculated based on real-time exchange rates and regional tariff schedules.
                 </p>
              </div>
           </section>

           <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                Additional Details
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Reference #</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white font-bold text-xs" defaultValue="PO-9821-X" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Special Instructions</label>
                  <textarea className="w-full h-32 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white font-bold text-xs resize-none" placeholder="Add handling requirements..."></textarea>
                </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default DemoOrder;
