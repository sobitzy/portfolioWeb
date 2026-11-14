import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, AlertTriangle, CheckCircle2, Code2, Tag, ShieldCheck } from 'lucide-react';

interface SimulatedProduct {
  name: string;
  price: number;
  stock: number;
  discountPercentage: number;
}

export const JavaCliSimulator: React.FC = () => {
  const [product, setProduct] = useState<SimulatedProduct>({
    name: 'Logitech MX Master 3S',
    price: 99.99,
    stock: 14,
    discountPercentage: 15,
  });

  const [inputName, setInputName] = useState(product.name);
  const [inputPrice, setInputPrice] = useState(product.price.toString());
  const [inputStock, setInputStock] = useState(product.stock.toString());
  const [inputDiscount, setInputDiscount] = useState(product.discountPercentage.toString());

  const [logs, setLogs] = useState<Array<{ type: 'cmd' | 'output' | 'error' | 'success'; text: string }>>([
    { type: 'cmd', text: 'java -cp bin com.ust.inventory.Main' },
    { type: 'output', text: '=== UST Product Manager System (Java 21 CLI Prototype) ===' },
    { type: 'success', text: 'Product initialized: Logitech MX Master 3S | Price: $99.99 | Stock: 14' },
    { type: 'output', text: 'Inventory Valuation: $1,399.86 | Total Units: 14' },
  ]);

  const [activeTab, setActiveTab] = useState<'terminal' | 'java-code'>('terminal');

  const addLog = (type: 'cmd' | 'output' | 'error' | 'success', text: string) => {
    setLogs((prev) => [...prev.slice(-18), { type, text }]);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(inputPrice);
    const s = parseInt(inputStock, 10);

    if (isNaN(p) || p < 0) {
      addLog('cmd', `product.setPrice(${inputPrice});`);
      addLog('error', 'Exception in thread "main" java.lang.IllegalArgumentException: Price cannot be negative');
      return;
    }

    if (isNaN(s) || s < 0) {
      addLog('cmd', `product.setStockQuantity(${inputStock});`);
      addLog('error', 'Exception in thread "main" java.lang.IllegalArgumentException: Stock cannot be negative');
      return;
    }

    setProduct({
      name: inputName.trim() || 'Untitled Product',
      price: p,
      stock: s,
      discountPercentage: product.discountPercentage,
    });

    addLog('cmd', `Product p = new Product("${inputName.trim()}", ${p.toFixed(2)}, ${s});`);
    addLog('success', `[OK] Instantiated: ${inputName} | Unit Price: $${p.toFixed(2)} | In Stock: ${s}`);
    const totalVal = p * s;
    addLog('output', `[Calculated Total Value]: $${totalVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  };

  const handleApplyDiscount = () => {
    const disc = parseFloat(inputDiscount);
    if (isNaN(disc) || disc < 0 || disc > 100) {
      addLog('cmd', `product.applyDiscount(${inputDiscount});`);
      addLog('error', 'Exception: java.lang.IllegalArgumentException: Discount must be between 0% and 100%');
      return;
    }

    setProduct((prev) => ({ ...prev, discountPercentage: disc }));
    const discountedPrice = product.price * (1 - disc / 100);
    const savings = product.price - discountedPrice;

    addLog('cmd', `product.applyDiscount(${disc}%);`);
    addLog(
      'success',
      `Applied ${disc}% discount! New Price: $${discountedPrice.toFixed(2)} (Savings: $${savings.toFixed(2)}/unit)`
    );
  };

  const handleReset = () => {
    setProduct({
      name: 'Logitech MX Master 3S',
      price: 99.99,
      stock: 14,
      discountPercentage: 15,
    });
    setInputName('Logitech MX Master 3S');
    setInputPrice('99.99');
    setInputStock('14');
    setInputDiscount('15');
    setLogs([
      { type: 'cmd', text: 'java -cp bin com.ust.inventory.Main' },
      { type: 'output', text: '=== UST Product Manager System (Java 21 CLI Prototype) ===' },
      { type: 'success', text: 'Session reset to default OOP demonstration product.' },
    ]);
  };

  const discountedUnit = product.price * (1 - product.discountPercentage / 100);
  const totalInventoryValuation = product.price * product.stock;

  return (
    <div className="bg-[#121316] border border-[#27272a] rounded-xl overflow-hidden shadow-2xl">
      {/* Top terminal bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#18191e] border-b border-[#27272a]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/80 inline-block" />
          </div>
          <span className="ml-2 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#f59e0b]" />
            ProductManager.java — OpenJDK 21 CLI Simulator
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-[#0c0d0e] p-0.5 rounded-lg border border-[#27272a]">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'terminal' ? 'bg-[#27272a] text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Interactive CLI
            </button>
            <button
              onClick={() => setActiveTab('java-code')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'java-code' ? 'bg-[#27272a] text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Java Source
            </button>
          </div>
          <button
            onClick={handleReset}
            title="Reset Terminal"
            className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-[#27272a] rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {activeTab === 'terminal' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#27272a]">
          {/* Left panel: OOP Controller Input */}
          <div className="lg:col-span-5 p-5 space-y-4 bg-[#121316]">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                Interactive Scanner Controller
              </div>
              <p className="text-xs text-zinc-400">
                Mutate product properties through Java encapsulation methods to see instant valuation calculations.
              </p>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Product Name (<span className="text-zinc-400 font-mono">String</span>)
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-mono bg-[#0c0d0e] border border-[#27272a] rounded text-zinc-200 focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Price (<span className="text-zinc-400 font-mono">double</span>)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1.5 text-xs text-zinc-400 font-mono">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={inputPrice}
                      onChange={(e) => setInputPrice(e.target.value)}
                      className="w-full pl-6 pr-2 py-1.5 text-xs font-mono bg-[#0c0d0e] border border-[#27272a] rounded text-zinc-200 focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Stock (<span className="text-zinc-400 font-mono">int</span>)
                  </label>
                  <input
                    type="number"
                    value={inputStock}
                    onChange={(e) => setInputStock(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-mono bg-[#0c0d0e] border border-[#27272a] rounded text-zinc-200 focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg bg-[#f59e0b] text-black hover:bg-[#d97706] transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Instantiate / Mutate via Setters
              </button>
            </form>

            <div className="pt-3 border-t border-[#27272a] space-y-2">
              <label className="block text-xs font-medium text-zinc-300">
                Dynamic Discount Algorithm (<span className="text-zinc-400 font-mono">%</span>)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={inputDiscount}
                  onChange={(e) => setInputDiscount(e.target.value)}
                  className="w-24 px-3 py-1.5 text-xs font-mono bg-[#0c0d0e] border border-[#27272a] rounded text-zinc-200 focus:outline-none focus:border-[#f59e0b]"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-medium rounded bg-[#27272a] text-zinc-200 hover:bg-[#3f3f46] hover:text-white transition-colors"
                >
                  <Tag className="w-3 h-3 text-[#f59e0b]" />
                  applyDiscount()
                </button>
              </div>
            </div>

            {/* Quick Live OOP State Card */}
            <div className="p-3 bg-[#0c0d0e] border border-[#27272a] rounded-lg text-xs space-y-1.5 font-mono">
              <div className="text-zinc-400 flex items-center justify-between">
                <span>OOP State Memory:</span>
                <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3 h-3" /> Encapsulated
                </span>
              </div>
              <div className="text-zinc-200">
                product.totalValuation = <span className="text-[#f59e0b] font-semibold">${totalInventoryValuation.toFixed(2)}</span>
              </div>
              <div className="text-zinc-400">
                discountedUnit = ${discountedUnit.toFixed(2)} ({product.discountPercentage}% off)
              </div>
            </div>
          </div>

          {/* Right panel: Terminal Output Stream */}
          <div className="lg:col-span-7 p-4 bg-[#0a0a0c] font-mono text-xs flex flex-col justify-between min-h-[300px]">
            <div className="space-y-1.5 overflow-y-auto max-h-[280px] pr-2">
              <div className="text-zinc-400 text-[11px] mb-2">
                // Scanner input listener active. Output piped from Java standard output (System.out):
              </div>
              {logs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">
                  {log.type === 'cmd' && (
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <span className="text-zinc-400">&gt;</span> {log.text}
                    </span>
                  )}
                  {log.type === 'output' && <span className="text-zinc-300">{log.text}</span>}
                  {log.type === 'success' && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 shrink-0" /> {log.text}
                    </span>
                  )}
                  {log.type === 'error' && (
                    <span className="text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" /> {log.text}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#27272a] flex items-center justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Process 12894 listening
              </span>
              <span>UST CICS Java Laboratory</span>
            </div>
          </div>
        </div>
      ) : (
        /* Java Code View */
        <div className="p-4 bg-[#0a0a0c] font-mono text-xs overflow-x-auto max-h-[360px] text-zinc-300">
          <div className="flex items-center justify-between text-zinc-400 mb-3 pb-2 border-b border-[#27272a]">
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#f59e0b]" />
              src/com/ust/inventory/Product.java
            </span>
            <span className="text-[11px]">Java 21 · Encapsulation & OOP</span>
          </div>
          <pre className="text-xs leading-relaxed">
            {`package com.ust.inventory;

/**
 * Product entity showcasing OOP encapsulation, defensive validation,
 * and mathematical inventory valuation.
 */
public class Product {
    private String name;
    private double price;
    private int stockQuantity;

    public Product(String name, double price, int stockQuantity) {
        this.name = name;
        this.setPrice(price);
        this.setStockQuantity(stockQuantity);
    }

    public double calculateTotalValue() {
        return this.price * this.stockQuantity;
    }

    public double applyDiscount(double percentage) {
        if (percentage < 0 || percentage > 100) {
            throw new IllegalArgumentException("Discount must be between 0% and 100%");
        }
        double discountAmount = this.price * (percentage / 100.0);
        return this.price - discountAmount;
    }

    // Defensive setters
    public void setPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("Price cannot be negative: " + price);
        }
        this.price = price;
    }

    public void setStockQuantity(int qty) {
        if (qty < 0) {
            throw new IllegalArgumentException("Stock cannot be negative: " + qty);
        }
        this.stockQuantity = qty;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }
    public int getStockQuantity() { return stockQuantity; }
}`}
          </pre>
        </div>
      )}
    </div>
  );
};
