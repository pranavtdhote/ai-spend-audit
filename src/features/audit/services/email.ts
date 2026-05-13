import type { AuditResult } from '../engine/types';

/**
 * MOCK EMAIL SERVICE (Resend Integration Architecture)
 * 
 * In a real Vercel environment, this would run inside a Serverless Function (e.g., /api/email)
 * using the official `resend` Node.js SDK to securely hide the API key.
 */

export interface LeadCaptureData {
  email: string;
  companyName: string;
  role: string;
}

export async function sendAuditSummaryEmail(lead: LeadCaptureData, result: AuditResult, shareUrl: string) {
  console.log('[MOCK RESEND API] Sending email to:', lead.email);
  
  const payload = {
    from: 'NeuralCost Insights <audit@neuralcost.com>',
    to: [lead.email],
    subject: `Your AI Spend Audit: $${result.totalPotentialAnnualSavings} in potential savings`,
    html: `
      <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
        <h2>Hi ${lead.role} at ${lead.companyName},</h2>
        <p>Your team is currently spending <strong>$${result.totalMonthlyCost}/mo</strong> on AI tools.</p>
        <p>Our audit engine identified <strong>$${result.totalPotentialMonthlySavings}/mo</strong> in redundant subscriptions and overprovisioned plans.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Executive Summary</h3>
          <p>${result.aiSummary || 'Your stack contains overlapping capabilities that can be consolidated.'}</p>
        </div>

        <a href="${shareUrl}" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          View Full Interactive Report
        </a>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
        
        <h3>Ready to execute these savings?</h3>
        <p>Book a free 30-minute consultation with our cost engineering team.</p>
        <a href="https://cal.com/neuralcost">Schedule Consultation</a>
      </div>
    `,
  };

  // MOCK: await resend.emails.send(payload);
  return { success: true, messageId: `mock-id-${Date.now()}` };
}
