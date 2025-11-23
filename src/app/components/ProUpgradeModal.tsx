"use client";

import { X, Crown, Check, Zap } from 'lucide-react';
import { useState } from 'react';

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDistance: number;
  onUpgrade: () => void;
}

export default function ProUpgradeModal({ isOpen, onClose, currentDistance, onUpgrade }: ProUpgradeModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setLoading(true);
    await onUpgrade();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden">
        {/* Header com gradiente */}
        <div className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-black/20 hover:bg-black/40 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Upgrade para Pro</h2>
              <p className="text-white/80 text-sm">Desbloqueie todo o potencial do RUNX</p>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {/* Progresso */}
          <div className="mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Teste Gratuito</span>
              <span className="text-sm font-bold text-cyan-400">
                {currentDistance.toFixed(2)} / 10 km
              </span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 transition-all duration-500"
                style={{ width: `${Math.min((currentDistance / 10) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Você completou seu teste gratuito! 🎉
            </p>
          </div>

          {/* Benefícios */}
          <div className="space-y-3 mb-6">
            <h3 className="text-lg font-bold text-white mb-3">Benefícios do Plano Pro:</h3>
            
            {[
              'Corridas ilimitadas sem restrições',
              'Conquiste territórios sem limites',
              'Acesso a missões especiais exclusivas',
              'Estatísticas avançadas e relatórios',
              'Notificações em tempo real de invasões',
              'Suporte prioritário',
              'Badges e conquistas exclusivas',
              'Sem anúncios',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Preço */}
          <div className="mb-6 p-6 rounded-xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-4xl font-bold text-white">R$ 19,90</span>
            </div>
            <p className="text-gray-400 text-sm">por mês</p>
            <p className="text-xs text-gray-500 mt-2">Cancele quando quiser</p>
          </div>

          {/* Botões */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all"
            >
              Agora não
            </button>
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold transition-all shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processando...
                </span>
              ) : (
                'Assinar Agora'
              )}
            </button>
          </div>

          {/* Nota */}
          <p className="text-xs text-center text-gray-500 mt-4">
            💳 Pagamento seguro via Stripe • 🔒 Dados protegidos
          </p>
        </div>
      </div>
    </div>
  );
}
