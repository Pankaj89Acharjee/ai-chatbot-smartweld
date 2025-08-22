import { DynamicLineChart } from './DynamicLineChart';
import { DataTable } from './DataTable';
import { DynamicBarChart } from './DynamicBarChart';
import { DynamicPieChart } from './DynamicPieChart';


const ChevronLeftIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>
);

const VisualizationRenderer = ({ visualization }) => {
    const { type, title, data, config = {} } = visualization;

    switch (type.toLowerCase()) {
        case 'table':
            return <DataTable data={data} title={title} />;
        case 'bar':
        case 'barchart':
        case 'bar_chart':
            return <DynamicBarChart data={data} title={title} config={config} />;
        case 'pie':
        case 'piechart':
        case 'pie_chart':
            return <DynamicPieChart data={data} title={title} config={config} />;
        case 'line':
        case 'linechart':
        case 'line_chart':
            return <DynamicLineChart data={data} title={title} config={config} />;
        default:
            return (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <p className="text-gray-400">Unsupported visualization type: {type}</p>
                </div>
            );
    }
};


export const ResultsPage = ({ apiResponse, onBack }) => {
    const { reply } = apiResponse;

    return (
        <div className="min-h-screen rounded-lg text-gray-900 bg-gray-200 dark:text-gray-200 dark:bg-secondary-dark-bg p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analysis Results</h1>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        <ChevronLeftIcon size={16} className="text-white" />
                        Back
                    </button>
                </div>

                {/* Summary */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
                    <h2 className="text-lg font-semibold text-white mb-3">Summary</h2>
                    <p className="text-gray-300 leading-relaxed">{reply.summary}</p>
                </div>

                {/* Insights */}
                {reply.insights && reply.insights.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
                        <h2 className="text-lg font-semibold text-white mb-3">Key Insights</h2>
                        <ul className="space-y-2">
                            {reply.insights.map((insight, index) => (
                                <li key={index} className="text-gray-300 flex items-start gap-2">
                                    <span className="text-blue-400 font-bold">•</span>
                                    {insight}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Visualizations Rendering on the ChatResponse Component */}
                {reply.visualizations && reply.visualizations.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Data Visualizations</h2>
                        {reply.visualizations.map((visualization, index) => (
                            <VisualizationRenderer key={index} visualization={visualization} />
                        ))}
                    </div>
                )}

                {/* Recommendations */}
                {reply.recommendations && reply.recommendations.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-6 mt-6 border border-gray-700">
                        <h2 className="text-lg font-semibold text-white mb-3">Recommendations</h2>
                        <ul className="space-y-2">
                            {reply.recommendations.map((recommendation, index) => (
                                <li key={index} className="text-gray-300 flex items-start gap-2">
                                    <span className="text-green-400 font-bold">→</span>
                                    {recommendation}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};