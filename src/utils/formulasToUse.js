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

export function calculateBonusEquipmentSales (equipmentSales) {
    let comisionRate = 0;

    if (equipmentSales > 0 && equipmentSales <= 250000) {
        comisionRate = 0.0025;
    } else if (equipmentSales > 250000 && equipmentSales <= 300000) {
        comisionRate = 0.005;
    } else if (equipmentSales > 300000 && equipmentSales <= 350000) {
        comisionRate = 0.015;
    } else if (equipmentSales > 350000 && equipmentSales <= 450000) {
        comisionRate = 0.02;
    } else if (equipmentSales > 450000 && equipmentSales <= 750000) {
        comisionRate = 0.025;
    } else if (equipmentSales > 750000 && equipmentSales <= 1000000) {
        comisionRate = 0.04;
    }

    const equipmentSalesBonus = equipmentSales * comisionRate;

    return equipmentSalesBonus;
}