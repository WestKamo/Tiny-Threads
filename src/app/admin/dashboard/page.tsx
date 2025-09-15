// src/app/admin/dashboard/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Loader2, WandSparkles, AlertCircle } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Cell } from 'recharts';
import { useEffect, useState, useTransition } from "react";
import { getApprovedProducts } from "@/lib/firestore-helper";
import type { Product } from "@/lib/types";
import { generateSalesInsights } from "./actions";

const COLORS = ['#A0D2EB', '#E5E5E5', '#FAE0C3', '#F8F8F8', '#8884d8'];

export default function AdminDashboardPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [insights, setInsights] = useState<string | null>(null);
    const [isGeneratingInsights, startInsightGeneration] = useTransition();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const approvedProducts = await getApprovedProducts();
            setProducts(approvedProducts);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleGenerateInsights = () => {
        startInsightGeneration(async () => {
            const result = await generateSalesInsights({ products });
            if (result.success) {
                setInsights(result.insights);
            } else {
                 setInsights("Could not generate insights. " + result.error);
            }
        });
    }

    const totalRevenue = products.reduce((sum, product) => sum + product.price, 0);
    const unitsSold = products.length; // Assuming each product listed is "sold" for this demo

    const categoryData = products.reduce((acc, product) => {
        const existingCategory = acc.find(item => item.name === product.category);
        if (existingCategory) {
            existingCategory.value += 1;
        } else {
            acc.push({ name: product.category, value: 1 });
        }
        return acc;
    }, [] as { name: string, value: number }[]);

     if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }


    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Total Revenue */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <LineChart className="h-5 w-5" />
                            Total Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">R{totalRevenue.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">From all approved products</p>
                    </CardContent>
                </Card>

                {/* Units Sold */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <BarChart className="h-5 w-5" />
                            Approved Products
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{unitsSold}</p>
                        <p className="text-xs text-muted-foreground">Currently listed for sale</p>
                    </CardContent>
                </Card>

                 {/* Active Listings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <PieChart className="h-5 w-5" />
                            Product Categories
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{categoryData.length}</p>
                        <p className="text-xs text-muted-foreground">Unique categories listed</p>
                    </CardContent>
                </Card>
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
                <Card className="lg:col-span-3">
                     <CardHeader>
                        <CardTitle>Sales by Category</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={categoryData}>
                                 <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" name="Products">
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-2">
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <WandSparkles className="text-primary" />
                            AI-Powered Insights
                        </CardTitle>
                        <CardDescription>
                            Click the button to generate sales insights from your current product data.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleGenerateInsights} disabled={isGeneratingInsights} className="w-full">
                            {isGeneratingInsights ? <><Loader2 className="animate-spin mr-2"/>Generating...</> : 'Generate Sales Insights'}
                        </Button>

                         {isGeneratingInsights && (
                             <div className="mt-4 space-y-2">
                                <div className="animate-pulse h-4 bg-slate-200 rounded w-full"></div>
                                <div className="animate-pulse h-4 bg-slate-200 rounded w-5/6"></div>
                                <div className="animate-pulse h-4 bg-slate-200 rounded w-3/4"></div>
                            </div>
                         )}

                        {insights && !isGeneratingInsights && (
                            <div className="mt-4 p-4 bg-accent/50 rounded-lg">
                                <p className="text-sm text-accent-foreground whitespace-pre-wrap">{insights}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
