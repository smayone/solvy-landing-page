import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Hash, Link, CheckCircle2 } from "lucide-react";

interface Block {
  id: number;
  data: string;
  hash: string;
  previousHash: string;
  timestamp: number;
}

export function BlockchainDemo() {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: 0,
      data: "Genesis Block",
      hash: "0000",
      previousHash: "0000",
      timestamp: Date.now(),
    },
  ]);
  const [newBlockData, setNewBlockData] = useState("");

  // Simple hash function for demo purposes
  const calculateHash = (id: number, data: string, previousHash: string) => {
    return window.btoa(id + data + previousHash).slice(0, 8);
  };

  const addBlock = () => {
    if (!newBlockData.trim()) return;

    const previousBlock = blocks[blocks.length - 1];
    const newBlock = {
      id: previousBlock.id + 1,
      data: newBlockData,
      previousHash: previousBlock.hash,
      timestamp: Date.now(),
      hash: "",
    };
    
    // Calculate hash after setting all other properties
    newBlock.hash = calculateHash(newBlock.id, newBlock.data, newBlock.previousHash);
    
    setBlocks([...blocks, newBlock]);
    setNewBlockData("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Interactive Blockchain Demo</h3>
        <p className="text-sm text-muted-foreground">
          Add blocks to see how blockchain works. Each block contains data and is linked to the previous block through its hash.
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Enter block data..."
          value={newBlockData}
          onChange={(e) => setNewBlockData(e.target.value)}
          className="flex-1"
        />
        <Button onClick={addBlock} disabled={!newBlockData.trim()}>
          Add Block
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {blocks.map((block, index) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Block #{block.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(block.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-end">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium">Data:</p>
                    <p className="text-sm text-muted-foreground break-all">
                      {block.data}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      <p className="text-xs font-mono">{block.hash}</p>
                    </div>
                    {index > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <Link className="h-4 w-4" />
                        <p className="text-xs font-mono text-muted-foreground">
                          Previous: {block.previousHash}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
