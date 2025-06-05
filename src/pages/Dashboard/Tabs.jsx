
const tabItems = [
    { key: 'analysis', label: 'Analysis' },
    { key: 'organization', label: 'Organization' },
    { key: 'policy', label: 'Policy' },
    { key: 'integration', label: 'Integration' }
]
export const Tabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex w-full px-8 text-sm font-semibold py-2 gap-3">
            {tabItems.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={activeTab == tab.key ? 'px-6 py-2 rounded-lg border  bg-orange-400 text-white' : 'px-6 py-2  rounded-lg border border-gray-500 '}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}


