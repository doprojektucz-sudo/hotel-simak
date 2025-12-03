import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { dishTypes } from "@/lib/constants/daily-menu";
import { PrintButton } from "./PrintButton";

interface PrintMenuPageProps {
    params: Promise<{ id: string }>;
}

export default async function PrintMenuPage({ params }: PrintMenuPageProps) {
    const { id } = await params;

    const menu = await prisma.dailyMenu.findUnique({
        where: { id },
        include: {
            items: {
                include: { dish: true },
                orderBy: { sortOrder: "asc" },
            },
        },
    });

    if (!menu) {
        notFound();
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("cs-CZ", {
            weekday: "long",
            day: "numeric",
            month: "long",
        });
    };

    const getDishesByType = () => {
        return dishTypes
            .map((type) => ({
                ...type,
                dishes: menu.items
                    .filter((item) => item.dish.type === type.value)
                    .map((item) => item.dish),
            }))
            .filter((type) => type.dishes.length > 0);
    };

    const isSingleDay =
        menu.validFrom.toDateString() === menu.validTo.toDateString();

    return (
        <div className="print-page">
            <style>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
        }
        
        .print-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: white;
          color: #1f2937;
          line-height: 1.5;
          min-height: 100vh;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #b91c1c;
        }
        
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #b91c1c;
          margin-bottom: 5px;
        }
        
        .subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 15px;
        }
        
        .menu-title {
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 5px;
        }
        
        .menu-date {
          font-size: 16px;
          color: #4b5563;
        }
        
        .category {
          margin-bottom: 25px;
        }
        
        .category-title {
          font-size: 14px;
          font-weight: 600;
          color: #b91c1c;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .dish {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 8px 0;
          border-bottom: 1px dotted #e5e7eb;
        }
        
        .dish:last-child {
          border-bottom: none;
        }
        
        .dish-info {
          flex: 1;
          padding-right: 20px;
        }
        
        .dish-weight {
          font-weight: bold;
          margin-right: 8px;
        }
        
        .dish-name {
          color: #1f2937;
        }
        
        .dish-price {
          font-weight: bold;
          white-space: nowrap;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          font-size: 12px;
          color: #6b7280;
        }
      `}</style>

            <div className="container">
                <div className="header">
                    <div className="logo">Restaurace a Hotel U Šimáka</div>
                    <div className="subtitle">Radostín</div>
                    <div className="menu-title">{menu.title || "Denní menu"}</div>
                    <div className="menu-date">
                        {isSingleDay
                            ? formatDate(menu.validFrom)
                            : `${formatDate(menu.validFrom)} – ${formatDate(menu.validTo)}`}
                    </div>
                </div>

                {getDishesByType().map((type) => (
                    <div key={type.value} className="category">
                        <div className="category-title">{type.label}</div>
                        {type.dishes.map((dish) => (
                            <div key={dish.id} className="dish">
                                <div className="dish-info">
                                    {dish.weight && (
                                        <span className="dish-weight">{dish.weight}</span>
                                    )}
                                    <span className="dish-name">{dish.name}</span>
                                </div>
                                <div className="dish-price">{dish.price},- Kč</div>
                            </div>
                        ))}
                    </div>
                ))}

                <div className="footer">
                    <p>Přejeme dobrou chuť!</p>
                    <p style={{ marginTop: "5px" }}>
                        Tel: 728 490 498 | usimaka.cz
                    </p>
                </div>
            </div>

            <PrintButton />
        </div>
    );
}