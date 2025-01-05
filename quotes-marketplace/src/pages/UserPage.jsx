import{ useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UserPage = ({ onQuoteAdded }) => {
  const [newQuote, setNewQuote] = useState({
    quote: "",
    author: "",
    year: "",
    price: 0,
    created_by: 1, // Assuming user ID 1 for demo
  });
  const [error, setError] = useState("");

  const handleAddQuote = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/quotes", newQuote);
      alert("Quote added successfully!");
      setNewQuote({ quote: "", author: "", year: "", price: 0, created_by: 1 });
      if (onQuoteAdded) onQuoteAdded(); // Trigger refresh in HomePage
    } catch (err) {
      console.error("Add Quote Error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to add quote.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Add Your Quote</h1>
          <p className="text-lg text-muted-foreground">
            Share your favorite quotes with the world!
          </p>
        </div>

        {/* Add Quote Form */}
        <Card className="w-full p-6">
          <CardHeader>
            <CardTitle>Add New Quote</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddQuote} className="space-y-4">
              <Input
                placeholder="Quote"
                value={newQuote.quote}
                onChange={(e) => setNewQuote({ ...newQuote, quote: e.target.value })}
                required
              />
              <Input
                placeholder="Author"
                value={newQuote.author}
                onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="Year"
                value={newQuote.year}
                onChange={(e) => setNewQuote({ ...newQuote, year: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="Price (0 for free)"
                value={newQuote.price}
                onChange={(e) => setNewQuote({ ...newQuote, price: Number(e.target.value) })}
                required
              />
              <Button type="submit" className="w-full">
                Add Quote
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            {error && (
              <Alert>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserPage;
