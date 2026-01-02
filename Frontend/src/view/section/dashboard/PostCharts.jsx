import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import React from "react";
import {PostChartsViewModel} from "../../../viewmodel/section-vm/dasboard.vm.js";

export function PostCharts() {

    const  { postsStats, error } = PostChartsViewModel()

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

    const CustomLegend = ({ payload }) => {
        return (
            <div className="flex flex-col gap-2 md:gap-3">
                {payload.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center gap-2">
                        <div
                            className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs md:text-sm text-gray-700 font-medium truncate">
                            {entry.value}
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 ml-auto flex-shrink-0">
                            {postsStats[index].number} posts
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    if (error) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm mt-2 flex-1">
                <div className="p-3 md:p-6">
                    <div className="flex items-center gap-2 md:gap-3 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
                        <span className="text-xl md:text-2xl">⚠️</span>
                        <div>
                            <h4 className="font-semibold text-xs md:text-sm">Erreur de chargement</h4>
                            <p className="text-xs md:text-sm text-red-500">Impossible de charger les statistiques des publications</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mt-2 flex-1">
            <div className="p-3 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
                    <span className="icon_btn text-indigo-600 text-lg md:text-xl">&#xE0A8;</span>
                    Publications par utilisateur
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                    Répartition des publications
                </p>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <div className="w-32 md:w-48 flex-shrink-0">
                        <ResponsiveContainer width="100%" height={100} className="md:h-[120px]">
                            <PieChart>
                                <Pie
                                    data={postsStats}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="55%"
                                    outerRadius="80%"
                                    paddingAngle={3}
                                    dataKey="number"
                                    nameKey="user"
                                    isAnimationActive={true}
                                >
                                    {postsStats.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index]}
                                            className="outline-none"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                        fontSize: '12px',
                                        padding: '8px 12px'
                                    }}
                                    formatter={(value, name) => [`${value} publications`, name]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex-1 w-full">
                        <CustomLegend payload={postsStats.map((item, index) => ({
                            value: item.user,
                            color: COLORS[index]
                        }))} />
                    </div>
                </div>

                <div className="mt-3 md:mt-2 pt-3 md:pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs md:text-sm">
                        <span className="text-gray-500">Total</span>
                        <span className="font-semibold text-gray-800">
                            {postsStats.reduce((acc, item) => acc + item.number, 0)} publications
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}