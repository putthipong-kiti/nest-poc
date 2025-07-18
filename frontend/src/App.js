// App.js
import React from 'react';
import { useUserData } from './hooks/useUserData'
import { useCreateUser } from './hooks/useCreateUser';


function App() {
  const { 
    ormData, 
    sequelizeData,
    prismaData, 
    refetchOrmData, 
    refetchSequelizeData ,
    refetchPrismaData
  } = useUserData();

  const [userName, setUserName] = React.useState('');
  const { createPrismaUser, prismaStatus } = useCreateUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim()) return;
    await createPrismaUser({ name: userName });
    setUserName('');
    await refetchPrismaData();  // refetch to show the new user data
  };


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

      <div style={{ marginBottom: '20px' }}>
        {renderUserSection(prismaData, 'Prisma', refetchPrismaData)}
      </div>
      
      <div>
        <button onClick={refetchOrmData}>
          Refresh TypeORM Data
        </button>
        <button onClick={refetchSequelizeData} style={{ marginLeft: '10px' }}>
          Refresh Sequelize Data
        </button>
        <button onClick={refetchPrismaData} style={{ marginLeft: '10px' }}>
          Refresh Prisma Data
        </button>
      </div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter user name"
          style={{ marginRight: '10px' }}
        />
        <button type="submit" disabled={prismaStatus.loading}>
          {prismaStatus.loading ? 'Creating...' : 'Create User in Prisma'}
        </button>
        {prismaStatus.error && (
          <p style={{ color: 'red' }}>{prismaStatus.error}</p>
        )}
        {prismaStatus.success && (
          <p style={{ color: 'green' }}>User created successfully!</p>
        )}
      </form>

    </div>
  );
}

export default App;
