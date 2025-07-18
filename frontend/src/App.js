// App.js
import React from 'react';
import { useUserData } from './hooks/useUserData';

function App() {
  const { 
    ormData, 
    sequelizeData, 
    refetchOrmData, 
    refetchSequelizeData 
  } = useUserData();

  // Helper function to render user data with loading and error states
  const renderUserSection = (data, serverType, refetchFunction) => {
    if (data.loading) {
      return <p>Loading {serverType} data...</p>;
    }
    
    if (data.error) {
      return (
        <div style={{ color: 'red' }}>
          <p>Error: {data.error}</p>
          <button onClick={refetchFunction}>
            Retry {serverType}
          </button>
        </div>
      );
    }
    
    if (data.name) {
      return <h1>Hello, {data.name} from {serverType}</h1>;
    }
    
    return <p>No data available from {serverType}</p>;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Data from Multiple APIs</h1>
      
      <div style={{ marginBottom: '20px' }}>
        {renderUserSection(ormData, 'TypeORM', refetchOrmData)}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        {renderUserSection(sequelizeData, 'Sequelize', refetchSequelizeData)}
      </div>
      
      <div>
        <button onClick={refetchOrmData}>
          Refresh TypeORM Data
        </button>
        <button onClick={refetchSequelizeData} style={{ marginLeft: '10px' }}>
          Refresh Sequelize Data
        </button>
      </div>
    </div>
  );
}

export default App;
