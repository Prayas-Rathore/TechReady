import { Clock, ShoppingCart } from 'lucide-react';
import { OneTimePurchase } from '../../data/pricingData';

interface OneTimePurchasesProps {
  purchases: OneTimePurchase[];
  onPurchase: (purchase: OneTimePurchase) => void;
}

export default function OneTimePurchases({ purchases, onPurchase }: OneTimePurchasesProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          À La Carte Services
        </h2>
        <p className="text-slate-600">No subscription needed - pay once, own forever</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {purchases.map((purchase, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-200 p-6 flex flex-col"
          >
            <div className="text-5xl mb-4 text-center">{purchase.icon}</div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 text-center">
              {purchase.name}
            </h3>

            <p className="text-sm text-slate-600 mb-4 text-center flex-grow">
              {purchase.description}
            </p>

            <div className="flex items-center justify-center gap-2 mb-4 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>{purchase.deliveryTime}</span>
            </div>

            <div className="text-center mb-4">
              {purchase.originalPrice && (
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-lg text-slate-400 line-through">
                    ${purchase.originalPrice}
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                    SAVE ${purchase.originalPrice - purchase.price}
                  </span>
                </div>
              )}
              <div className="text-3xl font-bold text-slate-900">
                ${purchase.price}
              </div>
            </div>

            <button
              onClick={() => onPurchase(purchase)}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Buy Now</span>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
        <p className="text-sm text-slate-700">
          💡 <span className="font-semibold">Tip:</span> Save more with a subscription! Premium members get 50% off all à la carte services.
        </p>
      </div>
    </div>
  );
}
