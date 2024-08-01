import React from 'react';

const MainDashboard = () => {
    return (
        <main className="flex-1 p-4 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded shadow">Card 1</div>
            <div className="p-4 bg-white rounded shadow">Card 2</div>
            <div className="p-4 bg-white rounded shadow">Card 3</div>
        </div>
    </main>
    );
};

export default MainDashboard;