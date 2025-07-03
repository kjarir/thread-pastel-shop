
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock } from 'lucide-react';

interface DummyPaymentGatewayProps {
  total: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const DummyPaymentGateway = ({ total, onSuccess, onCancel }: DummyPaymentGatewayProps) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Payment Gateway</span>
          <Lock className="h-4 w-4 text-green-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-2xl font-bold text-rose-600">₹{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="cardHolder">Card Holder Name</Label>
            <Input
              id="cardHolder"
              placeholder="John Doe"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                maxLength={5}
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={3}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handlePayment}
            disabled={isProcessing || !cardNumber || !expiryDate || !cvv || !cardHolder}
          >
            {isProcessing ? 'Processing Payment...' : `Pay ₹${total.toFixed(2)}`}
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onCancel}
            disabled={isProcessing}
          >
            Cancel
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          <p>🔒 This is a demo payment gateway. No real payment will be processed.</p>
          <p>Use any test card details to proceed.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DummyPaymentGateway;
