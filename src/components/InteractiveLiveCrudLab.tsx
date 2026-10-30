import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { INITIAL_CRUD_ITEMS } from '../data/portfolioData';
import { CrudItem } from '../types';
import { Terminal, Plus, Trash2, Edit3, Database, RefreshCw, CheckCircle2, Play, Cpu, Layers, HardDrive, Search, Filter } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function InteractiveLiveCrudLab() {
  const [items, setItems] = useState<CrudItem[]>(INITIAL_CRUD_ITEMS);
  const [dbFilter, setDbFilter] = useState<'All' | 'MongoDB' | 'MySQL'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New Item Form State
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'E-Commerce' | 'Jewelry' | 'API Spec'>('E-Commerce');
  const [newPrice, setNewPrice] = useState<string>('299.00');
  const [newStock, setNewStock] = useState<string>('25');
  const [newDb, setNewDb] = useState<'MongoDB' | 'MySQL'>('MongoDB');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit State
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');

  // Execution Telemetry Logs
  const [logs, setLogs] = useState<Array<{ id: string; timestamp: string; action: string; duration: string; type: 'create' | 'read' | 'update' | 'delete' }>>([
    { id: '1', timestamp: new Date().toLocaleTimeString(), action: 'INITIALIZED DUAL DB CLUSTER [MONGODB & MYSQL]', duration: '12ms', type: 'read' },
  ]);

  const addLog = (action: string, type: 'create' | 'read' | 'update' | 'delete') => {
    const duration = `${Math.floor(Math.random() * 15 + 8)}ms`;
    const newLog = {
      id: String(Date.now()),
      timestamp: new Date().toLocaleTimeString(),
      action,
      duration,
      type,
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 7)]);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    soundFx.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      const newItem: CrudItem = {
        id: `prod_${Math.floor(Math.random() * 900 + 100)}`,
        name: newName,
        category: newCategory,
        price: parseFloat(newPrice) || 99.0,
        stock: parseInt(newStock) || 10,
        dbSource: newDb,
        status: 'In Stock',
        createdAt: new Date().toISOString().split('T')[0],
      };

      setItems([newItem, ...items]);
      addLog(`INSERT INTO ${newDb === 'MongoDB' ? 'products' : 'jewelry_items'} [${newItem.id}]`, 'create');
      soundFx.playSuccess();

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#601212', '#EFDBCF', '#3B0A0A'],
      });

      setNewName('');
      setIsSubmitting(false);
    }, 300);
  };

  const handleDelete = (id: string, name: string) => {
    soundFx.playClick();
    setItems(items.filter((item) => item.id !== id));
    addLog(`DELETE RECORD [${id}] - ${name}`, 'delete');
  };

  const handleStartEdit = (item: CrudItem) => {
    soundFx.playClick();
    setEditingItemId(item.id);
    setEditPrice(String(item.price));
  };

  const handleSaveEdit = (id: string) => {
    soundFx.playClick();
    const updatedPrice = parseFloat(editPrice) || 0;
    setItems(
      items.map((item) => (item.id === id ? { ...item, price: updatedPrice } : item))
    );
    addLog(`UPDATE RECORD [${id}] PRICE = $${updatedPrice}`, 'update');
    setEditingItemId(null);
  };

  const handleResetDb = () => {
    soundFx.playClick();
    setItems(INITIAL_CRUD_ITEMS);
    addLog('RESET DATABASE SEED TO INITIAL STATE', 'read');
  };

  const filteredItems = items.filter((item) => {
    const matchesDb = dbFilter === 'All' || item.dbSource === dbFilter;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDb && matchesQuery;
  });

  return (
    <section id="live-crud-lab" className="py-24 px-6 sm:px-12 relative bg-[#FAF9F6] border-b border-[#0A0A0A]/10">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12 space-y-4">
        <div className="flex items-center justify-between border-b border-[#0A0A0A]/15 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
            <span className="text-xs font-mono-code text-[#601212] uppercase tracking-[0.25em] font-bold">
              02 / Live Interactive CRUD Engine
            </span>
          </div>
          <span className="text-xs font-mono-code text-[#0A0A0A]/60 uppercase tracking-widest hidden sm:block">
            MERN & PHP Hybrid Execution Environment
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-8 space-y-2">
            <h2 className="text-4xl sm:text-6xl font-serif-editorial font-black text-[#0A0A0A] leading-none">
              INTERACTIVE <span className="italic font-normal text-[#601212]">CRUD LAB</span>
            </h2>
            <p className="text-sm sm:text-base text-[#0A0A0A]/80 max-w-2xl font-light">
              Test live database operations in real-time! Create custom items, execute instant state updates, filter MongoDB/MySQL clusters, and inspect latency telemetry logs.
            </p>
          </div>

          <div className="md:col-span-4 flex justify-start md:justify-end">
            <button
              onClick={handleResetDb}
              data-cursor="RESET"
              className="px-5 py-3 bg-[#EFDBCF] hover:bg-[#EAE3D9] text-[#0A0A0A] text-xs font-mono-code uppercase tracking-widest font-bold border border-[#0A0A0A]/20 flex items-center gap-2 transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#601212]" />
              Reset DB Seeds
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Sandbox Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Create Form & DB Console Telemetry */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Create Item Form */}
          <div className="p-6 bg-[#EFDBCF] border border-[#0A0A0A]/15 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#0A0A0A]/10 pb-3">
              <span className="text-xs font-mono-code text-[#601212] uppercase tracking-wider font-bold flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#601212]" /> Create Record (POST)
              </span>
              <span className="text-[10px] font-mono-code text-[#0A0A0A]/70 bg-[#FAF9F6] px-2 py-0.5 border border-[#0A0A0A]/10 uppercase font-bold">
                Live Payload
              </span>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs font-mono-code">
              <div>
                <label className="block text-[#0A0A0A] uppercase tracking-wider font-bold mb-1">
                  Item Title / Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g., Solitaire Diamond Ring or Auth Microservice"
                  required
                  className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#0A0A0A]/20 text-[#0A0A0A] placeholder-[#0A0A0A]/40 focus:outline-none focus:border-[#601212]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#0A0A0A] uppercase tracking-wider font-bold mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as 'E-Commerce' | 'Jewelry' | 'API Spec')}
                    className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:border-[#601212]"
                  >
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="API Spec">API Spec</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#0A0A0A] uppercase tracking-wider font-bold mb-1">
                    DB Engine
                  </label>
                  <select
                    value={newDb}
                    onChange={(e) => setNewDb(e.target.value as 'MongoDB' | 'MySQL')}
                    className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:border-[#601212]"
                  >
                    <option value="MongoDB">MongoDB (NoSQL)</option>
                    <option value="MySQL">MySQL (Relational)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#0A0A0A] uppercase tracking-wider font-bold mb-1">
                    Price ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:border-[#601212]"
                  />
                </div>

                <div>
                  <label className="block text-[#0A0A0A] uppercase tracking-wider font-bold mb-1">
                    Stock Units
                  </label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-[#0A0A0A]/20 text-[#0A0A0A] focus:outline-none focus:border-[#601212]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor="CREATE"
                className="w-full py-3.5 bg-[#601212] hover:bg-[#3B0A0A] text-[#FAF9F6] font-bold uppercase tracking-widest border border-[#601212] shadow-md flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-[#FAF9F6]" />
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Execute Insert Payload</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Database Real-Time Telemetry Logs */}
          <div className="p-5 bg-[#0A0A0A] text-[#FAF9F6] font-mono-code text-xs space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[#FAF9F6]/80">
              <span className="flex items-center gap-2 uppercase tracking-wider text-[#D1B3B3]">
                <Terminal className="w-3.5 h-3.5 text-[#D1B3B3]" /> DB Telemetry Stream
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">200 OK</span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between text-[11px] py-1 border-b border-white/5">
                  <span className="text-white/40">{log.timestamp}</span>
                  <span
                    className={`truncate mx-2 ${
                      log.type === 'create'
                        ? 'text-emerald-400'
                        : log.type === 'delete'
                        ? 'text-rose-400'
                        : log.type === 'update'
                        ? 'text-amber-300'
                        : 'text-[#D1B3B3]'
                    }`}
                  >
                    {log.action}
                  </span>
                  <span className="text-white/60 shrink-0 text-[10px]">{log.duration}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Database Records Viewer & Filter Matrix */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Controls Bar */}
          <div className="p-4 bg-[#EFDBCF] border border-[#0A0A0A]/15 flex flex-wrap items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#0A0A0A]/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search DB records or IDs..."
                className="w-full pl-9 pr-4 py-2 bg-[#FAF9F6] border border-[#0A0A0A]/20 text-xs text-[#0A0A0A] placeholder-[#0A0A0A]/50 focus:outline-none focus:border-[#601212]"
              />
            </div>

            {/* DB Engine Filter */}
            <div className="flex items-center gap-1.5 bg-[#FAF9F6] p-1 border border-[#0A0A0A]/20 text-xs font-mono-code">
              {(['All', 'MongoDB', 'MySQL'] as const).map((db) => (
                <button
                  key={db}
                  onClick={() => { soundFx.playClick(); setDbFilter(db); }}
                  className={`px-3 py-1.5 transition-colors uppercase font-bold text-[10px] ${
                    dbFilter === db ? 'bg-[#601212] text-[#FAF9F6]' : 'text-[#0A0A0A] hover:bg-[#EFDBCF]'
                  }`}
                >
                  {db}
                </button>
              ))}
            </div>
          </div>

          {/* Records Table Card */}
          <div className="bg-[#FAF9F6] border border-[#0A0A0A]/15 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#0A0A0A]/15 flex items-center justify-between text-xs font-mono-code font-bold text-[#0A0A0A]">
              <span>Active Collection ({filteredItems.length} records)</span>
              <span className="text-[#601212]">Dual MERN & PHP Cluster</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono-code">
                <thead>
                  <tr className="border-b border-[#0A0A0A]/15 bg-[#EFDBCF]/40 text-[#0A0A0A] uppercase text-[10px] tracking-wider font-bold">
                    <th className="py-3.5 px-4">ID</th>
                    <th className="py-3.5 px-4">Record Name</th>
                    <th className="py-3.5 px-4">Engine</th>
                    <th className="py-3.5 px-4">Price ($)</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0A0A0A]/10 text-[#0A0A0A]">
                  <AnimatePresence>
                    {filteredItems.map((item) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-[#EFDBCF]/30 transition-colors group"
                      >
                        <td className="py-3 px-4 font-mono font-bold text-[#601212]">
                          {item.id}
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold">{item.name}</div>
                          <span className="text-[10px] text-[#0A0A0A]/60 uppercase">
                            {item.category} • {item.stock} in stock
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-1 text-[10px] font-bold border uppercase ${
                              item.dbSource === 'MongoDB'
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : 'bg-amber-100 text-amber-900 border-amber-300'
                            }`}
                          >
                            {item.dbSource}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-bold text-[#0A0A0A]">
                          {editingItemId === item.id ? (
                            <input
                              type="number"
                              step="0.01"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="w-20 px-2 py-1 bg-[#FAF9F6] border border-[#601212] text-xs text-[#0A0A0A]"
                            />
                          ) : (
                            `$${item.price.toFixed(2)}`
                          )}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {editingItemId === item.id ? (
                              <button
                                onClick={() => handleSaveEdit(item.id)}
                                className="px-2.5 py-1 bg-emerald-700 text-white text-[10px] uppercase font-bold"
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStartEdit(item)}
                                title="Edit Price (UPDATE)"
                                className="p-1.5 bg-[#EFDBCF] hover:bg-[#601212] text-[#0A0A0A] hover:text-[#FAF9F6] border border-[#0A0A0A]/20 transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              onClick={() => handleDelete(item.id, item.name)}
                              title="Delete Item (DELETE)"
                              className="p-1.5 bg-[#EFDBCF] hover:bg-[#601212] text-[#0A0A0A] hover:text-[#FAF9F6] border border-[#0A0A0A]/20 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>

                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-[#0A0A0A]/60">
                        No records match the current filter. Click "Reset DB Seeds" to restore data.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
