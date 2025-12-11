import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import {DomainStatsViewModel} from "../../../viewmodel/section-vm/dasboard.vm.js";

export const DomainCharts = () => {

    const { domainStats, error } = DomainStatsViewModel()

    const color = '#6366f1';

    return (
        <div className="w-full py-8 ">
            <div>Domaines</div>
            {
                error ?
                    <div>Une erreur s' est produite...</div> :
                    <DomainChartContents data={domainStats} color={color} />
            }
        </div>
    );
}

const DomainChartContents = ({data, color}) => {
    // Calculer la hauteur dynamique : 50px par domaine + marges
    const chartHeight = Math.max(300, data.length * 30 + 40);
    const totalDomaines = data.length;

    return (
        <div className="bg-white border border-neutral-200 rounded-lg shadow-md">
            <ResponsiveContainer width="100%" height={chartHeight}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                    barSize={20}
                >
                    <CartesianGrid strokeDasharray="1 1" stroke="#e5e7eb" />
                    <XAxis
                        type="number"
                        stroke="#e5e7eb"
                        tick={{ fill: '#4b5563', fontSize: 12 }}
                    />
                    <YAxis
                        type="category"
                        dataKey="domaine"
                        stroke="#e5e7eb"
                        tick={{ fill: '#4b5563', fontSize: 12 }}
                        width={130}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            fontSize : '12px'
                        }}
                        formatter={(value) => [`${value} utilisateurs`, 'Intéressés']}
                    />
                    <Bar dataKey="utilisateurs" fill={color} />
                </BarChart>
            </ResponsiveContainer>

            {/* Total en bas */}
            <div className="px-6 py-3 border-t border-neutral-200 bg-gray-50">
                <p className="text-sm text-gray-600">
                    Nombre total de domaines : <span className="font-semibold text-gray-800">{totalDomaines}</span>
                </p>
            </div>
        </div>
    )
}