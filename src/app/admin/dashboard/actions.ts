'use server';
/**
 * @fileOverview This file contains server actions for the admin dashboard, including an AI-powered sales insight generator.
 */

import { generateSalesInsightsFlow, type GenerateSalesInsightsInput } from "@/ai/flows/sales-insights-generator";

export async function generateSalesInsights(input: GenerateSalesInsightsInput) {
    try {
        const result = await generateSalesInsightsFlow(input);
        return { success: true, insights: result.insights };
    } catch (error) {
        console.error("AI sales insight generation failed:", error);
        return { success: false, error: "An error occurred while generating insights." };
    }
}
