import { useWeb3React } from '@web3-react/core';
import { Button } from "@/components/ui/button";
import { injected } from '@/lib/connectors';
import { Card, CardContent } from "@/components/ui/card";

export function ConnectionStatus() {
  const { active, account, activate, deactivate } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="text-sm">
            {active ? (
              <div className="text-green-500">Connected</div>
            ) : (
              <div className="text-yellow-500">Not Connected</div>
            )}
          </div>
          {account && (
            <div className="text-sm break-all">
              <span className="text-muted-foreground">Account:</span> {account}
            </div>
          )}
          <Button
            onClick={active ? deactivate : connect}
            variant={active ? "destructive" : "default"}
            className="w-full"
          >
            {active ? 'Disconnect Wallet' : 'Connect Wallet'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}