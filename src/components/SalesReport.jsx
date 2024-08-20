import React, { useState } from 'react';
import { baseCommission, calculateBonusServicesSales, calculateBonusEquipmentSales } from '../utils/formulasToUse';
import { useNavigate } from 'react-router-dom';

const SalesReport = () => {
    const [formData, setFormData] = useState({
        name:'',
        serviceSales: '',
        equipmentSales: '',        
        region: 'Norte',
        selectedMonth: 'Enero',
    });

    const [salesHistory, setSalesHistory] = useState([]);
    const [averageSales, setAverageSales] = useState(0);
    const [totalBonuses, setTotalBonuses] = useState(0);
    const navigate = useNavigate()

    const formatCurrency = (value) => {
        if (!value) return '';
        const numberValue = parseFloat(value.replace(/[^\d.-]/g, ''));
        if (isNaN(numberValue)) return '';
        return `$${numberValue.toLocaleString('en-US')}`;
    };

    const parseCurrency = (value) => {
        if (!value) return '';
        return value.replace(/[^\d.-]/g, '');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'serviceSales' || name === 'equipmentSales' ? formatCurrency(value) : value
        });
    };

    const handleAddSales = () => {
        const serviceSales = parseFloat(parseCurrency(formData.serviceSales));
        const equipmentSales = parseFloat(parseCurrency(formData.equipmentSales));
        const region = formData.region;        

        //* Calcula la comisión base
        const baseCommissionSales = baseCommission(region, equipmentSales, serviceSales);

        //* Calcula el bono por ventas de equipo
        const { equipmentBonus, level } = calculateBonusEquipmentSales(equipmentSales);
        // console.log(equipmentBonus, level);
        

        //* Calcula el bono por ventas de servicios
        const salesMonths = salesHistory.slice(-3).map(sale => sale.serviceSales);
        const servicesBonus = calculateBonusServicesSales(serviceSales, ...salesMonths);   
        console.log("Service Sales:", serviceSales);
        console.log("Sales Months:", salesMonths);
        console.log("Services Bonus:", servicesBonus);   

        //* Suma los bonos
        const totalBonuses = baseCommissionSales + servicesBonus + equipmentBonus;        

        //* Calcula el promedio de ventas de los últimos meses cargados
        const lastThreeSales = salesHistory.slice(-2).concat({
            serviceSales,
            equipmentSales,
        });

        //* Calcular el promedio correctamente incluso si solo hay uno o dos meses disponibles
        const totalSales = lastThreeSales.reduce((acc, sale) => acc + sale.serviceSales + sale.equipmentSales, 0);
        const avgSales = lastThreeSales.length ? totalSales / lastThreeSales.length : 0;

        setAverageSales(avgSales);
        setTotalBonuses(totalBonuses);

        // Actualiza el historial de ventas
        const existingData = salesHistory.find(sale => sale.month === formData.selectedMonth);
        if (existingData) {
            existingData.serviceSales = serviceSales;
            existingData.equipmentSales = equipmentSales;
            existingData.region = region;
            existingData.bonuses = totalBonuses;
            existingData.level = level;
        } else {
            setSalesHistory([...salesHistory, {
                name: formData.name,
                month: formData.selectedMonth,
                serviceSales,
                equipmentSales,
                region,
                totalSales,
                avgSales,
                baseCommissionSales,
                servicesBonus,
                equipmentBonus,
                totalBonuses,
                level
            }]);
        }        
    };

    const handleViewReport = (month) => {
        const reportData = salesHistory.find(sale => sale.month === month);
        if (reportData) {            
            localStorage.setItem('reportData', JSON.stringify(reportData));            
            window.open(`/report/${month}`, '_blank');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Calculo de comisiones</h1>

            <div className="mb-6">

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Nombre completo:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                </div>

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
                    type="text"
                    name="serviceSales"
                    value={formData.serviceSales}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Ventas de Equipos:</label>
                <input
                    type="text"
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
                <h2 className="text-xl font-semibold">Historial de Ventas</h2>
                {salesHistory.map((sale, index) => (
                    <div key={index} className="border-b py-2">
                        <p><strong>{sale.month}:</strong> Servicios: ${sale.serviceSales}, Equipos: ${sale.equipmentSales}, Región: {sale.region}, Bonos: ${sale.totalBonuses.toFixed(2)}</p>
                        <button
                            onClick={() => handleViewReport(sale.month)}
                            className="bg-green-500 text-white px-3 py-1 rounded-md"
                        >
                            Ver Reporte
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SalesReport;