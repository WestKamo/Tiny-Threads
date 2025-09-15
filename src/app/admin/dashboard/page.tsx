// src/app/admin/dashboard/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Cell } from 'recharts';

const monthlySalesData = [
  { month: 'Jan', sales: 65, revenue: 2400 },
  { month: 'Feb', sales: 59, revenue: 2210 },
  { month: 'Mar', sales: 80, revenue: 2290 },
  { month: 'Apr', sales: 81, revenue: 2000 },
  { month: 'May', sales: 56, revenue: 2181 },
  { month: 'Jun', sales: 55, revenue: 2500 },
];

const categoryData = [
    { name: 'Onesies', value: 400 },
    { name: 'Dresses', value: 300 },
    { name: 'Shoes', value: 300 },
    { name: 'Shirts', value: 200 },
    { name: 'Pants', value: 278 },
];

const COLORS = ['#A0D2EB', '#E5E5E5', '#FAE0C3', '#F8F8F8', '#8884d8'];

export default function AdminDashboardPage() {
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
                        <p className="text-4xl font-bold">R13,581</p>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>

                {/* Units Sold */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <BarChart className="h-5 w-5" />
                            Units Sold
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">+396</p>
                        <p className="text-xs text-muted-foreground">+12.2% from last month</p>
                    </CardContent>
                </Card>

                 {/* Active Listings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <PieChart className="h-5 w-5" />
                            Active Listings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">573</p>
                        <p className="text-xs text-muted-foreground">+21 since last hour</p>
                    </CardContent>
                </Card>
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Sales and Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart data={monthlySalesData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" name="Units Sold" />
                                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" name="Revenue (R)" />
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader>
                        <CardTitle>Sales by Category</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                     {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                     <CardHeader>
                        <CardTitle>Top Selling Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Mock data for top selling products */}
                        <ul className="space-y-4">
                            <li className="flex justify-between"><span>Cozy Blue Onesie</span><span>120 sold</span></li>
                            <li className="flex justify-between"><span>Pink Floral Dress</span><span>98 sold</span></li>
                            <li className="flex justify-between"><span>Everyday Joggers</span><span>85 sold</span></li>
                            <li className="flex justify-between"><span>First Steps Sneakers</span><span>72 sold</span></li>
                            <li className="flex justify-between"><span>Teddy Bear Tee</span><span>65 sold</span></li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
