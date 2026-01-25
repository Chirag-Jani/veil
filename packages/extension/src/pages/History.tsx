import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  Copy,
  ExternalLink,
  Shield,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAllTransactions,
  formatTransactionAmount,
  formatTransactionDate,
  type Transaction,
  type TransactionType,
} from "../utils/transactionHistory";
import { formatAddress } from "../utils/storage";

const History = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<TransactionType | "all">("all");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Load transactions function defined inside effect
    const loadTransactions = async () => {
      try {
        const allTxs = await getAllTransactions();
        setTransactions(allTxs);
      } catch (error) {
        console.error("[History] Error loading transactions:", error);
      }
    };

    // Defer initial load to next tick to avoid synchronous setState in effect
    const initialTimeout = setTimeout(loadTransactions, 0);
    // Refresh every 5 seconds
    const interval = setInterval(loadTransactions, 5000);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((tx) => tx.type === filter);

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case "deposit":
        return <Shield className="w-3.5 h-3.5 text-purple-400" />;
      case "withdraw":
        return <ArrowUp className="w-3.5 h-3.5 text-blue-400" />;
      case "transfer":
        return <ArrowRight className="w-3.5 h-3.5 text-green-400" />;
      case "incoming":
        return <ArrowDown className="w-3.5 h-3.5 text-yellow-400" />;
    }
  };

  const getTransactionLabel = (type: TransactionType) => {
    switch (type) {
      case "deposit":
        return "Deposit to Privacy";
      case "withdraw":
        return "Withdraw from Privacy";
      case "transfer":
        return "Transfer";
      case "incoming":
        return "Incoming SOL";
    }
  };

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "confirmed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "failed":
        return "text-red-400";
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openExplorer = (signature: string) => {
    window.open(
      `https://solscan.io/tx/${signature}`,
      "_blank"
    );
  };

  return (
    <div className="h-full w-full bg-black text-white p-2.5 relative flex flex-col font-sans">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-gray-400" />
        </button>
        <h1 className="text-base font-bold">Activity</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {(["all", "deposit", "withdraw", "transfer", "incoming"] as const).map(
          (filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors ${
                filter === filterType
                  ? "bg-white/10 text-white border border-white/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {filterType === "all"
                ? "All"
                : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto">
        {filteredTransactions.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">No transactions yet</p>
              <p className="text-gray-600 text-xs">
                Your transaction history will appear here
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            {filteredTransactions.map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedTx(tx)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      {getTransactionIcon(tx.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-xs font-medium text-white">
                          {getTransactionLabel(tx.type)}
                        </span>
                        <span
                          className={`text-[10px] font-medium ${getStatusColor(
                            tx.status
                          )}`}
                        >
                          {tx.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                        <span>{formatTransactionDate(tx.timestamp)}</span>
                        {tx.walletIndex !== undefined && (
                          <>
                            <span>•</span>
                            <span>W{tx.walletIndex + 1}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-semibold text-white">
                      {tx.type === "withdraw" || tx.type === "transfer"
                        ? "-"
                        : "+"}
                      {formatTransactionAmount(tx.amount)} SOL
                    </div>
                    {tx.privateBalanceAfter !== undefined && (
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        P: {formatTransactionAmount(tx.privateBalanceAfter)}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      <AnimatePresence>
        {selectedTx && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTx(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-2xl z-50 border-t border-white/10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 bg-white/20 rounded-full" />
              </div>

              <div className="px-4 pb-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      {getTransactionIcon(selectedTx.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {getTransactionLabel(selectedTx.type)}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {formatTransactionDate(selectedTx.timestamp)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTx(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Amount */}
                <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-500 mb-1">Amount</div>
                  <div className="text-2xl font-bold text-white">
                    {selectedTx.type === "withdraw" || selectedTx.type === "transfer"
                      ? "-"
                      : "+"}
                    {formatTransactionAmount(selectedTx.amount)} SOL
                  </div>
                </div>

                {/* Status */}
                <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Status</span>
                    <span
                      className={`text-sm font-semibold ${getStatusColor(
                        selectedTx.status
                      )}`}
                    >
                      {selectedTx.status.toUpperCase()}
                    </span>
                  </div>
                  {selectedTx.error && (
                    <div className="mt-2 text-xs text-red-400">
                      {selectedTx.error}
                    </div>
                  )}
                </div>

                {/* Addresses */}
                {selectedTx.fromAddress && (
                  <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-gray-500 mb-2">From</div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-mono text-gray-300 break-all">
                        {formatAddress(selectedTx.fromAddress, 6)}
                      </span>
                      <button
                        onClick={() => handleCopy(selectedTx.fromAddress!, selectedTx.id + "-from")}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors shrink-0"
                      >
                        {copiedId === selectedTx.id + "-from" ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {selectedTx.toAddress && (
                  <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-gray-500 mb-2">To</div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-mono text-gray-300 break-all">
                        {formatAddress(selectedTx.toAddress, 6)}
                      </span>
                      <button
                        onClick={() => handleCopy(selectedTx.toAddress!, selectedTx.id + "-to")}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors shrink-0"
                      >
                        {copiedId === selectedTx.id + "-to" ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Signature */}
                {selectedTx.signature && (
                  <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-gray-500 mb-2">Transaction Signature</div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-gray-300 break-all">
                        {formatAddress(selectedTx.signature, 8)}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleCopy(selectedTx.signature!, selectedTx.id + "-sig")}
                          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          {copiedId === selectedTx.id + "-sig" ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => openExplorer(selectedTx.signature!)}
                          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Private Balance Info */}
                {(selectedTx.privateBalanceBefore !== undefined ||
                  selectedTx.privateBalanceAfter !== undefined) && (
                  <div className="mb-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <div className="text-xs text-purple-400 font-medium mb-2">
                      Privacy Cash Balance
                    </div>
                    {selectedTx.privateBalanceBefore !== undefined && (
                      <div className="text-xs text-gray-400 mb-1">
                        Before: {formatTransactionAmount(selectedTx.privateBalanceBefore)} SOL
                      </div>
                    )}
                    {selectedTx.privateBalanceAfter !== undefined && (
                      <div className="text-xs text-white font-medium">
                        After: {formatTransactionAmount(selectedTx.privateBalanceAfter)} SOL
                      </div>
                    )}
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setSelectedTx(null)}
                  className="w-full py-3 px-4 font-medium rounded-xl text-sm border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default History;
