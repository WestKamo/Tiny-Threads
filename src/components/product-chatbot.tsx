
'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Bot, Loader2, Send, Sparkles, User } from 'lucide-react';
import type { Product } from '@/lib/types';
import { answerProductQuestion } from '@/ai/flows/product-chatbot';
import { ScrollArea } from './ui/scroll-area';

interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

export function ProductChatbot({ product }: { product: Product }) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isGenerating, startTransition] = useTransition();

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        startTransition(async () => {
            const productDataForAI = {
                name: product.name,
                category: product.category,
                description: product.description,
                price: product.price,
                color: product.color,
                material: product.material,
                style: product.style,
                ageGroup: product.ageGroup,
                gender: product.gender,
                additionalFeatures: product.additionalFeatures,
            };

            const result = await answerProductQuestion({ product: productDataForAI, question: input });
            const botMessage: ChatMessage = { sender: 'bot', text: result.answer };
            setMessages(prev => [...prev, botMessage]);
        });
    };

    return (
        <Card className="flex flex-col h-full max-h-[500px]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Product Helper
                </CardTitle>
                <CardDescription>Ask me anything about the {product.name}!</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
                <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                                {message.sender === 'bot' && <div className="p-2 bg-primary rounded-full text-primary-foreground"><Bot className="h-5 w-5" /></div>}
                                <div className={`p-3 rounded-lg max-w-[80%] ${message.sender === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                    <p className="text-sm">{message.text}</p>
                                </div>
                                {message.sender === 'user' && <div className="p-2 bg-accent rounded-full text-accent-foreground"><User className="h-5 w-5" /></div>}
                            </div>
                        ))}
                         {isGenerating && (
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-primary rounded-full text-primary-foreground"><Bot className="h-5 w-5" /></div>
                                <div className="p-3 rounded-lg bg-muted text-muted-foreground flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                    <span>Thinking...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t pt-4">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., Is it machine washable?"
                        disabled={isGenerating}
                    />
                    <Button type="submit" size="icon" disabled={isGenerating}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
