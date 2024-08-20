export function baseCommission(region, equipmentSales, servicesSales) {
    let commissionRate;

    switch (region) {
        case 'Norte':
            commissionRate = 0.02;
            break;
        case 'Sur':
            commissionRate = 0.025;
            break;
        default:
            throw new Error('Región no válida');
    }
    
    const totalSales = equipmentSales + servicesSales;
    
    const comision = totalSales * commissionRate;

    return comision;
}

export function calculateBonusServicesSales(actualSales, salesMonth1, salesMonth2, salesMonth3) {
    const averageSales = (salesMonth1 + salesMonth2 + salesMonth3) / 3;
    const salesPercentage = (actualSales / averageSales * 100);
    
    let servicesSalesBonus = 0;

    if (salesPercentage >= 101 && salesPercentage <= 109) {
        servicesSalesBonus = 200;        
    } else if (salesPercentage >= 110 && salesPercentage <= 119) { 
        servicesSalesBonus = 250;
    } else if (salesPercentage >= 120) {
        servicesSalesBonus = 275;
    }

    return servicesSalesBonus;    
}

export function calculateBonusEquipmentSales(equipmentSales) {
    const levels = [
        { max: 250000, rate: 0.0025 },
        { max: 300000, rate: 0.005 },
        { max: 350000, rate: 0.015 },
        { max: 450000, rate: 0.02 },
        { max: 750000, rate: 0.025 },
        { max: 1000000, rate: 0.04 },
    ];

    let remainingSales = equipmentSales;
    let bonus = 0;
    let currentLevel = 0;

    for (const level of levels) {
        if (remainingSales > 0) {
            const salesInLevel = Math.min(remainingSales, level.max - (bonus > 0 ? levels[levels.indexOf(level) - 1]?.max || 0 : 0));
            bonus += salesInLevel * level.rate;
            remainingSales -= salesInLevel;
            currentLevel = levels.indexOf(level) + 1;
        } else {
            break;
        }
    }

    return { 
        equipmentBonus: bonus, 
        level: currentLevel
    };
}