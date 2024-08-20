import React, { useState } from 'react';
import { baseCommission, calculateBonusServicesSales, calculateBonusEquipmentSales } from '../utils/formulasToUse';

const SalesReport = () => {
    const [formData, setFormData] = useState({
        serviceSales: '',
        equipmentSales: '',
        region: 'Norte',
        selectedMonth: 'Enero',
    });

    const [salesHistory, setSalesHistory] = useState([]);
    const [averageSales, setAverageSales] = useState(0);
    const [totalBonuses, setTotalBonuses] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddSales = () => {
        const serviceSales = parseFloat(formData.serviceSales);
        const equipmentSales = parseFloat(formData.equipmentSales);
        const region = formData.region;

        // Calcula la comisión base
        const comisionBase = baseCommission(region, equipmentSales, serviceSales);

        // Calcula el bono por ventas de servicios
        const salesMonths = salesHistory.slice(-3).map(sale => sale.serviceSales);
        const bonoServicios = calculateBonusServicesSales(serviceSales, ...salesMonths);

        // Calcula el bono por ventas de equipo
        const bonoEquipo = calculateBonusEquipmentSales(equipmentSales);

        // Suma los bonos
        const totalBono = comisionBase + bonoServicios + bonoEquipo;

        // Actualiza el historial de ventas
        const existingData = salesHistory.find(sale => sale.month === formData.selectedMonth);
        if (existingData) {
            existingData.serviceSales = serviceSales;
            existingData.equipmentSales = equipmentSales;
            existingData.region = region;
            existingData.bonuses = totalBono;
        } else {
            setSalesHistory([...salesHistory, {
                month: formData.selectedMonth,
                serviceSales,
                equipmentSales,
                region,
                bonuses: totalBono,
            }]);
        }

        // Calcula el promedio de ventas de los últimos tres meses
        const lastThreeSales = salesHistory.slice(-2).concat({
            serviceSales,
            equipmentSales,
        });

        const totalSales = lastThreeSales.reduce((acc, sale) => acc + sale.serviceSales + sale.equipmentSales, 0);
        const avgSales = lastThreeSales.length ? totalSales / lastThreeSales.length : 0;

        setAverageSales(avgSales);
        setTotalBonuses(totalBono);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Estado de Cuenta - Comisión Total</h1>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Seleccionar Mes:</label>
                <select
                    name="selectedMonth"
                    value={formData.selectedMonth}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                    <option value="Enero">Enero</option>
                    <option value="Febrero">Febrero</option>
                    <option value="Marzo">Marzo</option>
                    <option value="Abril">Abril</option>
                    <option value="Mayo">Mayo</option>
                    <option value="Junio">Junio</option>
                    <option value="Julio">Julio</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Septiembre">Septiembre</option>
                    <option value="Octubre">Octubre</option>
                    <option value="Noviembre">Noviembre</option>
                    <option value="Diciembre">Diciembre</option>
                </select>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Ventas de Servicios:</label>
                <input
                    type="number"
                    name="serviceSales"
                    value={formData.serviceSales}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Ventas de Equipos:</label>
                <input
                    type="number"
                    name="equipmentSales"
                    value={formData.equipmentSales}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Región:</label>
                <select
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                    <option value="Norte">Norte</option>
                    <option value="Sur">Sur</option>
                </select>
            </div>

            <button
                onClick={handleAddSales}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Añadir Ventas
            </button>

            <div className="mt-6">
                <h2 className="text-xl font-semibold">Promedio de Ventas de los Últimos Tres Meses</h2>
                <p className="text-lg font-medium">${averageSales.toFixed(2)}</p>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold">Bonos Totales</h2>
                <p className="text-lg font-medium">${totalBonuses.toFixed(2)}</p>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold">Historial de Ventas</h2>
                {salesHistory.map((sale, index) => (
                    <div key={index} className="border-b py-2">
                        <p><strong>{sale.month}:</strong> Servicios: ${sale.serviceSales}, Equipos: ${sale.equipmentSales}, Región: {sale.region}, Bonos: ${sale.bonuses.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SalesReport;