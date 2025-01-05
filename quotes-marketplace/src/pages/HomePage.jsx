import { useState } from "react";
import {
  Search,
  BookMarked,
  TrendingUp,
  Clock,
  ArrowUpDown,
  Filter,
  Heart,
  Share2,
  BookmarkPlus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

const QuotesMarketplace = () => {
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Motivation",
      likes: 1234,
      saves: 890,
      isPremium: false,
    },
    {
      id: 2,
      quote: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
      category: "Leadership",
      likes: 956,
      saves: 670,
      isPremium: true,
    },
    {
      id: 3,
      quote: "Stay hungry, stay foolish.",
      author: "Steve Jobs",
      category: "Inspiration",
      likes: 2341,
      saves: 1200,
      isPremium: false,
    },
  ]);

  const [selectedTab, setSelectedTab] = useState("all");
  const [newQuote, setNewQuote] = useState({
    quote: "",
    author: "",
    category: "",
    isPremium: false,
  });

  // Filter quotes based on the selected tab
  const filteredQuotes = quotes.filter((quote) => {
    if (selectedTab === "free") return !quote.isPremium;
    if (selectedTab === "premium") return quote.isPremium;
    return true;
  });

  // Add a new quote
  const handleAddQuote = () => {
    if (!newQuote.quote || !newQuote.author || !newQuote.category) {
      alert("Please fill out all fields.");
      return;
    }
    setQuotes((prevQuotes) => [
      ...prevQuotes,
      {
        ...newQuote,
        id: prevQuotes.length + 1,
        likes: 0,
        saves: 0,
      },
    ]);
    setNewQuote({ quote: "", author: "", category: "", isPremium: false });
  };

  const QuoteCard = ({ quote }) => (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <Badge variant={quote.isPremium ? "default" : "secondary"} className="mb-2">
            {quote.isPremium ? "Premium" : "Free"}
          </Badge>
          <Badge variant="outline">{quote.category}</Badge>
        </div>
        <CardTitle className="text-xl font-serif italic">"{quote.quote}"</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">- {quote.author}</p>
      </CardContent>
      <CardFooter className="justify-between border-t pt-4">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
            <Heart className="h-4 w-4 mr-1" />
            {quote.likes.toLocaleString()}
          </Button>
          <Button variant="ghost" size="sm">
            <BookmarkPlus className="h-4 w-4 mr-1" />
            {quote.saves.toLocaleString()}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Quotes Marketplace</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and collect inspiring quotes from visionary minds around the world
          </p>
        </div>

        {/* Add New Quote */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Add a New Quote</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Quote"
              value={newQuote.quote}
              onChange={(e) => setNewQuote({ ...newQuote, quote: e.target.value })}
            />
            <Input
              placeholder="Author"
              value={newQuote.author}
              onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
            />
            <Input
              placeholder="Category"
              value={newQuote.category}
              onChange={(e) => setNewQuote({ ...newQuote, category: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-4">
            <label>
              <input
                type="checkbox"
                checked={newQuote.isPremium}
                onChange={(e) => setNewQuote({ ...newQuote, isPremium: e.target.checked })}
              />
              <span className="ml-2">Premium</span>
            </label>
            <Button onClick={handleAddQuote}>Add Quote</Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <BookMarked className="h-4 w-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Content */}
        {filteredQuotes.length > 0 ? (
          <ScrollArea className="h-[600px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <Alert>
            <AlertDescription>
              No quotes found. Try adjusting your filters or search terms.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default QuotesMarketplace;
