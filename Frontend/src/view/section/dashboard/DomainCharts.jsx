import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {DomainStatsViewModel} from "../../../viewmodel/section-vm/dasboard.vm.js";

export const DomainCharts = () => {
    const { domainStats, error } = DomainStatsViewModel();
    const color = '#6366f1';

    return (
        <div className="w-full">
            {error ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">Une erreur s'est produite...</p>
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
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden my-5">
            {/* En-tête */}
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <span className="icon_btn text-indigo-600 text-xl">&#xE478;</span>
                            Domaines d'intérêt
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Répartition des utilisateurs par secteur
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">{totalDomaines}</p>
                        <p className="text-xs text-gray-500">domaines</p>
                    </div>
                </div>
            </div>

            {/* Graphique */}
            <div className="p-4">
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                        barSize={20}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} vertical={false} />
                        <XAxis
                            type="number"
                            stroke="#d1d5db"
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis
                            type="category"
                            dataKey="domaine"
                            stroke="#d1d5db"
                            tick={{ fill: '#374151', fontSize: 10, fontWeight: 500 }}
                            width={120}
                            axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                fontSize: '12px'
                            }}
                            formatter={(value) => [`${value} utilisateurs`, 'Intéressés']}
                            cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                        />
                        <Bar
                            dataKey="utilisateurs"
                            fill={color}
                            radius={[0, 8, 8, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Footer avec statistiques */}
            <div className="px-6 my-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div>
                            <p className="text-xs text-gray-500">Total utilisateurs</p>
                            <p className="text-lg font-semibold text-gray-800">{totalUtilisateurs}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Moyenne par domaine</p>
                            <p className="text-lg font-semibold text-gray-800">
                                {Math.round(totalUtilisateurs / totalDomaines)}
                            </p>
                        </div>
                    </div>
                    <div className="text-xs text-gray-400">
                        Mis à jour récemment
                    </div>
                </div>
            </div>
        </div>
    );
};