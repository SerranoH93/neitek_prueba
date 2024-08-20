import React, {useEffect, useState} from 'react';
import { commissionData } from '../utils/commissionData';

const FullCommissionTable = () => {
    const { salesLevels, salesCommissionRates, equipmentSalesLevels } = commissionData;

    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        // Leer datos del localStorage
        const data = localStorage.getItem('reportData');
        if (data) {
            setReportData(JSON.parse(data));
        }
    }, []);

    if (!reportData) {
        return <div>Cargando...</div>;
    }

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let formattedDate = `${day}/${month}/${year}`;

    const { 
        name, 
        serviceSales, 
        equipmentSales, 
        totalSales, 
        totalSalesMonth, 
        avgSales, 
        baseCommissionSales, 
        equipmentBonus, 
        servicesBonus, 
        totalBonuses, 
        levelEquipment
    } = reportData;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Reporte de comisiones</h1>

            
            <div className="mb-6">
                <p><strong>Fecha:</strong> {formattedDate}</p>
                <p><strong>Mes:</strong> {reportData.month}</p>
                <p><strong>Ventas en {reportData.month}:</strong> ${totalSalesMonth}</p>
                <p><strong>Promedio de ventas (Ultimos 3 meses):</strong> ${avgSales}</p>
            </div>

            <div>
                <p>Vendedor: <strong>{name}</strong></p>
                <p>Desglose de montos a pagar</p>
            </div>

            <h3>Comisión Base mensual</h3>

            <p>Tabulador:</p>
            <table className="min-w-full bg-white mb-6">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4">Regiones</th>
                        <th className="py-3 px-4">% de comisión</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {salesCommissionRates.map((row, index) => (
                        <tr key={index} className="bg-gray-100 border-b border-gray-200">
                            <td className="py-3 px-4">{row.region}</td>
                            <td className="py-3 px-4">{row.rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p>Venta por Sevicios: {serviceSales} </p>
            <p>Venta de Equipos:{equipmentSales}</p>
            <p>Comisión: <strong>{baseCommissionSales}</strong></p>

            <h3>Bono mensual por Servicios</h3>

            <p>Tabulador:</p>            
            <table className="min-w-full bg-white mb-6">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4">Nivel</th>
                        <th className="py-3 px-4">Rangos</th>
                        <th className="py-3 px-4">Monto a pagar</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {salesLevels.map((row, index) => (
                        <tr key={index} className="bg-gray-100 border-b border-gray-200">
                            <td className="py-3 px-4">{row.level}</td>
                            <td className="py-3 px-4">{row.range}</td>
                            <td className="py-3 px-4">{row.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>       

            <p>Ventas promedio (ultimos 3 meses): ${avgSales} </p>
            <p>Venta del mes: ${totalSales} </p>
            <p>Su nivel es: {levelEquipment}</p>
            <p>Comision: <strong>{servicesBonus}</strong></p>


            <h3>Comisión Bono mensual por Equipos</h3>

            <p>Tabulador:</p>
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4">Nivel</th>
                        <th className="py-3 px-4">Rango de ventas ($)</th>
                        <th className="py-3 px-4">Tasa de comisión</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {equipmentSalesLevels.map((row, index) => (
                        <tr key={index} className="bg-gray-100 border-b border-gray-200">
                            <td className="py-3 px-4">{row.level}</td>
                            <td className="py-3 px-4">{row.range}</td>
                            <td className="py-3 px-4">{row.rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p>El total de las ventas del mes: {totalSales}</p>
            <p>Nivel de ventas: {levelEquipment}</p>
            <p>Comision: <strong>{equipmentBonus}</strong></p>


            <p>TOTAL DE COMSIÓN: {totalBonuses} <strong></strong></p>
        </div>
    );
};

export default FullCommissionTable;