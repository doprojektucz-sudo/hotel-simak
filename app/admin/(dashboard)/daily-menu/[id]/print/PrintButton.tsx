"use client";

import Link from "next/link";

export function PrintButton() {
    return (
        <>
            <style>{`
        .back-link {
          position: fixed;
          bottom: 20px;
          left: 20px;
          color: #6b7280;
          text-decoration: none;
          font-size: 14px;
        }
        
        .back-link:hover {
          color: #1f2937;
        }
        
        .print-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #b91c1c;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .print-button:hover {
          background: #991b1b;
        }
        
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>

            <Link href="/admin/daily-menu" className="back-link no-print">
                ← Zpět do administrace
            </Link>

            <button
                className="print-button no-print"
                onClick={() => window.print()}
            >
                🖨️ Vytisknout
            </button>
        </>
    );
}