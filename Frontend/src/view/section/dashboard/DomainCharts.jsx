import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {DomainStatsViewModel} from "../../../viewmodel/section-vm/dasboard.vm.js";

export const DomainCharts = () => {
    const { domainStats, error } = DomainStatsViewModel();
    const color = '#6366f1';

    return (
        <div className="w-full">
            {error ? (
                <div className="p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-xs md:text-sm">Une erreur s'est produite...</p>
                </div>
            ) : (
                <DomainChartContents data={domainStats} color={color} />
            )}
        </div>
    );
}

const DomainChartContents = ({ data, color }) => {
    const chartHeight = Math.max(300, data.length * 25 + 60);
    const totalDomaines = data.length;
    const totalUtilisateurs = data.reduce((acc, item) => acc + item.utilisateurs, 0);

    return (
        <div className="bg-white border border-gray-200 rounded-lg md:rounded-xl shadow-sm overflow-hidden my-3 md:my-5">
            {/* En-tête */}
            <div className="px-3 py-3 md:px-6 md:py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <span className="icon_btn text-indigo-600 text-lg md:text-xl">&#xE478;</span>
                            Domaines d'intérêt
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">
                            Répartition des utilisateurs par secteur
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl md:text-2xl font-bold text-indigo-600">{totalDomaines}</p>
                        <p className="text-[10px] md:text-xs text-gray-500">domaines</p>
                    </div>
                </div>
            </div>

            {/* Graphique */}
            <div className="p-2 md:p-4">
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 10, right: 15, left: 5, bottom: 10 }}
                        barSize={16}
                        className="md:barSize-[20px]"
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} vertical={false} />
                        <XAxis
                            type="number"
                            stroke="#d1d5db"
                            tick={{ fill: '#6b7280', fontSize: 10 }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            className="md:text-xs"
                        />
                        <YAxis
                            type="category"
                            dataKey="domaine"
                            stroke="#d1d5db"
                            tick={{ fill: '#374151', fontSize: 9, fontWeight: 500 }}
                            width={80}
                            axisLine={{ stroke: '#e5e7eb' }}
                            className="md:w-[120px] md:text-[10px]"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                fontSize: '11px'
                            }}
                            formatter={(value) => [`${value} utilisateurs`, 'Intéressés']}
                            cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                        />
                        <Bar
                            dataKey="utilisateurs"
                            fill={color}
                            radius={[0, 6, 6, 0]}
                            className="md:radius-[0,8,8,0]"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Footer avec statistiques */}
            <div className="px-3 my-2 md:px-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div>
                            <p className="text-[10px] md:text-xs text-gray-500">Total utilisateurs</p>
                            <p className="text-base md:text-lg font-semibold text-gray-800">{totalUtilisateurs}</p>
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs text-gray-500">Moyenne par domaine</p>
                            <p className="text-base md:text-lg font-semibold text-gray-800">
                                {Math.round(totalUtilisateurs / totalDomaines)}
                            </p>
                        </div>
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-400">
                        Mis à jour récemment
                    </div>
                </div>
            </div>
        </div>
    );
};